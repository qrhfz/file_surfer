package controllers

import (
	"file_surfer/api"
	"file_surfer/user"

	"github.com/labstack/echo/v4"
)

type UserController struct {
	userService *user.UserService
}

func NewUserController(us *user.UserService) *UserController {
	return &UserController{userService: us}
}

func (c *UserController) GetUsers(ctx echo.Context) error {
	dbUsers, err := c.userService.GetUsers()
	if err != nil {
		return echo.NewHTTPError(500, err.Error())
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

	if err != nil {
		return echo.NewHTTPError(500, err.Error())
	}

	return ctx.JSON(200, users)
}

func (c *UserController) GetUserById() {}
