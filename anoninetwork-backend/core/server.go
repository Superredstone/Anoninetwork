package core

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func CreateServer() *echo.Echo {
	server := echo.New()

	server.Use(middleware.CORS())

	server.POST("/createpost", CreateNewPost)
	server.GET("/getposts", ReadPosts)

	return server
}
