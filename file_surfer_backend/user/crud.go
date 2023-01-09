package user

func (us *UserService) CreateNewUser(name, password, role string) (int, error) {
	stmt := `INSERT into user(username, password, role) values(?,?,?);`
	_, err := us.db.Exec(stmt, name, password, role)
	if err != nil {
		return 0, err
	}

	var id int
	us.db.QueryRow(`SELECT last_insert_rowid();`).Scan(&id)

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

func (us *UserService) GetPassword(id int) (string, error) {
	row := us.db.QueryRow(`SELECT password FROM user WHERE id=?;`, id)

	password := ""
	err := row.Scan(&password)
	if err != nil {
		return "", err
	}
	return password, nil
}
