package fileutils

import (
	"errors"
	"fmt"
	"os"
	pathpkg "path"
	"path/filepath"

	"file_surfer/api"
	"file_surfer/config"
)

// [pathName] must be absolute
func GetFileInfo(pathName string) (*api.File, error) {
	if !filepath.IsAbs(pathName) {
		return nil, errors.New("not absolute path")
	}

	var stat, err = os.Stat(pathName)
	if err != nil {
		return nil, err
	}

	fileType := ""
	var contentCount int

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

	rel, err := filepath.Rel(config.Base, pathName)
	if err != nil {
		return nil, err
	}

	location := pathpkg.Dir(rel)
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
