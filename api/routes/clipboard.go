package routes

import (
	"file_surfer/controllers"
)

func (api *ApiRoute) registerClipboardRoutes() {
	api.base.POST("/copy", controllers.PostCopy)
	api.base.POST("/move", controllers.PostMove)
}
