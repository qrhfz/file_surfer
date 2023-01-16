// Package api provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/deepmap/oapi-codegen version v1.12.4 DO NOT EDIT.
package api

import (
	"time"

	openapi_types "github.com/deepmap/oapi-codegen/pkg/types"
)

const (
	AccessTokenScopes = "accessToken.Scopes"
	TokenScopes       = "token.Scopes"
)

// Defines values for Role.
const (
	Admin Role = "admin"
	Basic Role = "basic"
)

// BaseUser defines model for BaseUser.
type BaseUser struct {
	Role     *Role   `json:"role,omitempty"`
	Username *string `json:"username,omitempty"`
}

// File defines model for File.
type File struct {
	ContentCount *int      `json:"contentCount,omitempty"`
	IsDir        bool      `json:"isDir"`
	Location     string    `json:"location"`
	Modified     time.Time `json:"modified"`
	Name         string    `json:"name"`
	Size         int       `json:"size"`
	Type         string    `json:"type"`
	Url          string    `json:"url"`
}

// NewUser defines model for NewUser.
type NewUser struct {
	Password string `json:"password"`
	Role     Role   `json:"role"`
	Username string `json:"username"`
}

// Role defines model for Role.
type Role string

// UpdateUser defines model for UpdateUser.
type UpdateUser struct {
	Password *string `json:"password,omitempty"`
	Role     *Role   `json:"role,omitempty"`
	Username *string `json:"username,omitempty"`
}

// User defines model for User.
type User struct {
	Id       int    `json:"id"`
	Role     Role   `json:"role"`
	Username string `json:"username"`
}

// PasteRequest defines model for PasteRequest.
type PasteRequest struct {
	Destination *string   `json:"destination,omitempty"`
	Sources     *[]string `json:"sources,omitempty"`
}

// PostCopyJSONBody defines parameters for PostCopy.
type PostCopyJSONBody struct {
	Destination *string   `json:"destination,omitempty"`
	Sources     *[]string `json:"sources,omitempty"`
}

// PatchFileJSONBody defines parameters for PatchFile.
type PatchFileJSONBody struct {
	Name *string `json:"name,omitempty"`
}

// PostFileParams defines parameters for PostFile.
type PostFileParams struct {
	IsDir bool `form:"isDir" json:"isDir"`
}

// PostLoginJSONBody defines parameters for PostLogin.
type PostLoginJSONBody struct {
	Password string `json:"password"`
	Username string `json:"username"`
}

// PostMoveJSONBody defines parameters for PostMove.
type PostMoveJSONBody struct {
	Destination *string   `json:"destination,omitempty"`
	Sources     *[]string `json:"sources,omitempty"`
}

// GetSearchBaseParams defines parameters for GetSearchBase.
type GetSearchBaseParams struct {
	Search string `form:"search" json:"search"`
}

// GetSearchParams defines parameters for GetSearch.
type GetSearchParams struct {
	Search string `form:"search" json:"search"`
}

// UploadMultipartBody defines parameters for Upload.
type UploadMultipartBody struct {
	Files []openapi_types.File `json:"files"`
	Path  string               `json:"path"`
}

// PostCopyJSONRequestBody defines body for PostCopy for application/json ContentType.
type PostCopyJSONRequestBody PostCopyJSONBody

// PatchFileJSONRequestBody defines body for PatchFile for application/json ContentType.
type PatchFileJSONRequestBody PatchFileJSONBody

// PostLoginJSONRequestBody defines body for PostLogin for application/json ContentType.
type PostLoginJSONRequestBody PostLoginJSONBody

// PatchCurrentUserJSONRequestBody defines body for PatchCurrentUser for application/json ContentType.
type PatchCurrentUserJSONRequestBody = UpdateUser

// PostMoveJSONRequestBody defines body for PostMove for application/json ContentType.
type PostMoveJSONRequestBody PostMoveJSONBody

// UploadMultipartRequestBody defines body for Upload for multipart/form-data ContentType.
type UploadMultipartRequestBody UploadMultipartBody

// PatchUserJSONRequestBody defines body for PatchUser for application/json ContentType.
type PatchUserJSONRequestBody = UpdateUser
