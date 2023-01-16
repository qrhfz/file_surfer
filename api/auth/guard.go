package auth

import (
	"encoding/json"
	"file_surfer/user"
)

func (a *AuthService) IsLoggedIn(token string) bool {
	_, err := a.sessionStore.GetSession(token)

	return err == nil
}

func (a *AuthService) IsAdmin(token string) bool {
	sess, err := a.sessionStore.GetSession(token)

	if err != nil {
		return false
	}

	var u user.User

	json.Unmarshal([]byte(sess), &u)

	return u.Role == "admin"
}
