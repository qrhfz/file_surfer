package server

import (
	"file_surfer_backend/api"
	"file_surfer_backend/config"
	"file_surfer_backend/fileutils"
	"fmt"
	"net/http"
	"os"
	"path"

	"github.com/labstack/echo/v4"
)

// Your GET endpoint
// (GET /blob)
func (s Server) GetBlob(ctx echo.Context, b64path api.Base64PathParam) error {
	relativePath, err := fileutils.DecodePath(b64path)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	fullPath := path.Join(config.Base, relativePath)

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

// (POST /blob)
func (s Server) PostBlob(ctx echo.Context, pathParam api.Base64PathParam) error {
	panic("not implemented") // TODO: Implement
}
