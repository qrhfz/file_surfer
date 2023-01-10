package main

import (
	"file_surfer_backend/config"
	"file_surfer_backend/db"
	"file_surfer_backend/routes"
	"fmt"
	"log"
	"path"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

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
	e.Static("/", "public")

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
