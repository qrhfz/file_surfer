package user_test

import (
	"database/sql"
	appDB "file_surfer_backend/db"
	"file_surfer_backend/user"
	"testing"

	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/assert"
)

func setUp(t *testing.T) (*user.UserService, func()) {
	db, err := sql.Open("sqlite3", ":memory:")
	if err != nil {
		t.Fatal(err.Error())
	}

	db.Exec(appDB.CreateUserTableStmt)

	userService := user.NewUserService(db)

	return userService, func() {
		db.Close()
	}
}

func TestCreateNewUser(t *testing.T) {

	userService, tearDown := setUp(t)
	defer tearDown()

	username, password, role := "a", "b", "basic"

	id, err := userService.CreateNewUser(username, password, role)
	if err != nil {
		t.Fatal(err.Error())
	}

	assert.Equal(t, 1, id)
}

func TestCreateNewUserWithInvalidRole(t *testing.T) {

	userService, tearDown := setUp(t)
	defer tearDown()

	username, password, role := "a", "b", "bogus"

	id, err := userService.CreateNewUser(username, password, role)

	assert.Zero(t, id)
	assert.NotNil(t, err)
}
