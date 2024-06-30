import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

const Layout = ({cartItems, setCartItems, axiosData, productData, setProductData,setIsCartEmpty, isCartEmpty, increaseQuantity, getSubTotal, subTotal, decreaseQuantity}) => {

    return (
        <>
        <Navbar
            increaseQuantity={increaseQuantity}

            decreaseQuantity={decreaseQuantity}

            isCartEmpty={isCartEmpty}

            cartItems={cartItems}

            getSubTotal = {getSubTotal}

            subTotal = {subTotal}

            setIsCartEmpty = {setIsCartEmpty}

            setCartItems = {setCartItems}

            axiosData={axiosData}

            productData={productData}

            setProductData={setProductData}
        />
        <Outlet />
        <Footer />
        </>   );
};
export default Layout;




