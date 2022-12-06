import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Error from "./pages/error/Error";
import SignIn from "./pages/signIn/SignIn";
import User from "./pages/user/User";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/user" element={<User />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
