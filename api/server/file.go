package server

import (
	"path/filepath"

	"file_surfer/config"
	"file_surfer/fileutils"

	"file_surfer/api"

	"net/http"
	"os"
	"path"

	"github.com/labstack/echo/v4"
)

// Your GET endpoint
// (GET /file)
func GetFile(ctx echo.Context) error {
	pathParam, err := fileutils.DecodePath(ctx.Param("path"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	fullPath := filepath.Join(config.Base, pathParam)

	info, err := fileutils.GetFileInfo(fullPath)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return ctx.JSON(http.StatusOK, info)
}

// (POST /file)
func PostFile(ctx echo.Context) error {
	pathParam, err := fileutils.DecodePath(ctx.Param("path"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	fullPath := path.Join(config.Base, pathParam)

	if fileutils.CheckFileExists(fullPath) {
		return echo.NewHTTPError(http.StatusBadRequest, "item exist")
	}

	if ctx.QueryParam("isDir") == "true" {
		err = os.Mkdir(fullPath, 0750)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
	} else {
		var file, err = os.Create(fullPath)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
		file.Close()
	}

	info, err := fileutils.GetFileInfo(fullPath)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return ctx.JSON(http.StatusCreated, info)
}

// (PATCH /file)
func PatchFile(ctx echo.Context) error {
	pathParam, err := fileutils.DecodePath(ctx.Param("path"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	var body api.PatchFileJSONBody
	err = ctx.Bind(&body)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	dir := path.Dir(pathParam)
	oldPath := path.Join(config.Base, pathParam)
	newPath := path.Join(config.Base, dir, *body.Name)

	err = os.Rename(oldPath, newPath)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	newFileInfo, err := fileutils.GetFileInfo(newPath)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return ctx.JSON(http.StatusOK, newFileInfo)
}

func DeleteFile(ctx echo.Context) error {
	pathParam, err := fileutils.DecodePath(ctx.Param("path"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	fullPath := path.Join(config.Base, pathParam)
	err = fileutils.Delete(fullPath)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return ctx.JSON(http.StatusNoContent, nil)
}
