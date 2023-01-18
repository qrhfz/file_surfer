package db

import (
	"database/sql"
	"file_surfer/config"
	"log"

	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"
)

const insertAdminStmt = `INSERT OR IGNORE 
	INTO user(username, password, role, write) 
	VALUES('admin',?,'admin', TRUE);`

func Connect() *sql.DB {
	var err error
	DB, err := sql.Open("sqlite3", "./file_surfer.db")
	if err != nil {
		log.Fatal(err)
	}

	_, err = DB.Exec(CreateSessionStoreTableStmt)
	if err != nil {
		log.Fatal(err.Error())
	}

	_, err = DB.Exec(CreateUserTableStmt)
	if err != nil {
		log.Fatal(err.Error())
	}

	hash, _ := bcrypt.GenerateFromPassword([]byte("admin"), config.HashCost)

	_, err = DB.Exec(insertAdminStmt, string(hash))
	if err != nil {
		log.Fatal(err.Error())
	}

	return DB
}
