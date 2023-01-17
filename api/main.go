package main

import (
	"io/fs"
	"log"
	"net/http"
	"os"
	"path"
	"time"

	"file_surfer/auth"
	"file_surfer/config"
	"file_surfer/db"
	"file_surfer/middlewares"
	"file_surfer/routes"
	"file_surfer/session"
	"file_surfer/user"

	"embed"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	if !path.IsAbs(config.Base) {
		log.Fatal("base path is not absolute", config.Base)
	}

	e := echo.New()

	cors := middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin,
			echo.HeaderContentType,
			echo.HeaderAccept,
			echo.HeaderAuthorization,
		},
	})

	logFile, err := os.OpenFile("log.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Fatal(err.Error())
	}
	defer logFile.Close()

	logger := middleware.LoggerWithConfig(config.LoggerConf(logFile))

	e.Use(cors, logger)

	db := db.Connect()
	defer db.Close()

	var userService = user.NewUserService(db)
	var sessionStore = session.NewSessionStore(db)
	var authService = auth.NewAuthService(userService, sessionStore)

	services := routes.Services{
		Auth: authService,
		User: userService,
	}

	middlewares := routes.Middlewares{
		AdminOnly:    middlewares.AdminOnly(services.Auth),
		AccessToken:  middlewares.NeedAccessToken(services.Auth),
		LoggedInOnly: middlewares.LoggedInOnly(services.Auth),
	}

	routes.NewApiRoute(e, "/api", &services, &middlewares).RegisterRoute()

	e.GET("/*", contentHandler, contentRewrite)

	go sessionCleanupfunc(sessionStore)
	e.Logger.Fatal(e.Start(":3000"))
}

//go:embed public
var content embed.FS

var contentHandler = echo.WrapHandler(handler())
var contentRewrite = middleware.Rewrite(
	map[string]string{
		"/assets/*": "/assets/$1",
		"/*":        "/",
	},
)

func handler() http.Handler {

	fsys := fs.FS(content)
	html, _ := fs.Sub(fsys, "public")

	return http.FileServer(http.FS(html))
}

func sessionCleanupfunc(ss *session.SessionStore) {
	for range time.Tick(time.Minute * 5) {
		err := ss.Clean()
		if err != nil {
			log.Fatal("Clean up session error:", err.Error())
		}
	}
}
