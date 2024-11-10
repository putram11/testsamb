package models

type Supplier struct {
	SupplierPK   int    `gorm:"primary_key;autoIncrement"`
	SupplierName string `gorm:"type:varchar(100);not null"`
}

type Customer struct {
	CustomerPK   int    `gorm:"primary_key;autoIncrement"`
	CustomerName string `gorm:"type:varchar(100);not null"`
}

type Product struct {
	ProductPK   int    `gorm:"primary_key;autoIncrement"`
	ProductName string `gorm:"type:varchar(100);not null"`
	QtyDus      int    `gorm:"default:0"`
	QtyPcs      int    `gorm:"default:0"`
}

type Warehouse struct {
	WhsPK   int    `gorm:"primary_key;autoIncrement"`
	WhsName string `gorm:"type:varchar(100);not null"`
}

type PenerimaanBarangHeader struct {
	TrxInPK      int                      `gorm:"primary_key;autoIncrement"`
	TrxInNo      string                   `gorm:"type:varchar(100);not null"`
	WhsIdf       int                      `gorm:"not null"`
	TrxInDate    string                   `gorm:"type:date;not null"`
	TrxInSuppIdf int                      `gorm:"not null"`
	TrxInNotes   string                   `gorm:"type:varchar(255)"`
	Details      []PenerimaanBarangDetail `gorm:"foreignKey:TrxInIDF;references:TrxInPK"`
}

type PenerimaanBarangDetail struct {
	TrxInDPK         int `gorm:"primary_key;autoIncrement"`
	TrxInIDF         int `gorm:"not null"`
	TrxInDProductIdf int `gorm:"not null"`
	TrxInDQtyDus     int `gorm:"not null"`
	TrxInDQtyPcs     int `gorm:"not null"`
}

type PengeluaranBarangHeader struct {
	TrxOutPK      int                       `gorm:"primary_key;autoIncrement"`
	TrxOutNo      string                    `gorm:"type:varchar(100);not null"`
	WhsIdf        int                       `gorm:"not null"`
	TrxOutDate    string                    `gorm:"type:date;not null"`
	TrxOutSuppIdf int                       `gorm:"not null"`
	TrxOutNotes   string                    `gorm:"type:varchar(255)"`
	Details       []PengeluaranBarangDetail `gorm:"foreignKey:TrxOutIDF;references:TrxOutPK"`
}

type PengeluaranBarangDetail struct {
	TrxOutDPK         int `gorm:"primary_key;autoIncrement"`
	TrxOutIDF         int `gorm:"not null"`
	TrxOutDProductIdf int `gorm:"not null"`
	TrxOutDQtyDus     int `gorm:"not null"`
	TrxOutDQtyPcs     int `gorm:"not null"`
}
