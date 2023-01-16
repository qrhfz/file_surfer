package routes

import (
	"file_surfer/controllers"

	"github.com/labstack/echo/v4"
)

func registerClipboardRoutes(e *echo.Group) {
	e.POST("/copy", controllers.PostCopy)
	e.POST("/move", controllers.PostMove)
}
