package main

import (
	"file_surfer_backend/api"
	"file_surfer_backend/server"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	var s server.Server

	api.RegisterHandlers(e, s)
	e.Logger.Fatal(e.Start(":3000"))
}