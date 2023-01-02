package server

import (
	"file_surfer_backend/api"

	"github.com/labstack/echo/v4"
)

type Server struct{}

// Your GET endpoint
// (GET /access-token)
func (s Server) GetAccessToken(ctx echo.Context) error {
	panic("not implemented") // TODO: Implement
}

// Your GET endpoint
// (GET /blob)
func (s Server) GetBlob(ctx echo.Context, params api.GetBlobParams) error {
	panic("not implemented") // TODO: Implement
}

// (POST /blob)
func (s Server) PostBlob(ctx echo.Context, params api.PostBlobParams) error {
	panic("not implemented") // TODO: Implement
}

// (POST /copy)
func (s Server) PostCopy(ctx echo.Context) error {
	panic("not implemented") // TODO: Implement
}

// (DELETE /file)
func (s Server) DeleteFile(ctx echo.Context, params api.DeleteFileParams) error {
	panic("not implemented") // TODO: Implement
}

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

// (DELETE /folder)
func (s Server) DeleteFolder(ctx echo.Context, params api.DeleteFolderParams) error {
	panic("not implemented") // TODO: Implement
}

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

// (POST /login)
func (s Server) PostLogin(ctx echo.Context) error {
	panic("not implemented") // TODO: Implement
}

// (POST /move)
func (s Server) PostMove(ctx echo.Context) error {
	panic("not implemented") // TODO: Implement
}

// Your GET endpoint
// (GET /search)
func (s Server) GetSearch(ctx echo.Context, params api.GetSearchParams) error {
	panic("not implemented") // TODO: Implement
}

// (DELETE /user/{id})
func (s Server) DeleteUserId(ctx echo.Context, id string) error {
	panic("not implemented") // TODO: Implement
}

// Your GET endpoint
// (GET /user/{id})
func (s Server) GetUser(ctx echo.Context, id string) error {
	panic("not implemented") // TODO: Implement
}

// (PATCH /user/{id})
func (s Server) PatchUserId(ctx echo.Context, id string) error {
	panic("not implemented") // TODO: Implement
}

// (POST /user/{id})
func (s Server) PostUserId(ctx echo.Context, id string) error {
	panic("not implemented") // TODO: Implement
}
