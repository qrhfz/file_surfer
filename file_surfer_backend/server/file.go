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
	panic("not implemented") // TODO: Implement
}

// (POST /file)
func (s Server) PostFile(ctx echo.Context, params api.PostFileParams) error {
	var body api.NewFileRequest
	err := ctx.Bind(&body)
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, CreateErrorResponse("bad request", err.Error()))
	}
	fullPath := path.Join(base, body.Name)

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
	panic("not implemented") // TODO: Implement
}
