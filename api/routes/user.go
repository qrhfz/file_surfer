package routes

import (
	"file_surfer/controllers"

	"github.com/labstack/echo/v4"
)

func (app *App) registerUserRoutes() {
	uct := controllers.NewUserController(app.services.User)

	g := app.base.Group("/user", app.middlewares.LoggedInOnly)
	g.GET("", getUsers(uct))
}

func getUsers(uct *controllers.UserController) echo.HandlerFunc {
	return func(c echo.Context) error {
		resp, err := uct.GetUsers()
		if err != nil {
			return echo.NewHTTPError(500, err.Error())
		}

		return c.JSON(200, resp)
	}
}
