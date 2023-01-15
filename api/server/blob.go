package server

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path"

	"file_surfer/api/config"
	"file_surfer/api/fileutils"

	"github.com/qrhfz/file_surfer/openapi/api"

	"github.com/labstack/echo/v4"
)

func GetBlob(ctx echo.Context) error {
	pathParam, err := fileutils.DecodePath(ctx.Param("path"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	fullPath := path.Join(config.Base, pathParam)

	file, err := os.Open(fullPath)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	defer file.Close()

	info, err := file.Stat()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	fileType, err := fileutils.GetMimeType(fullPath)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	ctx.Response().Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=%s", info.Name()))
	return ctx.Stream(http.StatusOK, fileType, file)
}

func Upload(ctx echo.Context) error {

	dir := ctx.FormValue("path")
	form, err := ctx.MultipartForm()
	if err != nil {
		return err
	}
	files := form.File["files"]

	response := make([]api.File, 0)

	for _, file := range files {
		src, err := file.Open()
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
		defer src.Close()

		destPath := path.Join(config.Base, dir, file.Filename)

		dest, err := os.Create(destPath)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
		defer dest.Close()

		size, err := io.Copy(dest, src)
		if err != nil && size != file.Size {
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}

		fileInfo, _ := fileutils.GetFileInfo(destPath)
		response = append(response, *fileInfo)
	}

	return echo.NewHTTPError(http.StatusCreated, response)
}
