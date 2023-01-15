package server

import (
	"os"
	"path/filepath"

	"file_surfer/api/config"
	"file_surfer/api/fileutils"

	"github.com/qrhfz/file_surfer/openapi/api"

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
