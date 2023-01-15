package config

import (
	"github.com/qrhfz/file_surfer/api/auth"
	"github.com/qrhfz/file_surfer/api/db"
	"github.com/qrhfz/file_surfer/api/session"
	"github.com/qrhfz/file_surfer/api/user"
)

var AppUserService = user.NewUserService(db.DB)
var AooSessionStore = session.NewSessionStore(db.DB)
var AppAuthService = auth.NewAuthService(AppUserService, AooSessionStore)
