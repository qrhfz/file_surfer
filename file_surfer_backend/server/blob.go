package server

import (
	"file_surfer_backend/api"

	"github.com/labstack/echo/v4"
)

// Your GET endpoint
// (GET /blob)
func (s Server) GetBlob(ctx echo.Context, params api.GetBlobParams) error {
	panic("not implemented") // TODO: Implement
}

// (POST /blob)
func (s Server) PostBlob(ctx echo.Context, params api.PostBlobParams) error {
	panic("not implemented") // TODO: Implement
}
