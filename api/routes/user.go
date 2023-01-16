package routes

import (
	"file_surfer/api"
	"file_surfer/auth"
	"file_surfer/user"

	"github.com/labstack/echo/v4"
)

func registerUserRoutes(root *echo.Group, auths *auth.AuthService, us *user.UserService) {
	g := root.Group("/user", AllowLoggedInOnly(auths))
	g.GET("", func(c echo.Context) error {
		users, err := us.GetUsers()
		if err != nil {
			return echo.NewHTTPError(500, err.Error())
		}

		response := make([]api.User, len(users))

		for i, v := range users {
			u := api.User{
				Id:       v.Id,
				Role:     api.Role(v.Role),
				Username: v.Username,
			}
			response[i] = u
		}
		return c.JSON(200, response)
	})
}
