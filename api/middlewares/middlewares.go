package middlewares

import (
	"file_surfer/auth"
	"file_surfer/config"
	"file_surfer/fileutils"
	"net/http"
	"path/filepath"

	"github.com/labstack/echo/v4"
)

func LoggedInOnly(authService *auth.AuthService) echo.MiddlewareFunc {

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			token, err := auth.GetBearerToken(c)
			if err != nil {
				return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
			}

			if authService.IsLoggedIn(token) {
				c.Set("token", token)
				return next(c)
			}
			return echo.NewHTTPError(http.StatusUnauthorized, "not logged in")
		}
	}
}

func AdminOnly(authService *auth.AuthService) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			token, err := auth.GetBearerToken(c)
			if err != nil {
				return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
			}

			if authService.IsAdmin(token) {
				return next(c)
			}
			return echo.NewHTTPError(http.StatusUnauthorized, "not admin")
		}
	}
}

func NeedAccessToken(authService *auth.AuthService) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			token := c.QueryParam("accessToken")
			path := c.Param("path")

			if !authService.VerifyAccessToken(token, path) {
				return echo.NewHTTPError(http.StatusUnauthorized, "Unauthorized")
			}

			return next(c)
		}
	}
}

func ResolvePath(authService *auth.AuthService) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			token, err := auth.GetBearerToken(c)
			if err != nil {
				return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
			}

			u, err := authService.GetUserFromToken(token)
			if err != nil {
				return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
			}

			pathParam, err := fileutils.DecodePath(c.Param("path"))
			if err != nil {
				return echo.NewHTTPError(http.StatusBadRequest, err.Error())
			}
			fullPath := filepath.Join(config.Base, u.Base, pathParam)

			c.Set("fullPath", fullPath)
			return next(c)
		}
	}
}
