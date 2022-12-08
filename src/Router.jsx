import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Error from "./pages/error/Error";
import SignIn from "./pages/signIn/SignIn";
import User from "./pages/user/User";
import Transactions from "./pages/transactions/Transactions";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="sign-in" element={<SignIn />} />
                <Route path="user" element={<User />} />
                <Route path="user/transactions" element={<Transactions />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;
