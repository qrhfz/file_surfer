package user

import (
	"database/sql"
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

type User struct {
	Id       string
	Username string
	Password string
	Role     string
}
