package routes

import (
	"file_surfer/controllers"
)

func (app *App) registerUserRoutes() {
	uct := controllers.NewUserController(app.services.User)

	g := app.base.Group("/user", app.middlewares.AdminOnly)
	g.GET("", uct.GetUsers)
	g.POST("", uct.CreateUser)
}
