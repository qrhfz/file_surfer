package server

import (
	"file_surfer_backend/api"
	"file_surfer_backend/config"
	"file_surfer_backend/fileutils"

	"net/http"
	"os"
	"path"

	"github.com/labstack/echo/v4"
)

// Your GET endpoint
// (GET /file)
func GetFile(ctx echo.Context) error {
	pathName, err := fileutils.DecodePath(ctx.Param("path"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	info, err := fileutils.GetFileInfo(pathName)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return ctx.JSON(http.StatusOK, info)
}

// (POST /file)
func PostFile(ctx echo.Context) error {
	relativePath, err := fileutils.DecodePath(ctx.Param("path"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	fullPath := path.Join(config.Base, relativePath)

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

	info, err := fileutils.GetFileInfo(relativePath)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return ctx.JSON(http.StatusCreated, info)
}

// (PATCH /file)
func PatchFile(ctx echo.Context) error {
	relativePath, err := fileutils.DecodePath(ctx.Param("path"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	var body api.PatchFileJSONBody
	err = ctx.Bind(&body)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	dir := path.Dir(relativePath)
	oldPath := path.Join(config.Base, relativePath)
	newPath := path.Join(config.Base, dir, *body.Name)

	os.Rename(oldPath, newPath)

	newFileInfo, err := fileutils.GetFileInfo(path.Join(dir, *body.Name))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return ctx.JSON(http.StatusOK, newFileInfo)
}

// (DELETE /file)
func DeleteFile(ctx echo.Context) error {
	relativePath, err := fileutils.DecodePath(ctx.Param("path"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	fullPath := path.Join(config.Base, relativePath)
	err = fileutils.Delete(fullPath)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return ctx.JSON(http.StatusNoContent, nil)
}
