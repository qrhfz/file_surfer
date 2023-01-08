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

	DB.Exec(
		`CREATE TABLE IF NOT EXISTS user(
			id INTEGER NOT NULL PRIMARY KEY, 
			username TEXT NOT NULL UNIQUE, 
			password TEXT NOT NULL, 
			role TEXT NOT NULL CHECK(role IN ('admin','basic'))
		);`,
	)
}
