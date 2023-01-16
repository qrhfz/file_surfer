package routes

import (
	"file_surfer/auth"
	"file_surfer/controllers"
	"file_surfer/user"

	"github.com/labstack/echo/v4"
)

type App struct {
	echo        *echo.Echo
	base        *echo.Group
	services    *Services
	middlewares *Middlewares
}

func NewApiRoute(e *echo.Echo, base string, services *Services, middlewares *Middlewares) *App {
	return &App{
		echo:        e,
		base:        e.Group(base),
		services:    services,
		middlewares: middlewares,
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

func (api *App) RegisterRoute() {
	api.registerFileGroup()
	api.registerFolderRoute()
	api.registerClipboardRoutes()
	api.registerSearchRoutes()
	api.registerAuthRoutes()
	api.registerUserRoutes()

	api.base.POST("/upload", controllers.Upload)
}
