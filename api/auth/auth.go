package auth

import (
	"encoding/json"
	"file_surfer/api/session"
	"file_surfer/api/user"

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

func (a *AuthService) Logout(token string) error {
	return a.sessionStore.RemoveSession(token)
}
