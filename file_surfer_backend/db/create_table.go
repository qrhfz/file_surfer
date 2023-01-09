package db

const CreateUserTableStmt = `
	CREATE TABLE IF NOT EXISTS user(
		id INTEGER NOT NULL PRIMARY KEY, 
		username TEXT NOT NULL UNIQUE, 
		password TEXT NOT NULL, 
		role TEXT NOT NULL CHECK(role IN ('admin','basic'))
	);
`

const CreateSessionStoreTableStmt = `
	CREATE TABLE IF NOT EXISTS session_store(
		token TEXT NOT NULL UNIQUE, 
		content TEXT
	);
`
