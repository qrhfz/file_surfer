package routes

import (
	"file_surfer_backend/auth"
	"file_surfer_backend/server"

	"github.com/labstack/echo/v4"
)

func registerFolderRoute(e *echo.Group, auths *auth.AuthService) {

	e.GET("/folder", server.GetFolder, AllowLoggedInOnly(auths))
	e.GET("/folder/", server.GetFolder, AllowLoggedInOnly(auths))
	e.GET("/folder/:path", server.GetFolder, AllowLoggedInOnly(auths))

}
