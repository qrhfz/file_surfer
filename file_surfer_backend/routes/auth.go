package routes

import (
	"file_surfer_backend/api"
	"file_surfer_backend/config"
	"net/http"

	"github.com/labstack/echo/v4"
)

func registerAuthRoutes(e *echo.Echo) {
	e.POST("/login", func(c echo.Context) error {
		var loginBody api.PostLoginJSONRequestBody
		c.Bind(loginBody)

		token, err := config.AppAuthService.Login(loginBody.Username, loginBody.Password)

		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "")
		}

		return c.JSON(200, map[string]string{
			"token": token,
		})
	})
}
