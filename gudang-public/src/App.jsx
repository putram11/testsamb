import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import AddPenerimaanBarang from "./components/AddPenerimaanBarang";
import AddPengeluaranBarang from "./components/AddPengeluaranBarang";
import ViewStock from "./components/ViewStock";

const Layout = ({ children, backgroundImage }) => {
    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                minHeight: "100vh",
                backgroundPosition: "center",
            }}
        >
            <Navbar />
            <div
                className="container mt-5"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "10px",
                    padding: "20px",
                }}
            >
                {children}
            </div>
        </div>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout backgroundImage="https://i0.wp.com/isellerdotblog.wpcomstaging.com/wp-content/uploads/2024/02/warehouse.jpg?fit=1400%2C788&ssl=1">
                            <h1 className="text-center text-white display-4 mt-5">
                                Welcome to Gudang App
                            </h1>
                            <p className="text-center text-white lead">
                                Select an option from the menu to get started.
                            </p>
                        </Layout>
                    }
                />
                <Route
                    path="/ingoing"
                    element={
                        <Layout backgroundImage="https://kfmap.asia/storage/uploads/shares/Monicha-Article/thumbnail/19%20Nov/pentingnya%20gudang.jpg">
                            <AddPenerimaanBarang />
                        </Layout>
                    }
                />
                <Route
                    path="/outgoing"
                    element={
                        <Layout backgroundImage="https://i0.wp.com/isellerdotblog.wpcomstaging.com/wp-content/uploads/2024/02/warehouse.jpg?fit=1400%2C788&ssl=1">
                            <AddPengeluaranBarang />
                        </Layout>
                    }
                />
                <Route
                    path="/stock"
                    element={
                        <Layout backgroundImage="https://kfmap.asia/storage/uploads/shares/Monicha-Article/thumbnail/19%20Nov/pentingnya%20gudang.jpg">
                            <ViewStock />
                        </Layout>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
