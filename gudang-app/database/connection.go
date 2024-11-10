package database

import (
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
	"github.com/username/gudang-app/models"
)

var DB *gorm.DB

func InitDB() {
	var err error
	DB, err = gorm.Open("postgres", "host=localhost user=gudang_user dbname=gudang_db sslmode=disable password=password")
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}
	DB.AutoMigrate(&models.Supplier{}, &models.Customer{}, &models.Product{}, &models.Warehouse{}, &models.PenerimaanBarangHeader{}, &models.PengeluaranBarangHeader{})
}
