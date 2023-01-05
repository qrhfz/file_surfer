package routes

import (
	"file_surfer_backend/server"

	"github.com/labstack/echo/v4"
)

func registerClipboardRoutes(e *echo.Echo) {
	e.POST("/copy", server.PostCopy)
	e.POST("/move", server.PostMove)
}
