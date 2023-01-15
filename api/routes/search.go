package routes

import (
	"fmt"
	"net/http"

	"file_surfer/api/fileutils"
	"file_surfer/api/server"

	"github.com/labstack/echo/v4"
)

func registerSearchRoutes(e *echo.Group) {
	e.GET("/search/", search)
	e.GET("/search/:path", search)
}

func search(c echo.Context) error {
	path, err := fileutils.DecodePath(c.Param("path"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	fmt.Println("search", path)

	search := c.QueryParam("search")
	results, err := server.SearchFolder(path, search)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, results)
}
