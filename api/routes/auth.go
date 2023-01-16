package routes

import (
	"net/http"

	"file_surfer/api"
	"file_surfer/auth"

	"github.com/labstack/echo/v4"
)

func (app *App) registerAuthRoutes() {
	app.base.POST("/login", func(c echo.Context) error {
		var loginBody api.PostLoginJSONRequestBody
		c.Bind(&loginBody)

		token, err := app.services.Auth.Login(loginBody.Username, loginBody.Password)

		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
		}

		return c.JSON(200, map[string]string{
			"token": token,
		})
	})

	app.base.GET("/access-token", func(c echo.Context) error {
		authToken, ok := c.Get("token").(string)
		if !ok {
			return echo.NewHTTPError(http.StatusUnauthorized, "no token")
		}

		accessToken, err := app.services.Auth.GetAccessToken(authToken)
		if err != nil {
			return echo.NewHTTPError(500, err.Error())
		}
		return c.JSON(200, map[string]string{
			"accessToken": accessToken,
		})
	}, app.middlewares.LoggedInOnly)

	app.base.GET("/logout", func(c echo.Context) error {
		token, err := auth.GetBearerToken(c)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
		}

		err = app.services.Auth.Logout(token)
		if err != nil {
			return echo.NewHTTPError(500, err.Error())
		}

		return c.JSON(http.StatusNoContent, nil)
	})
}
