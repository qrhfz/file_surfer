package fileutils

import (
	"io"
	"net/http"
	"os"
)

func GetMimeType(path string) (string, error) {
	file, err := os.Open(path)
	if err != nil {
		return "", err
	}
	defer file.Close()

	reader := io.LimitReader(file, 512)
	buf, err := io.ReadAll(reader)

	if err != nil && err != io.EOF {
		return "", err
	}
	fileType := http.DetectContentType(buf)
	return fileType, nil
}
