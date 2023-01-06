package server

import (
	"file_surfer_backend/api"
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
	pathParam, err := fileutils.DecodePath(ctx.Param("path"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	if len(pathParam) == 0 {
		pathParam = "."
	}

	// fmt.Println("pathParam", pathParam)
	files, err := os.ReadDir(pathParam)
	if err != nil {
		// fmt.Println(err.Error())
		return ctx.JSON(http.StatusInternalServerError, err.Error())
	}

	response := make([]api.File, 0, len(files))

	for _, f := range files {
		// fmt.Println(f.Name())
		childPath := path.Join(pathParam, f.Name())

		fileInfo, err := fileutils.GetFileInfo(childPath)
		if err != nil && err != io.EOF {
			continue
			// return ctx.JSON(http.StatusInternalServerError, err.Error())
		}

		response = append(response, *fileInfo)
	}

	return ctx.JSON(http.StatusOK, response)
}
