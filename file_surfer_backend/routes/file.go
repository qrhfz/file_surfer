package routes

import (
	"file_surfer_backend/auth"
	"file_surfer_backend/server"

	"github.com/labstack/echo/v4"
)

func registerFileGroup(e *echo.Echo, auths auth.AuthService) {
	fileGroup := e.Group("/file/:path", AllowLoggedInOnly(auths))
	fileGroup.GET("", server.GetFile)
	fileGroup.POST("", server.PostFile)
	fileGroup.PATCH("", server.PatchFile)
	fileGroup.DELETE("", server.DeleteFile)
	fileGroup.GET("/blob", server.GetBlob)
}
