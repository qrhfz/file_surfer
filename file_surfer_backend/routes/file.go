package routes

import (
	"file_surfer_backend/server"

	"github.com/labstack/echo/v4"
)

func registerFileGroup(e *echo.Echo) {
	fileGroup := e.Group("/file/:path")
	fileGroup.GET("", server.GetFile)
	fileGroup.POST("", server.PostFile)
	fileGroup.PATCH("", server.PatchFile)
	fileGroup.DELETE("", server.DeleteFile)

	registerBlobGroup(fileGroup)
}
