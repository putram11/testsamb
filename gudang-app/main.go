package main

import (
	"github.com/gin-contrib/cors"
	"github.com/username/gudang-app/database"
	"github.com/username/gudang-app/routes"
)

func main() {
	database.InitDB()

	r := routes.SetupRouter()

	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.Run(":8080")
}
