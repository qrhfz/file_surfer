package fileutils

import (
	"io"
	"net/http"
	"os"
)

func GetMimeType(file *os.File) (string, error) {
	buff := make([]byte, 512)

	_, err := file.Read(buff)

	if err != nil && err != io.EOF {
		return "", err
	}
	fileType := http.DetectContentType(buff)

	return fileType, nil
}
