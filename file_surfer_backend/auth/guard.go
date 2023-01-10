package auth

func (a *AuthService) AllowLoggedInOnly(token string) bool {
	_, err := a.sessionStore.GetSession(token)

	return err == nil
}
