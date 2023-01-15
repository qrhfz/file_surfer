package routes

import (
	"github.com/qrhfz/file_surfer/api/server"

	"github.com/labstack/echo/v4"
)

func registerClipboardRoutes(e *echo.Group) {
	e.POST("/copy", server.PostCopy)
	e.POST("/move", server.PostMove)
}
