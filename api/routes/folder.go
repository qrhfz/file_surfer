package routes

import (
	"file_surfer/auth"
	"file_surfer/controllers"

	"github.com/labstack/echo/v4"
)

func registerFolderRoute(e *echo.Group, auths *auth.AuthService) {

	e.GET("/folder", controllers.GetFolder, AllowLoggedInOnly(auths))
	e.GET("/folder/", controllers.GetFolder, AllowLoggedInOnly(auths))
	e.GET("/folder/:path", controllers.GetFolder, AllowLoggedInOnly(auths))

}
