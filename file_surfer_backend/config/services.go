package config

import (
	"file_surfer_backend/auth"
	"file_surfer_backend/db"
	"file_surfer_backend/session"
	"file_surfer_backend/user"
)

var AppUserService = user.NewUserService(db.DB)
var AooSessionStore = session.NewSessionStore(db.DB)
var AppAuthService = auth.NewAuthService(AppUserService, AooSessionStore)
