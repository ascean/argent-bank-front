import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Error from "./pages/error/Error";
import Dashboard from "./pages/dashboard/Dashboard";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Router = () => {
    return (
        <BrowserRouter>
        <ToastContainer/>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={ <Login /> } />
                <Route path="register" element={ <Register /> } />
                <Route path="dashboard" element={ <Dashboard /> } />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;
