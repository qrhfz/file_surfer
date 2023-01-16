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

func (uct *UserController) CreateUser(ctx echo.Context) error {
	var body api.NewUser
	ctx.Bind(&body)

	name, pass, role := body.Username, body.Password, string(body.Role)

	id, err := uct.userService.CreateNewUser(name, pass, role)
	if err != nil {
		return echo.NewHTTPError(500, err.Error())
	}

	u, err := uct.userService.GetUser(id)
	if err != nil {
		return echo.NewHTTPError(500, err.Error())
	}

	return ctx.JSON(201, api.User{
		Id:       u.Id,
		Role:     api.Role(u.Role),
		Username: u.Username,
	})
}

func (uct *UserController) GetUserById(ctx echo.Context) error {
	id := ctx.Get("id").(int)

	u, err := uct.userService.GetUser(id)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}

	resp := api.User{
		Id:       u.Id,
		Role:     api.Role(u.Role),
		Username: u.Username,
	}

	return ctx.JSON(200, resp)
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
	}

	u, err := uct.userService.UpdateUser(p)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}

	resp := api.User{
		Id:       u.Id,
		Role:     api.Role(u.Role),
		Username: u.Username,
	}

	return ctx.JSON(200, resp)
}

func (uct *UserController) DeleteUser(ctx echo.Context) error {
	id := ctx.Get("id").(int)
	err := uct.userService.DeleteUser(id)

	if err != nil {
		return echo.NewHTTPError(500, err.Error())
	}

	return ctx.JSON(204, nil)
}
