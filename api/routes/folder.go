package routes

import (
	"file_surfer/controllers"
)

func (api *ApiRoute) registerFolderRoute() {

	api.base.GET("/folder", controllers.GetFolder, api.middlewares.LoggedInOnly)
	api.base.GET("/folder/", controllers.GetFolder, api.middlewares.LoggedInOnly)
	api.base.GET("/folder/:path", controllers.GetFolder, api.middlewares.LoggedInOnly)
}
