package routes

import (
	"file_surfer/auth"
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

	getCurrentUserId := newCurrentUserIdExtractor(app.services.Auth)
	g.GET("/me", uct.GetUserById, getCurrentUserId)
	g.PATCH("/me", uct.UpdateUser, getCurrentUserId)
	g.DELETE("/me", uct.DeleteUser, getCurrentUserId)

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

func newCurrentUserIdExtractor(a *auth.AuthService) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			token, err := auth.GetBearerToken(c)
			if err != nil {
				return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
			}

			u, err := a.GetUserFromToken(token)
			if err != nil {
				return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
			}

			c.Set("id", u.Id)

			return next(c)
		}
	}
}
