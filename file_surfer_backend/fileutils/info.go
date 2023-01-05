package fileutils

import (
	"file_surfer_backend/api"
	"os"
)

func GetFileInfo(pathName string) (*api.File, error) {
	file, err := os.Open(pathName)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	fsFileInfo, err := file.Stat()
	if err != nil {
		return nil, err
	}

	name := fsFileInfo.Name()
	modified := fsFileInfo.ModTime()
	size := int(fsFileInfo.Size())
	fileType, err := GetMimeType(pathName)
	if err != nil {
		return nil, err
	}

	info := api.File{
		Name:     name,
		Modified: modified,
		Size:     size,
		Type:     fileType,
	}

	return &info, nil
}

func NewDir() {

}
