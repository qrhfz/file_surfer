package routes

import (
	"file_surfer/controllers"

	"github.com/labstack/echo/v4"
)

func (api *ApiRoute) registerUserRoutes() {
	uct := controllers.NewUserController(api.services.User)

	g := api.base.Group("/user", api.middlewares.LoggedInOnly)
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
