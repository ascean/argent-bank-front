import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Router from "./Router";


const App = () => {
    return (
        <>
            <Header />
            <Router />
            <Footer />
        </>
    );
};

export default App;
