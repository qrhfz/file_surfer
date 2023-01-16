package routes

import (
	"file_surfer/controllers"

	"github.com/labstack/echo/v4"
)

func registerFileGroup(e *echo.Group, service *Services) {

	loggedInMW := AllowLoggedInOnly(service.Auth)
	accessTokenMW := NeedAccessToken(service.Auth)

	fileGroup := e.Group("/file/:path")
	fileGroup.GET("", controllers.GetFile, loggedInMW)
	fileGroup.POST("", controllers.PostFile, loggedInMW)
	fileGroup.PATCH("", controllers.PatchFile, loggedInMW)
	fileGroup.DELETE("", controllers.DeleteFile, loggedInMW)
	fileGroup.GET("/blob", controllers.GetBlob, accessTokenMW)
}
