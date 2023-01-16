package routes

import (
	"file_surfer/controllers"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func (app *App) registerUserRoutes() {
	uct := controllers.NewUserController(app.services.User)

	g := app.base.Group("/user", app.middlewares.AdminOnly)
	g.GET("", uct.GetUsers)
	g.POST("", uct.CreateUser)
	g.GET("/:id", uct.GetUserById, extractIdParam)
	g.PATCH("/:id", uct.UpdateUser, extractIdParam)
	g.DELETE("/:id", uct.DeleteUser, extractIdParam)
}

func extractIdParam(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, "invalid id")
		}
		c.Set("id", id)

		return next(c)
	}
}
