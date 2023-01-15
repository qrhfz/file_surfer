package fileutils

import (
	"io"
	"os"
)

func ReadTextFile(pathName string) (string, error) {
	file, err := os.Open(pathName)
	if err != nil {
		return "", err
	}
	defer file.Close()

	buf, err := io.ReadAll(file)
	if err != nil {
		return "", err
	}

	return string(buf), nil
}
