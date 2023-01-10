package routes

import (
	"file_surfer_backend/api"
	"file_surfer_backend/auth"
	"file_surfer_backend/config"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

func registerAuthRoutes(e *echo.Echo, auths *auth.AuthService) {
	e.POST("/login", func(c echo.Context) error {
		var loginBody api.PostLoginJSONRequestBody
		c.Bind(&loginBody)
		fmt.Println(loginBody)

		token, err := config.AppAuthService.Login(loginBody.Username, loginBody.Password)

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

		accessToken, err := auths.GetAccessToken(authToken)
		if err != nil {
			return echo.NewHTTPError(500, err.Error())
		}
		return c.JSON(200, map[string]string{
			"accessToken": accessToken,
		})
	}, AllowLoggedInOnly(auths))
}
