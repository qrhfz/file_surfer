package main

import (
	"file_surfer_backend/config"
	"file_surfer_backend/db"
	"file_surfer_backend/routes"
	"log"
	"os"
	"path"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	defer db.DB.Close()
	if !path.IsAbs(config.Base) {
		log.Fatal("base path is not absolute", config.Base)
	}
	err := os.Chdir(config.Base)
	if err != nil {
		log.Fatal(err.Error())
	}

	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	routes.RegisterRoute(e)

	e.Logger.Fatal(e.Start(":3000"))

}
