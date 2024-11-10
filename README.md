### README - Gudang Management System (Penerimaan dan Pengeluaran Barang)

#### Deskripsi Aplikasi

Aplikasi ini merupakan sistem manajemen gudang yang memungkinkan pengguna untuk mencatat barang masuk dan barang keluar dari Gudang A. Aplikasi ini dibangun dengan menggunakan **React** untuk frontend dan **Go** untuk backend (API), serta **PostgreSQL** sebagai database.

**Fitur-fitur utama:**

1. **Penerimaan Barang**: Mencatat penerimaan barang dari Supplier ke Gudang A.
2. **Pengeluaran Barang**: Mencatat pengeluaran barang dari Gudang A.
3. **Laporan Stok**: Menampilkan stok barang yang ada di Gudang A, dengan rincian jumlah dus dan pcs.

### Teknologi yang Digunakan

-   **Frontend**: React
-   **Backend**: Go (Gin Framework)
-   **Database**: PostgreSQL

### Struktur Direktori

```
/gudang-app
|-- /controllers       # Controller untuk menangani request
|-- /models            # Struktur data dan model untuk database
|-- /routes            # Routing API
|-- /database          # Koneksi dan pengaturan database
|-- /public            # File statis untuk frontend (React)
|-- /src               # Sumber daya frontend (React)
```

### Instalasi

