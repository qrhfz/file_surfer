package routes

import (
	"file_surfer/controllers"
)

func (app *App) registerFolderRoute() {

	app.base.GET("/folder", controllers.GetFolder, app.middlewares.LoggedInOnly)
	app.base.GET("/folder/", controllers.GetFolder, app.middlewares.LoggedInOnly)
	app.base.GET("/folder/:path", controllers.GetFolder, app.middlewares.LoggedInOnly)
}
