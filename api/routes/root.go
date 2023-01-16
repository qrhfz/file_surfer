package routes

import (
	"file_surfer/auth"
	"file_surfer/controllers"
	"file_surfer/user"

	"github.com/labstack/echo/v4"
)

type Services struct {
	Auth *auth.AuthService
	User *user.UserService
}

type ApiRoute struct {
	echo     *echo.Echo
	base     *echo.Group
	services *Services
}

func NewApiRoute(e *echo.Echo, base string, services *Services) *ApiRoute {
	return &ApiRoute{
		echo:     e,
		base:     e.Group(base),
		services: services,
	}
}

func (api *ApiRoute) RegisterRoute() {
	api.registerFileGroup()
	api.registerFolderRoute()
	api.registerClipboardRoutes()
	api.registerSearchRoutes()
	api.registerAuthRoutes()
	api.registerUserRoutes()

	api.base.POST("/upload", controllers.Upload)
}
