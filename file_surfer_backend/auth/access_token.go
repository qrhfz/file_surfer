package auth

func (a *AuthService) GetAccessToken(authToken string) (string, error) {
	_, err := a.sessionStore.GetSession(authToken)
	if err != nil {
		return "", err
	}
	return a.sessionStore.SetSessionWithTTL(authToken, 5*60*1000)
}
