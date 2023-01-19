package routes

import (
	"net/http"

	"file_surfer/controllers"

	"github.com/labstack/echo/v4"
)

func (app *App) registerSearchRoutes() {
	app.base.GET("/search/", search)
	app.base.GET("/search/:path", search, app.middlewares.ResolvePath)
}

func search(c echo.Context) error {
	path := c.Get("fullPath").(string)

	search := c.QueryParam("search")
	results, err := controllers.SearchFolder(path, search)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, results)
}
