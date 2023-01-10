package routes

import (
	"file_surfer_backend/auth"
	"file_surfer_backend/server"

	"github.com/labstack/echo/v4"
)

func RegisterRoute(e *echo.Echo, auths *auth.AuthService) {
	apiGroup := e.Group("/api")
	registerFileGroup(apiGroup, auths)
	registerFolderRoute(apiGroup, auths)
	apiGroup.POST("/upload", server.Upload)
	registerClipboardRoutes(apiGroup)
	registerSearchRoutes(apiGroup)
	registerAuthRoutes(apiGroup, auths)
}
