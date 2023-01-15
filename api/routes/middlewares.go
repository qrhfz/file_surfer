package routes

import (
	"net/http"
	"strings"

	"github.com/qrhfz/file_surfer/api/auth"

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

func NeedAccessToken(auths *auth.AuthService) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			token := c.QueryParam("accessToken")

			if !auths.VerifyAccessToken(token) {
				return echo.NewHTTPError(http.StatusUnauthorized, "Unauthorized")
			}

			return next(c)
		}
	}
}
