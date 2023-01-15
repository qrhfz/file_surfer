package fileutils_test

import (
	"file_surfer/api/config"
	"file_surfer/api/fileutils"
	"os"
	"path/filepath"
	"testing"
)

func TestGetFileInfo(t *testing.T) {
	setUp(t)
	defer tearDown(t)
	f, err := fileutils.GetFileInfo(filepath.Join(config.Base, "a"))
	if err != nil {
		t.Fatal(err.Error())
	}

	if f.Name != "a" {
		t.Fatal("name does not match")
	}

	if f.Location != "." {
		t.Fatal("expected", ".", "actual", f.Location)
	}

	if f.Type != "text/plain; charset=utf-8" {
		t.Fatal("expected", "text/plain; charset=utf-8", "actual", f.Type)
	}

	if f.IsDir {
		t.Fatal("not directory")
	}

	if f.ContentCount != nil {
		t.Fatal("file does not have content count")
	}

}

func setUp(t *testing.T) {
	wd, _ := os.Getwd()
	config.Base = filepath.Join(wd, "folder")
	err := os.Mkdir("./folder", 0750)
	if err != nil {
		t.Fatal(err.Error())
	}

	_, err = os.Create("./folder/a")
	if err != nil {
		t.Fatal(err.Error())
	}
}

func tearDown(t *testing.T) {
	os.RemoveAll("./folder")
}
