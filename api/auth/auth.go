package auth

import (
	"encoding/json"
	"file_surfer/session"
	"file_surfer/user"

	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	userService  *user.UserService
	sessionStore *session.SessionStore
}

func NewAuthService(us *user.UserService, ss *session.SessionStore) *AuthService {
	return &AuthService{
		userService:  us,
		sessionStore: ss,
	}
}

func (a *AuthService) Login(username, plainPassword string) (string, error) {
	hashedPassword, err := a.userService.GetPasswordByUsername(username)
	if err != nil {
		return "", err
	}

	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plainPassword))
	if err != nil {
		return "", err
	}

	u, err := a.userService.GetUserByUsername(username)
	if err != nil {
		return "", err
	}

	content, err := json.Marshal(u)
	if err != nil {
		return "", err
	}

	token, err := a.sessionStore.SetSession(string(content))
	if err != nil {
		return "", err
	}

	return token, nil
}

func (a *AuthService) GetUserFromToken(token string) (*user.User, error) {
	sess, err := a.sessionStore.GetSession(token)
	if err != nil {
		return nil, err
	}

	u := user.User{}
	err = json.Unmarshal([]byte(sess), &u)
	if err != nil {
		return nil, err
	}

	return &u, nil
}

func (a *AuthService) Logout(token string) error {
	return a.sessionStore.RemoveSession(token)
}
