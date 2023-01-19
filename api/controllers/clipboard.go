package controllers

import (
	"net/http"
	"os"
	"path/filepath"

	"file_surfer/auth"
	"file_surfer/config"
	"file_surfer/fileutils"

	"file_surfer/api"

	"github.com/labstack/echo/v4"
)

type ClipboardController struct {
	authService *auth.AuthService
}

func NewClipboardController(authService *auth.AuthService) *ClipboardController {
	return &ClipboardController{authService: authService}
}

func (cbctl *ClipboardController) PostCopy(c echo.Context) error {
	base, err := cbctl.getUserBase(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
	}
	var body api.PostCopyJSONRequestBody
	err = c.Bind(&body)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
	}

	for _, s := range *body.Sources {
		src := filepath.Join(config.Base, base, s)
		dest := filepath.Join(config.Base, base, *body.Destination, filepath.Base(s))
		err := fileutils.Copy(src, dest)
		if err != nil {
			return echo.NewHTTPError(500, err.Error())
		}
	}

	f, err := fileutils.GetFileInfo(filepath.Join(config.Base, *body.Destination))
	if err != nil {
		return echo.NewHTTPError(500, err.Error())
	}

	return c.JSON(200, f)
}

func (cbctl *ClipboardController) PostMove(c echo.Context) error {
	base, err := cbctl.getUserBase(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
	}
	var body api.PostCopyJSONRequestBody
	err = c.Bind(&body)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
	}

	for _, s := range *body.Sources {
		src := filepath.Join(config.Base, base, s)
		dest := filepath.Join(config.Base, base, *body.Destination, filepath.Base(s))

		err := os.Rename(src, dest)
		if err != nil {
			return echo.NewHTTPError(500, err.Error())
		}
	}

	f, err := fileutils.GetFileInfo(filepath.Join(config.Base, *body.Destination))
	if err != nil {
		return echo.NewHTTPError(500, err.Error())
	}

	return c.JSON(200, f)
}

func (cbctl *ClipboardController) getUserBase(c echo.Context) (string, error) {
	token, err := auth.GetBearerToken(c)
	if err != nil {
		return "", err
	}

	u, err := cbctl.authService.GetUserFromToken(token)
	if err != nil {
		return "", err
	}

	return u.Base, nil
}
