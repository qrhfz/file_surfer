package controllers

import (
	"file_surfer/api"
	"file_surfer/user"
)

type UserController struct {
	userService *user.UserService
}

func NewUserController(us *user.UserService) *UserController {
	return &UserController{userService: us}
}

func (c *UserController) GetUsers() ([]api.User, error) {
	dbUsers, err := c.userService.GetUsers()
	if err != nil {
		return nil, err
	}

	users := make([]api.User, len(dbUsers))

	for i, v := range dbUsers {
		u := api.User{
			Id:       v.Id,
			Role:     api.Role(v.Role),
			Username: v.Username,
		}
		users[i] = u
	}

	return users, nil
}
