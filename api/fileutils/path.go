package fileutils

import (
	"net/url"
)

func EncodePath(input string) string {
	return url.QueryEscape(input)
}

func DecodePath(input string) (string, error) {
	bytes, err := url.QueryUnescape(input)

	return string(bytes), err
}
