package auth

import (
	"errors"
	"strings"

	"github.com/labstack/echo/v4"
)

func GetBearerToken(c echo.Context) (string, error) {
	ah, ok := c.Request().Header["Authorization"]
	if !ok || len(ah) < 1 {
		return "", errors.New("no authorization header")
	}
	bearer := ah[0]
	token := strings.Split(bearer, "Bearer ")[1]

	return token, nil
}
