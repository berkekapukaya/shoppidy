import '../css/App.css';
import React, {useEffect} from 'react';
import Home from "./Home";
import SearchPage from "./SearchPage";
import {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import CategoryPage from "./CategoryPage";
import PageNotFound from "./PageNotFound";
import axios from "axios";

function App() {

  const [cartItems, setCartItems] = useState([]);

  const [isCartEmpty, setIsCartEmpty] = React.useState(true);

  const [subTotal, setSubTotal] = useState(0);

  const [productData, setProductData] = useState([]);

    useEffect(() => {

        axiosData();

    }, [])

    const axiosData = async () => {
        await axios.get('http://localhost:3000/api/products')
            .then(res => {
                setProductData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem._id === product._id);

    if (existingItemIndex !== -1) {
      // If the item already exists in the cart, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      setCartItems(updatedCartItems);
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setIsCartEmpty(false);
    }

  const increaseQuantity = (product) => {
    const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === product._id && cartItem.quantity < parseInt(product.stock)) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
    });
    setCartItems(updatedCartItems);
    getSubTotal(updatedCartItems);
}

const decreaseQuantity = (product) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem._id === product._id);
    const existingItem = cartItems[existingItemIndex];

    if (existingItem.quantity === 1) {
        // If the quantity of the item is 1, remove it from the cart
        const updatedCartItems = cartItems.filter((cartItem) => cartItem._id !== product._id);
        setCartItems(updatedCartItems);
        setIsCartEmpty(updatedCartItems.length === 0);
        getSubTotal(updatedCartItems);
    } else {
        // If the quantity of the item is more than 1, decrease the quantity
        const updatedCartItems = cartItems.map((cartItem) => {
            if (cartItem._id === product._id) {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
        });
        setCartItems(updatedCartItems);
        getSubTotal(updatedCartItems);
    }

}

const getSubTotal = (cart) => {
      const sumArray = cart.map((item) => {
          return item.quantity * parseInt(item.price);
      })
    setSubTotal(() => {
        return sumArray.reduce((acc, currentValue) => acc + currentValue, 0)
    })
}

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/shoppidy" element={<Layout
                  increaseQuantity={increaseQuantity}

                  decreaseQuantity={decreaseQuantity}

                  isCartEmpty={isCartEmpty}

                  setIsCartEmpty={setIsCartEmpty}

                  cartItems={cartItems}

                  axiosData={axiosData}

                  productData={productData}

                  setProductData={setProductData}

                  getSubTotal = {getSubTotal}

                  subTotal = {subTotal}

                  setCartItems = {setCartItems}
              />}
              >
                  <Route index element={
                      <Home
                      productData={productData}
                      onAdd={addToCart}
                  />} />
                  <Route path="404" element={<PageNotFound />} />
                  <Route path="search" element={<SearchPage productData={productData} onAdd={addToCart} />} />
                  <Route path="meyveler" element={<CategoryPage category="Meyveler" productData={productData} onAdd={addToCart} />} />
                  <Route path="icecekler" element={<CategoryPage category="İçecekler" productData={productData} onAdd={addToCart} />} />
                  <Route path="atistirmaliklar" element={<CategoryPage category="Atıştırmalıklar" productData={productData} onAdd={addToCart} />} />
                  <Route path="temel_gida" element={<CategoryPage category="Temel Gıda" productData={productData} onAdd={addToCart} />} />
                  <Route path="temizlik_malzemeleri" element={<CategoryPage category="Temizlik Malzemeleri" productData={productData} onAdd={addToCart} />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
