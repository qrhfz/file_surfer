package auth

func (a *AuthService) AllowLoggedInOnly(token string) bool {
	err := a.sessionStore.GetSession(token)

	return err == nil
}
