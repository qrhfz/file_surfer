package server

import (
	"file_surfer_backend/api"
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

	for _, src := range *body.Sources {
		dest := filepath.Join(*body.Destination, filepath.Base(src))
		err := fileutils.Copy(src, dest)
		if err != nil {
			return echo.NewHTTPError(500, err.Error())
		}
	}

	f, err := fileutils.GetFileInfo(*body.Destination)
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

	for _, src := range *body.Sources {
		dest := filepath.Join(*body.Destination, filepath.Base(src))

		err := os.Rename(src, dest)
		if err != nil {
			return echo.NewHTTPError(500, err.Error())
		}
	}

	f, err := fileutils.GetFileInfo(*body.Destination)
	if err != nil {
		return echo.NewHTTPError(500, err.Error())
	}

	return c.JSON(200, f)
}
