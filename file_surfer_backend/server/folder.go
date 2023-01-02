package server

import (
	"file_surfer_backend/api"

	"github.com/labstack/echo/v4"
)

// Your GET endpoint
// (GET /folder)
func (s Server) GetFolder(ctx echo.Context, params api.GetFolderParams) error {
	panic("not implemented") // TODO: Implement
}

// (PATCH /folder)
func (s Server) PatchFolder(ctx echo.Context, params api.PatchFolderParams) error {
	panic("not implemented") // TODO: Implement
}

// (POST /folder)
func (s Server) PostFolder(ctx echo.Context, params api.PostFolderParams) error {
	panic("not implemented") // TODO: Implement
}
