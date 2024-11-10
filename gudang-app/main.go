package main

import (
	"github.com/username/gudang-app/database"
	"github.com/username/gudang-app/routes"
)

func main() {
	database.InitDB()
	r := routes.SetupRouter()
	r.Run()
}
