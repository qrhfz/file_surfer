package user

import (
	"file_surfer/api"
	"file_surfer/config"

	"golang.org/x/crypto/bcrypt"
)

const createUserStmt = `INSERT INTO 
user(username, password, role, base, write) 
values(?,?,?,?,?) 
RETURNING id, username, role, base, write;`

func (us *UserService) CreateNewUser(u api.NewUser) (*api.User, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(u.Password), config.HashCost)
	if err != nil {
		return nil, err
	}

	row := us.db.QueryRow(
		createUserStmt,
		u.Username,
		string(hash),
		u.Role,
		u.Base,
		u.Write,
	)
	var created api.User
	row.Scan(&created.Id, &created.Username, &created.Role, &created.Base, &created.Write)
	if err != nil {
		return nil, err
	}
	return &created, nil
}

const selectUserStmt = `SELECT id, username, role, base, write FROM user;`

func (us *UserService) GetUsers() ([]User, error) {
	rows, err := us.db.Query(selectUserStmt)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users := make([]User, 0)

	for rows.Next() {
		u := User{}
		err := rows.Scan(&u.Id, &u.Username, &u.Role, &u.Base, &u.Write)
		if err != nil {
			return nil, err
		}

		users = append(users, u)
	}

	return users, nil
}

const selectUserByIdStmt = `
SELECT id, username, role, base, write 
FROM user WHERE id=?;`

func (us *UserService) GetUser(id int) (*User, error) {
	row := us.db.QueryRow(selectUserByIdStmt, id)

	u := User{}

	err := row.Scan(&u.Id, &u.Username, &u.Role, &u.Base, &u.Write)
	if err != nil {
		return nil, err
	}

	return &u, nil
}

const selectUserByUsername = `
SELECT id, username, role, base, write 
FROM user WHERE username=?;`

func (us *UserService) GetUserByUsername(username string) (*User, error) {
	row := us.db.QueryRow(selectUserByUsername, username)

	u := User{}

	err := row.Scan(&u.Id, &u.Username, &u.Role, &u.Base, &u.Write)
	if err != nil {
		return nil, err
	}

	return &u, nil
}

func (us *UserService) GetPassword(id int) (string, error) {
	row := us.db.QueryRow(`SELECT password FROM user WHERE id=?;`, id)

	password := ""
	err := row.Scan(&password)
	if err != nil {
		return "", err
	}
	return password, nil
}

func (us *UserService) GetPasswordByUsername(username string) (string, error) {
	row := us.db.QueryRow(`SELECT password FROM user WHERE username=?;`, username)

	password := ""
	err := row.Scan(&password)
	if err != nil {
		return "", err
	}
	return password, nil
}

type UserUpdateParam struct {
	ID       int
	Username *string
	Password *string
	Role     *string
	Base     *string
	Write    *bool
}

const updateStmt = `
UPDATE user 
SET 
	username=coalesce(?,username),
	password=coalesce(?,password),
	role=coalesce(?,role),
	base=coalesce(?,base),
	write=coalesce(?,write)
WHERE id=?
RETURNING id, username, role, base, write;
`

func (us *UserService) UpdateUser(param UserUpdateParam) (*User, error) {

	if param.Password != nil {
		b := []byte(*param.Password)
		hash, err := bcrypt.GenerateFromPassword(b, config.HashCost)
		if err != nil {
			return nil, err
		}

		*param.Password = string(hash)
	}

	row := us.db.QueryRow(
		updateStmt,
		param.Username,
		param.Password,
		param.Role,
		param.Base,
		param.Write,
		param.ID,
	)

	u := User{}

	err := row.Scan(&u.Id, &u.Username, &u.Role, &u.Base, &u.Write)
	if err != nil {
		return nil, err
	}

	return &u, nil
}

func (us *UserService) DeleteUser(id int) error {
	stmt := `DELETE FROM user WHERE id=?;`

	_, err := us.db.Exec(stmt, id)
	return err
}
