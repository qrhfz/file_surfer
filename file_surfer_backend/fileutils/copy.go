package fileutils

import "os"

func Copy(src, dest string) error {

	input, err := os.ReadFile(src)
	if err != nil {
		return err
	}

	err = os.WriteFile(dest, input, 0750)
	if err != nil {
		return err
	}
	return nil
}
