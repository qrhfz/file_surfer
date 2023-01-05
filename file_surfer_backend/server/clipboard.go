package server

import (
	"file_surfer_backend/api"
	"file_surfer_backend/fileutils"
	"os"

	"github.com/labstack/echo/v4"
)

func PostCopy(c echo.Context) error {
	var body api.PostCopyJSONRequestBody
	c.Bind(&body)

	for _, src := range *body.Sources {
		err := fileutils.Copy(src, *body.Destination)
		if err != nil {
			return err
		}
	}

	return nil
}

func PostMove(c echo.Context) error {
	var body api.PostCopyJSONRequestBody
	c.Bind(&body)

	for _, src := range *body.Sources {
		err := os.Rename(src, *body.Destination)
		if err != nil {
			return err
		}
	}

	return nil
}
