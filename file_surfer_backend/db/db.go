package db

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func init() {
	var err error
	DB, err = sql.Open("sqlite3", "./foo.db")
	if err != nil {
		log.Fatal(err)
	}

	DB.Exec(CreateSessionStoreTableStmt)

	DB.Exec(CreateUserTableStmt)
}
