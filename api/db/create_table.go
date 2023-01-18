package db

const CreateUserTableStmt = `
	CREATE TABLE IF NOT EXISTS user(
		id INTEGER NOT NULL PRIMARY KEY, 
		username TEXT NOT NULL UNIQUE, 
		password TEXT NOT NULL, 
		role TEXT NOT NULL CHECK(role IN ('admin','basic')),
		write INTEGER DEFAULT FALSE NOT NULL,
		base TEXT DEFAULT '.' NOT NULL
	);
`

const CreateSessionStoreTableStmt = `
	CREATE TABLE IF NOT EXISTS session_store(
		token TEXT PRIMARY KEY, 
		content TEXT,
		expired INTEGER
	);
`
