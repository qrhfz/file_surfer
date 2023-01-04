package server

import "file_surfer_backend/api"

func CreateErrorResponse(e, message string) api.Error {
	return api.Error{
		Error:   e,
		Message: message,
	}
}
