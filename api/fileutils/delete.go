package fileutils

import (
	"os"
)

func DeleteBulk(paths []string) error {
	for _, relativePath := range paths {
		err := Delete(relativePath)
		if err != nil {
			return err
		}
	}

	return nil
}

func Delete(relativePath string) error {
	err := os.RemoveAll(relativePath)
	return err
}
