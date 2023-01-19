package controllers

import (
	"file_surfer/config"
	"file_surfer/fileutils"

	"file_surfer/api"

	"net/http"
	"os"
	"path"

	"github.com/labstack/echo/v4"
)

func GetFile(ctx echo.Context) error {
	fullPath := ctx.Get("fullPath").(string)

	info, err := fileutils.GetFileInfo(fullPath)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return ctx.JSON(http.StatusOK, info)
}

func PostFile(ctx echo.Context) error {
	fullPath := ctx.Get("fullPath").(string)

	if fileutils.CheckFileExists(fullPath) {
		return echo.NewHTTPError(http.StatusBadRequest, "item exist")
	}

	if ctx.QueryParam("isDir") == "true" {
		err := os.Mkdir(fullPath, 0750)
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

func PatchFile(ctx echo.Context) error {
	var body api.PatchFileJSONBody
	err := ctx.Bind(&body)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	oldPath := ctx.Get("fullPath").(string)
	dir := path.Dir(oldPath)
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
	fullPath := ctx.Get("fullPath").(string)

	err := fileutils.Delete(fullPath)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return ctx.JSON(http.StatusNoContent, nil)
}
