package user

import (
	"database/sql"
)

type UserServiceT struct {
	db sql.DB
}
