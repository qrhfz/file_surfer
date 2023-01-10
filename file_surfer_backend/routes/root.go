package routes

import (
	"file_surfer_backend/auth"
	"file_surfer_backend/server"

	"github.com/labstack/echo/v4"
)

func RegisterRoute(e *echo.Echo, auths *auth.AuthService) {
	registerFileGroup(e, auths)
	registerFolderRoute(e, auths)
	e.POST("/upload", server.Upload)
	registerClipboardRoutes(e)
	registerSearchRoutes(e)
	registerAuthRoutes(e, auths)
}
