package auth

import (
	"database/sql"
	"file_surfer_backend/db"

	"golang.org/x/crypto/bcrypt"
)

var Auth = AuthT{
	db: db.DB,
}

type AuthT struct {
	db *sql.DB
}

func (a *AuthT) Login(username, password string) (*string, error) {
	row := a.db.QueryRow("SELECT password FROM user WHERE username=?;", username)

	var hashedPassword string
	row.Scan(&hashedPassword)

	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		return nil, err
	}

	token := ""
	return &token, nil
}
