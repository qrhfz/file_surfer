package user

import (
	"database/sql"
	"file_surfer/api"
)

type UserService struct {
	db *sql.DB
}

func NewUserService(db *sql.DB) *UserService {
	service := UserService{
		db: db,
	}

	return &service
}

type User = api.User
