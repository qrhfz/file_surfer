package routes

import (
	"file_surfer_backend/server"

	"github.com/labstack/echo/v4"
)

func RegisterRoute(e *echo.Echo) {
	registerFileGroup(e)
	registerFolderRoute(e)

	e.POST("/upload", server.Upload)
}
