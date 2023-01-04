package fileutils

import b64 "encoding/base64"

func EncodePath(input string) string {
	return b64.URLEncoding.EncodeToString([]byte(input))
}

func DecodePath(input string) (string, error) {
	bytes, err := b64.URLEncoding.DecodeString(input)

	return string(bytes), err
}
