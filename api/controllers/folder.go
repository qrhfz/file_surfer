package controllers

import (
	"io"
	"io/fs"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
	"sync"

	"file_surfer/config"
	"file_surfer/fileutils"

	"file_surfer/api"

	"github.com/labstack/echo/v4"
)

func GetFolder(ctx echo.Context) error {
	dirPath := ctx.Get("fullPath").(string)
	files, err := os.ReadDir(dirPath)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, err.Error())
	}

	response := make([]api.File, 0, len(files))

	for _, f := range files {
		// fmt.Println(f.Name())
		childPath := path.Join(dirPath, f.Name())

		fileInfo, err := fileutils.GetFileInfo(childPath)
		if err != nil && err != io.EOF {
			continue
			// return ctx.JSON(http.StatusInternalServerError, err.Error())
		}

		response = append(response, *fileInfo)
	}

	return ctx.JSON(http.StatusOK, response)
}

func SearchFolder(pathName, search string) ([]api.File, error) {
	pathName = filepath.Join(config.Base, pathName)
	results := make([]api.File, 0)

	search = strings.ToLower(search)
	fChan := make(chan *api.File, 100)
	job := 0
	var wg sync.WaitGroup

	err := filepath.Walk(pathName,
		func(path string, info fs.FileInfo, err error) error {
			if err != nil {
				return err
			}

			go matchFile(info, search, path, fChan, &wg, &job)
			return nil
		},
	)

	if err != nil {
		return nil, err
	}

	for f := range fChan {
		results = append(results, *f)
		if job <= 0 {
			break
		}
	}

	return results, nil
}

func matchFile(info fs.FileInfo, search, path string, fChan chan<- *api.File, wg *sync.WaitGroup, job *int) {
	wg.Add(1)
	*job++
	wg.Done()

	defer func() {
		wg.Add(1)
		*job--
		wg.Done()
	}()

	name := strings.ToLower(info.Name())
	if !strings.Contains(name, search) {
		return
	}
	inf, err := fileutils.GetFileInfo(path)
	if err != nil {
		return
	}
	fChan <- inf
}
