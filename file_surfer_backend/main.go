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
var f embed.FS

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

	fsys, err := fs.Sub(f, "public")
	if err != nil {
		panic(err)
	}

	assetHandler := http.FileServer(http.FS(fsys))
	e.GET("/*", echo.WrapHandler(assetHandler))

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
