package server

import (
	"file_surfer_backend/api"
	"file_surfer_backend/config"
	"file_surfer_backend/fileutils"
	"io"
	"net/http"
	"os"
	"path"

	"github.com/labstack/echo/v4"
)

// Your GET endpoint
// (GET /folder)
func GetFolder(ctx echo.Context) error {
	relativePath, err := fileutils.DecodePath(ctx.Param("path"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	pathName := path.Join(config.Base, relativePath)
	files, err := os.ReadDir(pathName)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, err.Error())
	}

	response := api.FolderContent{
		Folders: make([]api.Folder, 0),
		Files:   make([]api.File, 0),
	}

	for _, f := range files {
		childPath := path.Join(pathName, f.Name())

		if f.IsDir() {
			folderInfo, err := fileutils.GetFolderInfo(childPath)
			if err != nil {
				return ctx.JSON(http.StatusInternalServerError, err.Error())
			}

			response.Folders = append(response.Folders, *folderInfo)
			continue
		}

		fileInfo, err := fileutils.GetFileInfo(childPath)
		if err != nil && err != io.EOF {
			return ctx.JSON(http.StatusInternalServerError, err.Error())
		}

		response.Files = append(response.Files, *fileInfo)

	}

	return ctx.JSON(http.StatusOK, response)
}
