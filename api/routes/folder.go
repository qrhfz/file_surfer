package routes

import (
	"github.com/qrhfz/file_surfer/api/auth"
	"github.com/qrhfz/file_surfer/api/server"

	"github.com/labstack/echo/v4"
)

func registerFolderRoute(e *echo.Group, auths *auth.AuthService) {

	e.GET("/folder", server.GetFolder, AllowLoggedInOnly(auths))
	e.GET("/folder/", server.GetFolder, AllowLoggedInOnly(auths))
	e.GET("/folder/:path", server.GetFolder, AllowLoggedInOnly(auths))

}
