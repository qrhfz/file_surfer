package routes

import (
	"fmt"
	"net/http"

	"file_surfer/controllers"
	"file_surfer/fileutils"

	"github.com/labstack/echo/v4"
)

func (api *ApiRoute) registerSearchRoutes() {
	api.base.GET("/search/", search)
	api.base.GET("/search/:path", search)
}

func search(c echo.Context) error {
	path, err := fileutils.DecodePath(c.Param("path"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	fmt.Println("search", path)

	search := c.QueryParam("search")
	results, err := controllers.SearchFolder(path, search)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, results)
}
