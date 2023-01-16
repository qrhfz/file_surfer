package routes

import (
	"file_surfer/controllers"

	"github.com/labstack/echo/v4"
)

func registerFolderRoute(e *echo.Group, services *Services) {
	loggedInMW := AllowLoggedInOnly(services.Auth)

	e.GET("/folder", controllers.GetFolder, loggedInMW)
	e.GET("/folder/", controllers.GetFolder, loggedInMW)
	e.GET("/folder/:path", controllers.GetFolder, loggedInMW)
}