1. **Backend (Go)**

    - Pastikan **Go** sudah terinstal di mesin Anda. Jika belum, Anda dapat mengunduh dan menginstalnya dari [situs resmi Go](https://go.dev/dl/).
    - Clone repository ini:
        ```bash
        git clone https://github.com/putram11/testamb.git
        cd gudang-app
        ```
    - Install dependencies:
        ```bash
        go mod tidy
        ```
    - Jalankan aplikasi:
        ```bash
        go run main.go
        ```
    - Server API backend akan berjalan pada `http://localhost:8080`.

2. **Frontend (React)**

    - Pastikan **Node.js** sudah terinstal di mesin Anda. Jika belum, Anda dapat mengunduhnya dari [situs resmi Node.js](https://nodejs.org/).
    - Pindah ke direktori frontend:
        ```bash
        cd public
        ```
    - Install dependencies:
        ```bash
        npm install
        ```
    - Jalankan aplikasi:
        ```bash
        npm start
        ```
    - Aplikasi frontend akan berjalan pada `http://localhost:3000`.

### API Endpoints

1. **POST /ingoing**  
   Endpoint untuk mencatat penerimaan barang dari supplier ke Gudang A.

    - Request body:
        ```json
        {
            "trx_in_no": "TRX001",
            "trx_in_date": "2024-11-01",
            "whs_idf": 1,
            "trx_in_supp_idf": 1,
            "trx_in_notes": "Penerimaan barang dari supplier A",
            "details": [
                {
                    "trx_in_d_product_idf": 1,
                    "trx_in_d_qty_dus": 5,
                    "trx_in_d_qty_pcs": 50
                }
            ]
        }
        ```
    - Response:
        ```json
        {
            "data": {
                "trx_in_no": "TRX001",
                "trx_in_date": "2024-11-01",
                "whs_idf": 1,
                "trx_in_supp_idf": 1,
                "trx_in_notes": "Penerimaan barang dari supplier A",
                "details": [
                    {
                        "trx_in_d_product_idf": 1,
                        "trx_in_d_qty_dus": 5,
                        "trx_in_d_qty_pcs": 50
                    }
                ]
            }
        }
        ```

2. **POST /outgoing**  
   Endpoint untuk mencatat pengeluaran barang dari Gudang A.

    - Request body:
        ```json
        {
            "trx_out_no": "TRX002",
            "trx_out_date": "2024-11-05",
            "whs_idf": 1,
            "trx_out_supp_idf": 1,
            "trx_out_notes": "Pengeluaran barang untuk customer A",
            "details": [
                {
                    "trx_out_d_product_idf": 1,
                    "trx_out_d_qty_dus": 2,
                    "trx_out_d_qty_pcs": 20
                }
            ]
        }
        ```
    - Response:
        ```json
        {
            "data": {
                "trx_out_no": "TRX002",
                "trx_out_date": "2024-11-05",
                "whs_idf": 1,
                "trx_out_supp_idf": 1,
                "trx_out_notes": "Pengeluaran barang untuk customer A",
                "details": [
                    {
                        "trx_out_d_product_idf": 1,
                        "trx_out_d_qty_dus": 2,
                        "trx_out_d_qty_pcs": 20
                    }
                ]
            }
        }
        ```

3. **GET /stock**  
   Endpoint untuk mendapatkan laporan stok barang di Gudang A, dengan jumlah dus dan pcs.
    - Response:
        ```json
        {
            "data": [
                {
                    "whs_name": "Gudang A",
                    "product_name": "Produk A",
                    "qty_dus": 3,
                    "qty_pcs": 30
                },
                {
                    "whs_name": "Gudang A",
                    "product_name": "Produk B",
                    "qty_dus": 2,
                    "qty_pcs": 20
                }
            ]
        }
        ```

### Query create Database (PostgreSQL)

```sql
-- Table Master Supplier
CREATE TABLE suppliers (
    supplierpk SERIAL PRIMARY KEY,
    suppliername VARCHAR(255) NOT NULL
);

-- Table Master Customer
CREATE TABLE customers (
    customerpk SERIAL PRIMARY KEY,
    customername VARCHAR(255) NOT NULL
);

-- Table Master Product
CREATE TABLE products (
    productpk SERIAL PRIMARY KEY,
    productname VARCHAR(255) NOT NULL
);

-- Table Master Warehouse
CREATE TABLE warehouses (
    whspk SERIAL PRIMARY KEY,
    whsname VARCHAR(255) NOT NULL
);

-- Tabel Penerimaan Barang Gabungan dengan Detail dalam JSONB
CREATE TABLE penerimaan_barang (
    trx_in_pk SERIAL PRIMARY KEY,
    trx_in_no VARCHAR(255) NOT NULL,
    whs_idf INT NOT NULL REFERENCES warehouses(whspk),
    trx_in_supp_idf INT NOT NULL REFERENCES suppliers(supplierpk),
    trx_in_notes TEXT,
    trx_in_details JSONB NOT NULL
);

-- Tabel Pengeluaran Barang Gabungan dengan Detail dalam JSONB
CREATE TABLE pengeluaran_barang (
    trx_out_pk SERIAL PRIMARY KEY,
    trx_out_no VARCHAR(255) NOT NULL,
    whs_idf INT NOT NULL REFERENCES warehouses(whspk),
    trx_out_date DATE NOT NULL,
    trx_out_supp_idf INT NOT NULL REFERENCES suppliers(supplierpk),
    trx_out_notes TEXT,
    trx_out_details JSONB NOT NULL
);

```

### Cara Menggunakan Aplikasi

1. **Penerimaan Barang**:

    - Masukkan data penerimaan barang dengan memilih supplier dan mencatat jumlah barang yang diterima dalam bentuk dus dan pcs.
    - Data ini akan otomatis menambah stok barang di Gudang A.

2. **Pengeluaran Barang**:

    - Masukkan data pengeluaran barang dengan memilih customer dan mencatat jumlah barang yang dikeluarkan dalam bentuk dus dan pcs.
    - Data ini akan otomatis mengurangi stok barang di Gudang A.

3. **Laporan Stok**:
    - Akses endpoint `/stock` untuk mendapatkan laporan stok barang yang mencakup nama produk, jumlah dus, dan jumlah pcs yang tersedia di Gudang A.

### Kesimpulan

Dengan aplikasi ini, Anda dapat mencatat penerimaan dan pengeluaran barang dengan mudah dan memantau stok barang yang ada di gudang. Pastikan Anda sudah mengonfigurasi database dan API dengan benar untuk memastikan aplikasi berjalan lancar.
