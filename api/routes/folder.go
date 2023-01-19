package routes

import (
	"file_surfer/controllers"
)

func (app *App) registerFolderRoute() {
	g := app.base.Group("/folder",
		app.middlewares.LoggedInOnly,
		app.middlewares.ResolvePath,
	)
	g.GET("", controllers.GetFolder)
	g.GET("/", controllers.GetFolder)
	g.GET("/:path", controllers.GetFolder)
}
