package routes

import (
	"file_surfer/controllers"
)

func (api *ApiRoute) registerFolderRoute() {
	loggedInMW := api.AllowLoggedInOnly()

	api.base.GET("/folder", controllers.GetFolder, loggedInMW)
	api.base.GET("/folder/", controllers.GetFolder, loggedInMW)
	api.base.GET("/folder/:path", controllers.GetFolder, loggedInMW)
}
