import React, { useState } from "react";
import axios from "axios";

const AddPengeluaranBarang = () => {
    const [trxOutNo, setTrxOutNo] = useState("");
    const [whsIdf, setWhsIdf] = useState("");
    const [trxOutDate, setTrxOutDate] = useState("");
    const [trxOutSuppIdf, setTrxOutSuppIdf] = useState("");
    const [trxOutNotes, setTrxOutNotes] = useState("");
    const [trxOutDetails, setTrxOutDetails] = useState([
        { productId: "", qtyDus: 0, qtyPcs: 0 },
    ]);

    const handleDetailChange = (index, field, value) => {
        const updatedDetails = [...trxOutDetails];
        updatedDetails[index][field] = value;
        setTrxOutDetails(updatedDetails);
    };

    const addDetail = () => {
        setTrxOutDetails([
            ...trxOutDetails,
            { productId: "", qtyDus: 0, qtyPcs: 0 },
        ]);
    };

    const removeDetail = (index) => {
        const updatedDetails = trxOutDetails.filter((_, i) => i !== index);
        setTrxOutDetails(updatedDetails);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const header = {
            trxOutNo,
            whsIdf,
            trxOutDate,
            trxOutSuppIdf,
            trxOutNotes,
            trxOutDetails,
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/outgoing",
                header
            );
            alert("Transaction added successfully");
            console.log(response.data);
        } catch (error) {
            console.error("Error adding outgoing transaction:", error);
            alert("Failed to add transaction");
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">Add Outgoing Goods</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Transaction No:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={trxOutNo}
                        onChange={(e) => setTrxOutNo(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Warehouse ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={whsIdf}
                        onChange={(e) => setWhsIdf(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Transaction Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={trxOutDate}
                        onChange={(e) => setTrxOutDate(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Supplier ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={trxOutSuppIdf}
                        onChange={(e) => setTrxOutSuppIdf(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Notes:</label>
                    <textarea
                        className="form-control"
                        value={trxOutNotes}
                        onChange={(e) => setTrxOutNotes(e.target.value)}
                    />
                </div>

                <h3>Details</h3>
                {trxOutDetails.map((detail, index) => (
                    <div key={index} className="border p-3 mb-3">
                        <div className="mb-2">
                            <label className="form-label">Product ID:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={detail.productId}
                                onChange={(e) =>
                                    handleDetailChange(
                                        index,
                                        "productId",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Qty Dus:</label>
                            <input
                                type="number"
                                className="form-control"
                                value={detail.qtyDus}
                                onChange={(e) =>
                                    handleDetailChange(
                                        index,
                                        "qtyDus",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Qty Pcs:</label>
                            <input
                                type="number"
                                className="form-control"
                                value={detail.qtyPcs}
                                onChange={(e) =>
                                    handleDetailChange(
                                        index,
                                        "qtyPcs",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => removeDetail(index)}
                        >
                            Remove Detail
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addDetail}
                >
                    Add Detail
                </button>

                <button type="submit" className="btn btn-success mt-4">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddPengeluaranBarang;
