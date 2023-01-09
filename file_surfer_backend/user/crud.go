package user

func (us *UserService) CreateNewUser(name, password, role string) (int, error) {
	var id int
	stmt := `INSERT INTO user(username, password, role) values(?,?,?) RETURNING id;`
	err := us.db.QueryRow(stmt, name, password, role).Scan(&id)
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

func (us *UserService) GetPassword(id int) (string, error) {
	row := us.db.QueryRow(`SELECT password FROM user WHERE id=?;`, id)

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

	row := us.db.QueryRow(stmt, param.Username, param.Password, param.Role, param.ID)
	u := User{}

	if err := row.Scan(&u.Id, &u.Username, &u.Role); err != nil {
		return nil, err
	}

	return &u, nil
}
