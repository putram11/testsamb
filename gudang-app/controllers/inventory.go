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

	headerJSON := models.PenerimaanBarangHeader{
		TrxInNo:      header.TrxInNo,
		WhsIdf:       header.WhsIdf,
		TrxInDate:    header.TrxInDate,
		TrxInSuppIdf: header.TrxInSuppIdf,
		TrxInNotes:   header.TrxInNotes,
		TrxInDetails: header.TrxInDetails,
	}

	if err := database.DB.Create(&headerJSON).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Update stok barang berdasarkan detail penerimaan
	for _, detail := range header.TrxInDetails {
		productID := detail.TrxInDProductIdf
		qtyDus := detail.TrxInDQtyDus
		qtyPcs := detail.TrxInDQtyPcs

		var product models.Product
		if err := database.DB.First(&product, productID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
			return
		}

		// Update stok produk
		product.QtyDus += qtyDus
		product.QtyPcs += qtyPcs
		if err := database.DB.Save(&product).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"data": headerJSON})
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
	for _, detail := range header.TrxOutDetails {
		var product models.Product
		if err := database.DB.First(&product, detail.TrxOutDProductIdf).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
			return
		}

		// Mengurangi jumlah stok (dus dan pcs) pada produk
		productQtyDus := detail.TrxOutDQtyDus
		productQtyPcs := detail.TrxOutDQtyPcs
		product.QtyDus -= productQtyDus
		product.QtyPcs -= productQtyPcs

		// Update stok produk
		if err := database.DB.Save(&product).Error; err != nil {
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
		SELECT w.whsname AS whs_name, p.productname AS product_name,
			COALESCE(SUM(pd.trx_in_d_qty_dus), 0) - COALESCE(SUM(gd.trx_out_d_qty_dus), 0) AS qty_dus,
			COALESCE(SUM(pd.trx_in_d_qty_pcs), 0) - COALESCE(SUM(gd.trx_out_d_qty_pcs), 0) AS qty_pcs
		FROM warehouses w
		JOIN products p ON p.productpk = pd.trx_in_d_product_idf
		LEFT JOIN penerimaan_barang pb ON pb.whs_idf = w.whspk
		LEFT JOIN LATERAL jsonb_array_elements(pb.trx_in_details) AS pd ON (pd->>'product_id' = p.productpk::text)
		LEFT JOIN pengeluaran_barang pg ON pg.whs_idf = w.whspk
		LEFT JOIN LATERAL jsonb_array_elements(pg.trx_out_details) AS gd ON (gd->>'product_id' = p.productpk::text)
		GROUP BY w.whsname, p.productname;
	`

	database.DB.Raw(query).Scan(&stockItems)

	c.JSON(http.StatusOK, gin.H{"data": stockItems})
}
