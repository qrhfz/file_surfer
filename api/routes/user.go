package routes

import (
	"file_surfer/controllers"

	"github.com/labstack/echo/v4"
)

func registerUserRoutes(root *echo.Group, services *Services) {
	controller := controllers.NewUserController(services.User)

	g := root.Group("/user", AllowLoggedInOnly(services.Auth))
	g.GET("", func(c echo.Context) error {
		resp, err := controller.GetUsers()
		if err != nil {
			return echo.NewHTTPError(500, err.Error())
		}

		return c.JSON(200, resp)
	})
}
