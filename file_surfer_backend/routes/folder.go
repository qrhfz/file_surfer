package routes

import (
	"file_surfer_backend/server"

	"github.com/labstack/echo/v4"
)

func registerFolderRoute(e *echo.Echo) {
	e.GET("/folder", server.GetFolder)
	e.GET("/folder/", server.GetFolder)
	e.GET("/folder/:path", server.GetFolder)
}
