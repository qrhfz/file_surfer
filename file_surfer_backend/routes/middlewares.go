package routes

import (
	"file_surfer_backend/auth"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

func AllowLoggedInOnly(auths *auth.AuthService) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authorizationHeaders, ok := c.Request().Header["Authorization"]
			if !ok {
				return echo.NewHTTPError(http.StatusUnauthorized, "no Authorization header")
			}

			if len(authorizationHeaders) < 1 {
				return echo.NewHTTPError(http.StatusUnauthorized, "invalid Authorization header")
			}

			authorization := authorizationHeaders[0]
			token := strings.Split(authorization, "Bearer ")[1]
			if auths.AllowLoggedInOnly(token) {
				c.Set("token", token)
				return next(c)
			}
			return echo.NewHTTPError(http.StatusUnauthorized, "not logged in")
		}
	}
}
