package controllers

import (
	"file_surfer/api"
	"file_surfer/user"
	"net/http"

	"github.com/labstack/echo/v4"
)

type UserController struct {
	userService *user.UserService
}

func NewUserController(us *user.UserService) *UserController {
	return &UserController{userService: us}
}

func (c *UserController) GetUsers(ctx echo.Context) error {
	users, err := c.userService.GetUsers()
	if err != nil {
		return echo.NewHTTPError(500, err.Error())
	}

	if err != nil {
		return echo.NewHTTPError(500, err.Error())
	}

	return ctx.JSON(200, users)
}

func (uct *UserController) CreateUser(ctx echo.Context) error {
	var body api.NewUser
	ctx.Bind(&body)

	u, err := uct.userService.CreateNewUser(body)
	if err != nil {
		return echo.NewHTTPError(500, err.Error())
	}

	return ctx.JSON(201, u)
}

func (uct *UserController) GetUserById(ctx echo.Context) error {
	id := ctx.Get("id").(int)

	u, err := uct.userService.GetUser(id)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}

	return ctx.JSON(200, u)
}

func (uct *UserController) UpdateUser(ctx echo.Context) error {
	id := ctx.Get("id").(int)

	var body api.UpdateUser
	err := ctx.Bind(&body)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	p := user.UserUpdateParam{
		ID:       id,
		Username: body.Username,
		Role:     (*string)(body.Role),
		Password: body.Password,
		Base:     body.Base,
		Write:    body.Write,
	}

	user, err := uct.userService.UpdateUser(p)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}

	return ctx.JSON(200, user)
}

func (uct *UserController) DeleteUser(ctx echo.Context) error {
	id := ctx.Get("id").(int)
	err := uct.userService.DeleteUser(id)

	if err != nil {
		return echo.NewHTTPError(500, err.Error())
	}

	return ctx.JSON(204, nil)
}
