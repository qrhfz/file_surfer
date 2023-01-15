package main

import (
	"file_surfer_backend/config"
	"file_surfer_backend/db"
	"file_surfer_backend/routes"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"path"
	"time"

	"embed"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

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

func main() {
	defer db.DB.Close()
	if !path.IsAbs(config.Base) {
		log.Fatal("base path is not absolute", config.Base)
	}

	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	routes.RegisterRoute(e, config.AppAuthService)
	e.GET("/*", contentHandler, contentRewrite)

	go sessionCleanupfunc()
	e.Logger.Fatal(e.Start(":3000"))
}

func sessionCleanupfunc() {
	for range time.Tick(time.Minute * 5) {
		fmt.Println("Clean up session")
		err := config.AooSessionStore.Clean()
		if err != nil {
			log.Fatal("Clean up session error:", err.Error())
		}
	}

}
