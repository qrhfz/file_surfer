package routes

import (
	"file_surfer/controllers"
)

func (app *App) registerFileGroup() {
	app.base.GET("/file/:path/blob", controllers.GetBlob,
		app.middlewares.AccessToken,
	)

	fileGroup := app.base.Group("/file/:path",
		app.middlewares.LoggedInOnly,
		app.middlewares.ResolvePath,
	)

	fileGroup.GET("", controllers.GetFile)
	fileGroup.POST("", controllers.PostFile)
	fileGroup.PATCH("", controllers.PatchFile)
	fileGroup.DELETE("", controllers.DeleteFile)
}
