package fileutils

import (
	"file_surfer_backend/api"
	"os"
	"path"
)

func GetFileInfo(pathName string) (*api.File, error) {
	var stat, err = os.Stat(pathName)
	if err != nil {
		return nil, err
	}

	fileType, err := GetMimeType(pathName)
	if err != nil {
		return nil, err
	}

	info := api.File{
		Name:     stat.Name(),
		Modified: stat.ModTime(),
		Size:     int(stat.Size()),
		Type:     fileType,
		Location: path.Dir(pathName),
		Url:      path.Join("/file/", EncodePath(pathName)),
	}

	return &info, nil
}

func GetFolderInfo(pathName string) (*api.Folder, error) {
	var stat, err = os.Stat(pathName)
	if err != nil {
		return nil, err
	}

	items, err := os.ReadDir(pathName)
	if err != nil {
		return nil, err
	}
	info := api.Folder{
		Name:         stat.Name(),
		Modified:     stat.ModTime(),
		Location:     path.Dir(pathName),
		ContentCount: len(items),
		Url:          path.Join("/file/", EncodePath(pathName)),
	}

	return &info, nil
}
