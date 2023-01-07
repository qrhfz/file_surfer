package fileutils

import (
	"file_surfer_backend/api"
	"file_surfer_backend/config"
	"fmt"
	"os"
	pathpkg "path"
	"strings"
)

// [pathName] relative to base
func GetFileInfo(pathName string) (*api.File, error) {

	var stat, err = os.Stat(pathName)
	if err != nil {
		return nil, err
	}

	fileType := ""
	contentCount := 0

	if stat.IsDir() {
		i, err := os.ReadDir(pathName)
		if err != nil {
			return nil, err
		}
		contentCount = len(i)
		fileType = "directory"
	} else { // its a file
		fileType, err = GetMimeType(pathName)
		if err != nil {
			return nil, err
		}
	}

	if strings.HasPrefix(pathName, config.Base) {
		pathName = strings.Replace(pathName, config.Base, "", 1)
	}
	location := pathpkg.Dir(pathName)
	url := fmt.Sprintf("/file/%s", EncodePath(pathName))
	info := api.File{
		IsDir:        stat.IsDir(),
		Name:         stat.Name(),
		Modified:     stat.ModTime(),
		Size:         int(stat.Size()),
		Type:         fileType,
		Location:     location,
		ContentCount: &contentCount,
		Url:          url,
	}

	return &info, nil
}
