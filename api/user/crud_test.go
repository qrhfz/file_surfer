package user_test

import (
	"database/sql"
	"testing"

	appDB "file_surfer/db"
	"file_surfer/user"

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

func TestGetUsers(t *testing.T) {
	userService, tearDown := setUp(t)
	defer tearDown()

	userService.CreateNewUser("a", "a", "basic")
	userService.CreateNewUser("b", "b", "basic")

	users, err := userService.GetUsers()
	if err != nil {
		t.Fatal(err.Error())
	}

	assert.Equal(t, 2, len(users))
}

func TestGetUser(t *testing.T) {
	userService, tearDown := setUp(t)
	defer tearDown()

	u := user.User{
		Username: "a",
		Password: "a",
		Role:     "basic",
	}

	id, err := userService.CreateNewUser(u.Username, u.Password, u.Role)
	if err != nil {
		t.Fatal(err.Error())
	}

	actualU, err := userService.GetUser(id)
	if err != nil {
		t.Fatal(err.Error())
	}

	assert.Equal(t, 1, actualU.Id)
	assert.Equal(t, u.Username, actualU.Username)
	assert.Equal(t, u.Role, actualU.Role)
}

func TestGetPassword(t *testing.T) {
	userService, tearDown := setUp(t)
	defer tearDown()

	id, err := userService.CreateNewUser("a", "123", "basic")
	if err != nil {
		t.Fatal(err.Error())
	}

	pass, err := userService.GetPassword(id)
	if err != nil {
		t.Fatal(err.Error())
	}

	assert.Equal(t, "123", pass)
}

func TestUpdateUser(t *testing.T) {
	userService, tearDown := setUp(t)
	defer tearDown()

	userService.CreateNewUser("a", "a", "basic")

	newUsername := "a"

	u, err := userService.UpdateUser(user.UserUpdateParam{
		ID:       1,
		Username: &newUsername,
	})
	if err != nil {
		t.Fatal(err.Error())
	}
	assert.Equal(t, "a", u.Username)

	t.Log(u)
}

func TestDeleteUser(t *testing.T) {
	userService, tearDown := setUp(t)
	defer tearDown()

	userService.CreateNewUser("a", "a", "basic")
	err := userService.DeleteUser(1)
	if err != nil {
		t.Fatal(err.Error())
	}
}
