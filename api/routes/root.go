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
	e        *echo.Echo
	base     string
	services *Services
}

func NewApiRoute(e *echo.Echo, base string, services *Services) *ApiRoute {
	return &ApiRoute{
		e:        e,
		base:     base,
		services: services,
	}
}

func (api *ApiRoute) RegisterRoute() {
	apiGroup := api.e.Group("/api")
	registerFileGroup(apiGroup, api.services)
	registerFolderRoute(apiGroup, api.services)
	apiGroup.POST("/upload", controllers.Upload)
	registerClipboardRoutes(apiGroup)
	registerSearchRoutes(apiGroup)
	registerAuthRoutes(apiGroup, api.services)
	registerUserRoutes(apiGroup, api.services)
}
