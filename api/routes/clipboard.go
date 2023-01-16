package routes

import (
	"file_surfer/controllers"
)

func (app *App) registerClipboardRoutes() {
	app.base.POST("/copy", controllers.PostCopy)
	app.base.POST("/move", controllers.PostMove)
}
