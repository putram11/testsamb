import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewStock = () => {
    const [stockItems, setStockItems] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/stock")
            .then((response) => {
                setStockItems(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching stock:", error);
            });
    }, []);

    return (
        <div className="container">
            <h2 className="my-4">View Stock</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Warehouse</th>
                        <th>Product</th>
                        <th>Qty Dus</th>
                        <th>Qty Pcs</th>
                    </tr>
                </thead>
                <tbody>
                    {stockItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.whsName}</td>
                            <td>{item.productName}</td>
                            <td>{item.qtyDus}</td>
                            <td>{item.qtyPcs}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewStock;
