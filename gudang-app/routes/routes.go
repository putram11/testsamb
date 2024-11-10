package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/username/gudang-app/controllers"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.POST("/ingoing", controllers.AddPenerimaanBarang)
	router.POST("/outgoing", controllers.AddPengeluaranBarang)
	router.GET("/stock", controllers.GetStock)

	return router
}
