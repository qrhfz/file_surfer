package config

import (
	"file_surfer/auth"
	"file_surfer/db"
	"file_surfer/session"
	"file_surfer/user"
)

var AppUserService = user.NewUserService(db.DB)
var AooSessionStore = session.NewSessionStore(db.DB)
var AppAuthService = auth.NewAuthService(AppUserService, AooSessionStore)
