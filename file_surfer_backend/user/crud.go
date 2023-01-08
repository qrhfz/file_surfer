package user

func (us *UserServiceT) CreateNewUser(name, password, role string) (int, error) {
	stmt := `INSERT into user(username, password, role) values(?,?,?);`
	_, err := us.db.Exec(stmt, name, password, role)
	if err != nil {
		return 0, err
	}

	var id int
	us.db.QueryRow(`SELECT last_insert_rowid();`).Scan(&id)

	return id, nil
}

func (us *UserServiceT) ReadUser(id int) {
}
