package middlewares

import (
	"errors"
	"file_surfer/auth"
	"fmt"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

func LoggedInOnly(authService *auth.AuthService) echo.MiddlewareFunc {
	fmt.Println("AAAAAAAAAAARRRRRRGHH")

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			token, err := getBearerToken(c)
			if err != nil {
				return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
			}

			if authService.IsLoggedIn(token) {
				return next(c)
			}
			return echo.NewHTTPError(http.StatusUnauthorized, "not logged in")
		}
	}
}

func AdminOnly(authService *auth.AuthService) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			token, err := getBearerToken(c)
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

			if !authService.VerifyAccessToken(token) {
				return echo.NewHTTPError(http.StatusUnauthorized, "Unauthorized")
			}

			return next(c)
		}
	}
}

func getBearerToken(c echo.Context) (string, error) {
	ah, ok := c.Request().Header["Authorization"]
	if !ok || len(ah) < 1 {
		return "", errors.New("no authorization header")
	}
	bearer := ah[0]
	token := strings.Split(bearer, "Bearer ")[1]

	return token, nil
}
