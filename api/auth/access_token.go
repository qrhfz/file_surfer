package auth

func (a *AuthService) GetAccessToken(authToken, path string) (string, error) {
	_, err := a.sessionStore.GetSession(authToken)
	if err != nil {
		return "", err
	}
	return a.sessionStore.SetSessionWithTTL(path, 5*60*1000)
}

func (a *AuthService) VerifyAccessToken(accessToken, path string) bool {
	storedPath, err := a.sessionStore.GetSession(accessToken)

	return err == nil && storedPath == path
}
