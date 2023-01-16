package routes

import (
	"file_surfer/auth"
	"file_surfer/controllers"
	"file_surfer/user"

	"github.com/labstack/echo/v4"
)

func registerUserRoutes(root *echo.Group, auths *auth.AuthService, us *user.UserService) {
	controller := controllers.NewUserController(us)

	g := root.Group("/user", AllowLoggedInOnly(auths))
	g.GET("", func(c echo.Context) error {
		resp, err := controller.GetUsers()
		if err != nil {
			return echo.NewHTTPError(500, err.Error())
		}

		return c.JSON(200, resp)
	})
}
