package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/username/gudang-app/database"
	"github.com/username/gudang-app/models"
)

func AddPenerimaanBarang(c *gin.Context) {
	var header models.PenerimaanBarangHeader
	if err := c.ShouldBindJSON(&header); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Menyimpan header penerimaan barang
	if err := database.DB.Create(&header).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Update stok barang berdasarkan detail penerimaan
	for _, detail := range header.Details {
		var product models.Product
		if err := database.DB.First(&product, detail.TrxInDProductIdf).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
			return
		}
		productQtyDus := detail.TrxInDQtyDus
		productQtyPcs := detail.TrxInDQtyPcs
		productQtyDus += productQtyDus
		productQtyPcs += productQtyPcs

		// Update stok produk
		if err := database.DB.Model(&product).Updates(models.Product{
			QtyDus: productQtyDus,
			QtyPcs: productQtyPcs,
		}).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}
	c.JSON(http.StatusOK, gin.H{"data": header})
}

func AddPengeluaranBarang(c *gin.Context) {
	var header models.PengeluaranBarangHeader
	if err := c.ShouldBindJSON(&header); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Menyimpan header pengeluaran barang
	if err := database.DB.Create(&header).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Update stok barang berdasarkan detail pengeluaran
	for _, detail := range header.Details {
		var product models.Product
		if err := database.DB.First(&product, detail.TrxOutDProductIdf).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
			return
		}

		// Mengurangi jumlah stok (dus dan pcs) pada produk
		productQtyDus := detail.TrxOutDQtyDus
		productQtyPcs := detail.TrxOutDQtyPcs
		productQtyDus -= productQtyDus
		productQtyPcs -= productQtyPcs

		// Update stok produk
		if err := database.DB.Model(&product).Updates(models.Product{
			QtyDus: productQtyDus,
			QtyPcs: productQtyPcs,
		}).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"data": header})
}

func GetStock(c *gin.Context) {
	type StockItem struct {
		WhsName     string
		ProductName string
		QtyDus      int
		QtyPcs      int
	}

	var stockItems []StockItem
	query := `
		SELECT w.whs_name, p.product_name,
			COALESCE(SUM(pd.trx_in_d_qty_dus), 0) - COALESCE(SUM(gd.trx_out_d_qty_dus), 0) AS qty_dus,
			COALESCE(SUM(pd.trx_in_d_qty_pcs), 0) - COALESCE(SUM(gd.trx_out_d_qty_pcs), 0) AS qty_pcs
		FROM warehouses w
		JOIN products p ON p.productpk = pd.trx_in_d_product_idf
		LEFT JOIN penerimaan_barang_details pd ON pd.trx_in_idf = w.whspk
		LEFT JOIN pengeluaran_barang_details gd ON gd.trx_out_idf = w.whspk
		GROUP BY w.whs_name, p.product_name;
	`
	database.DB.Raw(query).Scan(&stockItems)
	c.JSON(http.StatusOK, gin.H{"data": stockItems})
}
