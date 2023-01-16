package routes

import (
	"file_surfer/controllers"
)

func (api *ApiRoute) registerFileGroup() {
	loggedInMW := AllowLoggedInOnly(api.services.Auth)
	accessTokenMW := NeedAccessToken(api.services.Auth)

	fileGroup := api.base.Group("/file/:path")
	fileGroup.GET("", controllers.GetFile, loggedInMW)
	fileGroup.POST("", controllers.PostFile, loggedInMW)
	fileGroup.PATCH("", controllers.PatchFile, loggedInMW)
	fileGroup.DELETE("", controllers.DeleteFile, loggedInMW)
	fileGroup.GET("/blob", controllers.GetBlob, accessTokenMW)
}
