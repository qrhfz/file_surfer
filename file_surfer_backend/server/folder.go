package server

import (
	"file_surfer_backend/api"
	"file_surfer_backend/fileutils"
	"io"
	"net/http"
	"os"
	"path"

	"github.com/labstack/echo/v4"
)

// Your GET endpoint
// (GET /folder)
func (s Server) GetFolder(ctx echo.Context, params api.GetFolderParams) error {

	relativePath := params.Path
	workingDir := path.Join(base, relativePath)
	files, err := os.ReadDir(workingDir)
	if err != nil {
		return err
	}

	var response api.FolderContent
	folders := make([]api.Folder, 0)
	filelist := make([]api.File, 0)
	response.Folders = &folders
	response.Files = &filelist

	for _, f := range files {
		fileInfo, err := f.Info()

		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, err.Error())
		}

		name := f.Name()
		size := int(fileInfo.Size())
		modified := fileInfo.ModTime()
		fileLocation := path.Join(workingDir, name)

		if fileInfo.IsDir() {
			var items, err = os.ReadDir(fileLocation)
			if err != nil {
				return ctx.JSON(http.StatusInternalServerError, err.Error())
			}

			contentCount := len(items)

			folders = append(folders, api.Folder{
				Name:         name,
				Size:         size,
				Modified:     modified,
				Location:     relativePath,
				ContentCount: contentCount,
			})

			continue
		}

		if (fileInfo.Mode() & os.ModeSymlink) != os.ModeSymlink {
			fileType, err := fileutils.GetMimeType(fileLocation)
			if err != nil && err != io.EOF {
				return ctx.JSON(http.StatusInternalServerError, err.Error())
			}

			filelist = append(filelist, api.File{
				Name:     name,
				Size:     size,
				Modified: modified,
				Location: relativePath,
				Type:     fileType,
			})
		}

	}

	return ctx.JSON(http.StatusOK, response)
}
