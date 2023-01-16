package routes

import (
	"file_surfer/auth"
	"file_surfer/controllers"
	"file_surfer/user"

	"github.com/labstack/echo/v4"
)

func RegisterRoute(e *echo.Echo, auths *auth.AuthService, us *user.UserService) {
	apiGroup := e.Group("/api")
	registerFileGroup(apiGroup, auths)
	registerFolderRoute(apiGroup, auths)
	apiGroup.POST("/upload", controllers.Upload)
	registerClipboardRoutes(apiGroup)
	registerSearchRoutes(apiGroup)
	registerAuthRoutes(apiGroup, auths)
	registerUserRoutes(apiGroup, auths, us)
}
