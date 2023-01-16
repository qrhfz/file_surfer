package routes

import (
	"file_surfer/controllers"

	"github.com/labstack/echo/v4"
)

func (api *ApiRoute) registerUserRoutes() {
	controller := controllers.NewUserController(api.services.User)

	g := api.base.Group("/user", AllowLoggedInOnly(api.services.Auth))
	g.GET("", func(c echo.Context) error {
		resp, err := controller.GetUsers()
		if err != nil {
			return echo.NewHTTPError(500, err.Error())
		}

		return c.JSON(200, resp)
	})
}
