package routes

import (
	"file_surfer/auth"
	"file_surfer/controllers"

	"github.com/labstack/echo/v4"
)

func registerFileGroup(e *echo.Group, auths *auth.AuthService) {
	fileGroup := e.Group("/file/:path")
	fileGroup.GET("", controllers.GetFile, AllowLoggedInOnly(auths))
	fileGroup.POST("", controllers.PostFile, AllowLoggedInOnly(auths))
	fileGroup.PATCH("", controllers.PatchFile, AllowLoggedInOnly(auths))
	fileGroup.DELETE("", controllers.DeleteFile, AllowLoggedInOnly(auths))
	fileGroup.GET("/blob", controllers.GetBlob, NeedAccessToken(auths))
}
