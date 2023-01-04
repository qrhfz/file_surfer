package server

import (
	"file_surfer_backend/api"
	"fmt"
	"net/http"
	"os"
	"path"

	"github.com/labstack/echo/v4"
)

// Your GET endpoint
// (GET /file)
func (s Server) GetFile(ctx echo.Context, params api.GetFileParams) error {

	return ctx.JSON(http.StatusNotImplemented, CreateErrorResponse("not implemented", "GetFile not implemented"))
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

	success := fmt.Sprintf("success renaming %s to %s", oldPath, newPath)

	return ctx.JSON(http.StatusOK, api.SuccessMessage{
		Success: &success,
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
	fullPath := path.Join(base, params.Path)
	err := os.RemoveAll(fullPath)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, CreateErrorResponse("delete file", err.Error()))
	}
	success := fmt.Sprintf("%s successfully deleted", fullPath)

	return ctx.JSON(http.StatusOK, api.SuccessMessage{
		Success: &success,
	})
}
