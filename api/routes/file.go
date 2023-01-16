package routes

import (
	"file_surfer/controllers"
)

func (app *App) registerFileGroup() {
	loggedInMW := app.middlewares.LoggedInOnly
	accessTokenMW := app.middlewares.AccessToken

	fileGroup := app.base.Group("/file/:path")
	fileGroup.GET("", controllers.GetFile, loggedInMW)
	fileGroup.POST("", controllers.PostFile, loggedInMW)
	fileGroup.PATCH("", controllers.PatchFile, loggedInMW)
	fileGroup.DELETE("", controllers.DeleteFile, loggedInMW)
	fileGroup.GET("/blob", controllers.GetBlob, accessTokenMW)
}
