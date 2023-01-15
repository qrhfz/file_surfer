package routes

import (
	"github.com/qrhfz/file_surfer/api/auth"
	"github.com/qrhfz/file_surfer/api/server"

	"github.com/labstack/echo/v4"
)

func registerFileGroup(e *echo.Group, auths *auth.AuthService) {
	fileGroup := e.Group("/file/:path")
	fileGroup.GET("", server.GetFile, AllowLoggedInOnly(auths))
	fileGroup.POST("", server.PostFile, AllowLoggedInOnly(auths))
	fileGroup.PATCH("", server.PatchFile, AllowLoggedInOnly(auths))
	fileGroup.DELETE("", server.DeleteFile, AllowLoggedInOnly(auths))
	fileGroup.GET("/blob", server.GetBlob, NeedAccessToken(auths))
}
