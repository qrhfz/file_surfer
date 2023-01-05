package routes

import (
	"github.com/labstack/echo/v4"
)

func RegisterRoute(e *echo.Echo) {
	registerFileGroup(e)
}
