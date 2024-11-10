import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const AddPenerimaanBarang = () => {
    const [trxInNo, setTrxInNo] = useState("");
    const [whsIdf, setWhsIdf] = useState("");
    const [trxInDate, setTrxInDate] = useState("");
    const [trxInSuppIdf, setTrxInSuppIdf] = useState("");
    const [trxInNotes, setTrxInNotes] = useState("");
    const [trxInDetails, setTrxInDetails] = useState([
        { productId: "", qtyDus: 0, qtyPcs: 0 },
    ]);

    const handleDetailChange = (index, field, value) => {
        const updatedDetails = [...trxInDetails];
        updatedDetails[index][field] = value;
        setTrxInDetails(updatedDetails);
    };

    const addDetail = () => {
        setTrxInDetails([
            ...trxInDetails,
            { productId: "", qtyDus: 0, qtyPcs: 0 },
        ]);
    };

    const removeDetail = (index) => {
        const updatedDetails = trxInDetails.filter((_, i) => i !== index);
        setTrxInDetails(updatedDetails);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const header = {
            trxInNo,
            whsIdf,
            trxInDate,
            trxInSuppIdf,
            trxInNotes,
            trxInDetails,
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/ingoing",
                header
            );
            alert("Transaction added successfully");
            console.log(response.data);
        } catch (error) {
            console.error("Error adding incoming transaction:", error);
            alert("Failed to add transaction");
        }
    };

    return (
        <div className="container-fluid full-page-container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="form-container">
                        <h2 className="my-4">Add Incoming Goods</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">
                                    Transaction No:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={trxInNo}
                                    onChange={(e) => setTrxInNo(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Warehouse ID:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={whsIdf}
                                    onChange={(e) => setWhsIdf(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Transaction Date:
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={trxInDate}
                                    onChange={(e) =>
                                        setTrxInDate(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Supplier ID:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={trxInSuppIdf}
                                    onChange={(e) =>
                                        setTrxInSuppIdf(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Notes:</label>
                                <textarea
                                    className="form-control"
                                    value={trxInNotes}
                                    onChange={(e) =>
                                        setTrxInNotes(e.target.value)
                                    }
                                />
                            </div>

                            <h3>Details</h3>
                            {trxInDetails.map((detail, index) => (
                                <div key={index} className="border p-3 mb-3">
                                    <div className="mb-2">
                                        <label className="form-label">
                                            Product ID:
                                        </label>
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
                                        <label className="form-label">
                                            Qty Dus:
                                        </label>
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
                                        <label className="form-label">
                                            Qty Pcs:
                                        </label>
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

                            <button
                                type="submit"
                                className="btn btn-success mt-4"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPenerimaanBarang;
