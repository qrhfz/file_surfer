package routes

import (
	"file_surfer_backend/server"

	"github.com/labstack/echo/v4"
)

func registerBlobGroup(e *echo.Group) {
	fileGroup := e.Group("/blob")
	fileGroup.GET("", server.GetBlob)
	fileGroup.POST("", server.PostBlob)
}
