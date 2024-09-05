import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from './Navbar'
import Footer from './footer.jsx'
import ScrollToTop from "../SpecialSetups/ScrollToTop.jsx";


const RootLayout = () => {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default RootLayout;
