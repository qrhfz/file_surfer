package server

import (
	"file_surfer_backend/api"
	"file_surfer_backend/config"
	"file_surfer_backend/fileutils"
	"io"
	"io/fs"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"

	"github.com/labstack/echo/v4"
)

// Your GET endpoint
// (GET /folder)
func GetFolder(ctx echo.Context) error {
	pathParam, err := fileutils.DecodePath(ctx.Param("path"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	// fmt.Println("pathParam", pathParam)
	files, err := os.ReadDir(filepath.Join(config.Base, pathParam))
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

func SearchFolder(pathName, search string) ([]api.File, error) {
	pathName = filepath.Join(config.Base, pathName)
	results := make([]api.File, 0)
	err := filepath.Walk(pathName,
		func(path string, info fs.FileInfo, err error) error {
			if err != nil {
				return err
			}

			if strings.Contains(info.Name(), search) {
				inf, err := fileutils.GetFileInfo(path)
				if err != nil {
					return err
				}
				results = append(results, *inf)
			}

			return nil
		},
	)

	if err != nil {
		return nil, err
	}

	return results, nil
}
