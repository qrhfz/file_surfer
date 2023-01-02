package main

import (
	"file_surfer_backend/api"
	"file_surfer_backend/server"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	var s server.Server

	api.RegisterHandlers(e, s)
	e.Logger.Fatal(e.Start(":1323"))
}
