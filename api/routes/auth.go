package routes

import (
	"fmt"
	"net/http"

	"file_surfer/api"

	"github.com/labstack/echo/v4"
)

func registerAuthRoutes(e *echo.Group, services *Services) {
	e.POST("/login", func(c echo.Context) error {
		var loginBody api.PostLoginJSONRequestBody
		c.Bind(&loginBody)
		fmt.Println(loginBody)

		token, err := services.Auth.Login(loginBody.Username, loginBody.Password)

		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
		}

		return c.JSON(200, map[string]string{
			"token": token,
		})
	})

	e.GET("/access-token", func(c echo.Context) error {
		authToken, ok := c.Get("token").(string)
		if !ok {
			return echo.NewHTTPError(http.StatusUnauthorized, "no token")
		}

		accessToken, err := services.Auth.GetAccessToken(authToken)
		if err != nil {
			return echo.NewHTTPError(500, err.Error())
		}
		return c.JSON(200, map[string]string{
			"accessToken": accessToken,
		})
	}, AllowLoggedInOnly(services.Auth))
}
