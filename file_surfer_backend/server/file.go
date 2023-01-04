package server

import (
	"file_surfer_backend/api"
	"file_surfer_backend/config"
	"file_surfer_backend/fileutils"

	"fmt"
	"io"
	"net/http"
	"os"
	"path"
	"strings"

	"github.com/labstack/echo/v4"
)

// Your GET endpoint
// (GET /file)
func (s Server) GetFile(ctx echo.Context, b64path api.Base64PathParam) error {
	relativePath, err := fileutils.DecodePath(b64path)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	fullPath := path.Join(config.Base, relativePath)

	file, err := os.Open(fullPath)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, CreateErrorResponse("open file", err.Error()))
	}
	defer file.Close()

	info, err := file.Stat()
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, CreateErrorResponse("open file", err.Error()))
	}

	name := info.Name()
	modified := info.ModTime()
	size := int(info.Size())
	fileType, err := fileutils.GetMimeType(fullPath)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, CreateErrorResponse("read file type", err.Error()))
	}

	body := api.GetFIleResponse{
		Info: api.File{
			Name:     name,
			Modified: modified,
			Size:     size,
			Type:     fileType,
		},
	}

	if strings.HasPrefix(fileType, "text/") {
		buf, err := io.ReadAll(file)
		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, CreateErrorResponse("read file type", err.Error()))
		}
		content := string(buf)
		body.Content = &content
	}

	return ctx.JSON(http.StatusOK, body)
}

// (PATCH /file)
func (s Server) PatchFile(ctx echo.Context, b64path api.Base64PathParam) error {
	relativePath, err := fileutils.DecodePath(b64path)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	var body api.PatchFileJSONBody
	err = ctx.Bind(&body)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	oldPath := path.Join(config.Base, relativePath)
	newPath := path.Join(config.Base, relativePath, "..", *body.Name)

	os.Rename(oldPath, newPath)

	return ctx.JSON(http.StatusOK, api.SuccessMessage{
		Success: fmt.Sprintf("success renaming %s to %s", oldPath, newPath),
	})
}

// (POST /file)
func (s Server) PostFile(ctx echo.Context, b64path api.Base64PathParam) error {
	relativePath, err := fileutils.DecodePath(b64path)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	var body api.NewFileRequest
	err = ctx.Bind(&body)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	fullPath := path.Join(config.Base, relativePath, body.Name)

	if body.IsDir {
		err = os.Mkdir(fullPath, 0750)
		if err != nil {
			return ctx.JSON(
				http.StatusInternalServerError,
				CreateErrorResponse("internal server error", err.Error()),
			)
		}
	} else {
		var file, err = os.Create(fullPath)
		if err != nil {
			return ctx.JSON(
				http.StatusInternalServerError,
				CreateErrorResponse("internal server error", err.Error()),
			)
		}
		file.Close()
	}

	return ctx.JSON(
		http.StatusCreated,
		fmt.Sprintf("successfully created new file at %s", fullPath),
	)
}

// (DELETE /file)
func (s Server) DeleteFile(ctx echo.Context, b64path api.Base64PathParam) error {
	relativePath, err := fileutils.DecodePath(b64path)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	fullPath := path.Join(config.Base, relativePath)
	err = fileutils.Delete(fullPath)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return ctx.JSON(
		http.StatusOK,
		fmt.Sprintf("successfully deleted file at %s", fullPath),
	)
}
