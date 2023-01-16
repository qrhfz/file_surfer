package routes

import (
	"file_surfer/auth"
	"file_surfer/controllers"
	"file_surfer/middlewares"
	"file_surfer/user"

	"github.com/labstack/echo/v4"
)

type ApiRoute struct {
	echo        *echo.Echo
	base        *echo.Group
	services    *Services
	middlewares *Middlewares
}

func NewApiRoute(e *echo.Echo, base string, services *Services) *ApiRoute {
	return &ApiRoute{
		echo:     e,
		base:     e.Group(base),
		services: services,
		middlewares: &Middlewares{
			AdminOnly:    middlewares.AdminOnly(services.Auth),
			AccessToken:  middlewares.NeedAccessToken(services.Auth),
			LoggedInOnly: middlewares.LoggedInOnly(services.Auth),
		},
	}
}

type Services struct {
	Auth *auth.AuthService
	User *user.UserService
}

type Middlewares struct {
	AdminOnly    echo.MiddlewareFunc
	AccessToken  echo.MiddlewareFunc
	LoggedInOnly echo.MiddlewareFunc
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
