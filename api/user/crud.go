package user

import (
	"file_surfer/config"

	"golang.org/x/crypto/bcrypt"
)

func (us *UserService) CreateNewUser(name, password, role string) (int, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), config.HashCost)
	if err != nil {
		return 0, err
	}

	var id int
	stmt := `INSERT INTO 
						user(username, password, role) 
						values(?,?,?) 
						RETURNING id;`

	err = us.db.QueryRow(stmt, name, string(hash), role).Scan(&id)
	if err != nil {
		return 0, err
	}
	return id, nil
}

func (us *UserService) GetUsers() ([]User, error) {
	rows, err := us.db.Query(`SELECT id, username, role FROM user;`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users := make([]User, 0)

	for rows.Next() {
		u := User{}
		err := rows.Scan(&u.Id, &u.Username, &u.Role)
		if err != nil {
			return nil, err
		}

		users = append(users, u)
	}

	return users, nil
}

func (us *UserService) GetUser(id int) (*User, error) {
	row := us.db.QueryRow(`SELECT id, username, role FROM user WHERE id=?;`, id)

	u := User{}

	err := row.Scan(&u.Id, &u.Username, &u.Role)
	if err != nil {
		return nil, err
	}

	return &u, nil
}

func (us *UserService) GetUserByUsername(username string) (*User, error) {
	row := us.db.QueryRow(`SELECT id, username, role FROM user WHERE username=?;`, username)

	u := User{}

	err := row.Scan(&u.Id, &u.Username, &u.Role)
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
}

func (us *UserService) UpdateUser(param UserUpdateParam) (*User, error) {
	stmt := `
		UPDATE user 
		SET 
			username=coalesce(?,username),
			password=coalesce(?,password),
			role=coalesce(?,role)
		WHERE id=?
		RETURNING id, username, role;
	`

	name, pass, role, id := param.Username, param.Password, param.Role, param.ID

	if pass != nil {
		hash, err := bcrypt.GenerateFromPassword([]byte(*pass), config.HashCost)
		if err != nil {
			return nil, err
		}

		*pass = string(hash)
	}

	row := us.db.QueryRow(stmt, name, pass, role, id)
	u := User{}

	if err := row.Scan(&u.Id, &u.Username, &u.Role); err != nil {
		return nil, err
	}

	return &u, nil
}

func (us *UserService) DeleteUser(id int) error {
	stmt := `DELETE FROM user WHERE id=?;`

	_, err := us.db.Exec(stmt, id)
	if err != nil {
		return err
	}

	return nil
}
