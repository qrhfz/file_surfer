package server

import (
	"file_surfer_backend/api"

	"github.com/labstack/echo/v4"
)

// Your GET endpoint
// (GET /file)
func (s Server) GetFile(ctx echo.Context, params api.GetFileParams) error {
	panic("not implemented") // TODO: Implement
}

// (PATCH /file)
func (s Server) PatchFile(ctx echo.Context, params api.PatchFileParams) error {
	panic("not implemented") // TODO: Implement
}

// (POST /file)
func (s Server) PostFile(ctx echo.Context, params api.PostFileParams) error {
	panic("not implemented") // TODO: Implement
}

// (DELETE /file)
func (s Server) DeleteFile(ctx echo.Context, params api.DeleteFileParams) error {
	panic("not implemented") // TODO: Implement
}
