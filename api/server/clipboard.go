package server

import (
	"file_surfer_backend/api"
	"file_surfer_backend/config"
	"file_surfer_backend/fileutils"
	"os"
	"path/filepath"

	"github.com/labstack/echo/v4"
)

func PostCopy(c echo.Context) error {
	var body api.PostCopyJSONRequestBody
	err := c.Bind(&body)
	if err != nil {
		return echo.NewHTTPError(500, err.Error())
	}

	for _, s := range *body.Sources {
		src := filepath.Join(config.Base, s)
		dest := filepath.Join(config.Base, *body.Destination, filepath.Base(s))
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

func PostMove(c echo.Context) error {
	var body api.PostCopyJSONRequestBody
	err := c.Bind(&body)
	if err != nil {
		return echo.NewHTTPError(500, err.Error())
	}

	for _, s := range *body.Sources {
		src := filepath.Join(config.Base, s)
		dest := filepath.Join(config.Base, *body.Destination, filepath.Base(s))

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
