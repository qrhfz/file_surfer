package server

import (
	"file_surfer_backend/api"
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
func (s Server) GetFile(ctx echo.Context, params api.GetFileParams) error {
	fullPath := path.Join(base, params.Path)

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
func (s Server) PatchFile(ctx echo.Context, params api.PatchFileParams) error {
	var body api.PatchFileJSONBody
	err := ctx.Bind(&body)
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, CreateErrorResponse("rename file", err.Error()))
	}
	oldPath := path.Join(base, params.Path)
	newPath := path.Join(base, params.Path, "..", *body.Name)

	os.Rename(oldPath, newPath)

	return ctx.JSON(http.StatusOK, api.SuccessMessage{
		Success: fmt.Sprintf("success renaming %s to %s", oldPath, newPath),
	})
}

// (POST /file)
func (s Server) PostFile(ctx echo.Context, params api.PostFileParams) error {
	var body api.NewFileRequest
	err := ctx.Bind(&body)
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, CreateErrorResponse("bad request", err.Error()))
	}
	fullPath := path.Join(base, params.Path, body.Name)

	fmt.Print(body.Name)

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
func (s Server) DeleteFile(ctx echo.Context, params api.DeleteFileParams) error {

	for _, relativePath := range params.Paths {
		err := os.RemoveAll(path.Join(base, relativePath))
		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, CreateErrorResponse("delete file", err.Error()))
		}
	}

	return ctx.JSON(http.StatusOK, api.SuccessMessage{
		Success: fmt.Sprintf("%d file(s) was successfully deleted", len(params.Paths)),
	})
}
