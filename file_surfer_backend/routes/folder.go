package routes

import (
	"file_surfer_backend/fileutils"
	"file_surfer_backend/server"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

func registerFolderRoute(e *echo.Echo) {

	e.GET("/folder/:path/search", func(c echo.Context) error {
		path, err := fileutils.DecodePath(c.Param("path"))
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, err.Error())
		}
		if path == "" {
			path = "."
		}
		fmt.Println("search", path)

		search := c.QueryParam("search")
		results, err := server.SearchFolder(path, search)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
		return c.JSON(http.StatusOK, results)
	})
	e.GET("/folder", server.GetFolder)
	e.GET("/folder/", server.GetFolder)
	e.GET("/folder/:path", server.GetFolder)

}
