package routes

import (
	"file_surfer/controllers"
)

func (app *App) registerClipboardRoutes() {
	ctl := controllers.NewClipboardController(app.services.Auth)

	app.base.POST("/copy", ctl.PostCopy, app.middlewares.LoggedInOnly)
	app.base.POST("/move", ctl.PostMove, app.middlewares.LoggedInOnly)
}
