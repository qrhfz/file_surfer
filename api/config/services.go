package config

import (
	"file_surfer/api/auth"
	"file_surfer/api/db"
	"file_surfer/api/session"
	"file_surfer/api/user"
)

var AppUserService = user.NewUserService(db.DB)
var AooSessionStore = session.NewSessionStore(db.DB)
var AppAuthService = auth.NewAuthService(AppUserService, AooSessionStore)
