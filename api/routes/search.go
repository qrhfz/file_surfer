package routes

import (
	"net/http"

	"file_surfer/controllers"
	"file_surfer/fileutils"

	"github.com/labstack/echo/v4"
)

func (app *App) registerSearchRoutes() {
	app.base.GET("/search/", search)
	app.base.GET("/search/:path", search)
}

func search(c echo.Context) error {
	path, err := fileutils.DecodePath(c.Param("path"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	search := c.QueryParam("search")
	results, err := controllers.SearchFolder(path, search)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, results)
}
