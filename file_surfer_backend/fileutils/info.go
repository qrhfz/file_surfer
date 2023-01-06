package fileutils

import (
	"file_surfer_backend/api"
	"fmt"
	"os"
	pathpkg "path"
)

// [pathName] relative to base
func GetFileInfo(pathName string) (*api.File, error) {
	fmt.Println(pathName)

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
	location := pathpkg.Dir(pathName)
	info := api.File{
		IsDir:        stat.IsDir(),
		Name:         stat.Name(),
		Modified:     stat.ModTime(),
		Size:         int(stat.Size()),
		Type:         fileType,
		Location:     location,
		ContentCount: &contentCount,
		Url:          fmt.Sprintf("/file/%s", pathpkg.Join(location, stat.Name())),
	}

	return &info, nil
}
