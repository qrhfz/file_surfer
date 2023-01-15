package routes

import (
	"file_surfer/api/server"

	"github.com/labstack/echo/v4"
)

func registerClipboardRoutes(e *echo.Group) {
	e.POST("/copy", server.PostCopy)
	e.POST("/move", server.PostMove)
}
