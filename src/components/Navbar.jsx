import '../css/Navbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import UserDropdown from "./UserDropdown";
import Login from "./Login";
import {useState, useEffect, useRef} from "react";
import Cart from "./Cart";
import Dashboard from "./Dashboard";
import React from "react";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link, useNavigate  } from "react-router-dom";
import DashProducts from "./DashProducts";
import DashUsers from "./DashUsers";

const Navbar = ({cartItems, axiosData, productData, setCartItems, setIsCartEmpty, isCartEmpty, increaseQuantity, getSubTotal, subTotal, decreaseQuantity}) => {

    const [showLogin, setShowLogin] = useState(false);

    const [position, setPosition] = useState({ right: 0, left: 0 });

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [userName, setUserName] = useState('');

    const [showUserDropdown, setShowUserDropdown] = useState(false);

    const [showCart, setShowCart] = useState(false);

    const [showProducts, setShowProducts] = useState(false);

    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    const [showDashboard, setShowDashboard] = useState(false);

    const [showUsers, setShowUsers] = useState(false);

    const handleCartIconClick = () => {
        setShowCart(!showCart);
        getSubTotal(cartItems);
    }

    const handleUserIconClick = () => {
        if (isLoggedIn) {
            const buttonPosition = document.getElementById('account-button').getBoundingClientRect();
            setPosition({ right: buttonPosition.right, left: buttonPosition.left });
            setShowUserDropdown(!showUserDropdown);

        } else {
            setShowLogin(true);
        }
    };

    const handleSearchClick = () => {
        if(searchQuery === ''){
            return;
        }
        navigate(`/search?query=${searchQuery}`);
        setSearchQuery('')
    }

    const handleSignOut = () => {
        setIsLoggedIn(false);
        setShowUserDropdown(false);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
    };

    const handleDashboardClick = () => {
        setShowUserDropdown(false);
        setShowDashboard(true);
    }

    const handleDashProductsClick = () => {
        setShowUserDropdown(false);
        setShowProducts(true);
    }

    const handleDashUsersClick = () => {
        setShowUserDropdown(false);
        setShowUsers(true);
    }

    const handleLogin = (email, token, isAdmin) => {
        // Now you can store the token securely on the frontend (e.g., in localStorage)
        // Split the email address into two parts based on the "@" symbol
        const parts = email.split('@');

        // Extract the username part (before the "@" symbol)
        const username = parts[0];

        // Capitalize the username part
        const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
        localStorage.setItem('token', token);
        localStorage.setItem('username', capitalizedUsername);
        localStorage.setItem('isAdmin', isAdmin);
        setIsLoggedIn(true);
        setUserName(capitalizedUsername);
        setShowLogin(false);
    };

    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowUserDropdown(false); // Close the container if click is outside
            }
        };

        // Add event listener to detect clicks outside the container
        document.addEventListener('mousedown', handleClickOutside);

        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if(token && username){
            setIsLoggedIn(true);
            setUserName(username)
        }

        return () => {
            // Cleanup: remove event listener
            document.removeEventListener('mousedown', handleClickOutside);
        };


    }, [containerRef]);


    return(
        <div className="navbar">
            <div className="nav">
                <div className="nav-items">
                    <h1 className="logo"> <ShoppingBasketIcon /> Shoppidy</h1>
                    <div className="search">
                        <input onChange={(event) => setSearchQuery(event.target.value)}
                               value={searchQuery}
                               type="text" className="search-box"
                               placeholder="Ürün Ara..."
                        />
                        <button onClick={handleSearchClick} className="search-btn">ara</button>
                        <IconButton onClick={handleCartIconClick} color="black" aria-label="add to shopping cart">
                            <AddShoppingCartIcon/>
                        </IconButton>
                        <IconButton onClick={handleUserIconClick} id="account-button" color="black" aria-label="user">
                            <AccountCircleIcon/>
                            {isLoggedIn ? `Hoş geldin, ${userName}` : ''}

                        </IconButton>
                        {showUserDropdown && <UserDropdown
                            containerRef={containerRef}
                            position={position}
                            onDashboard={handleDashboardClick}
                            onSignOut={handleSignOut}
                            onProductsDashboard={handleDashProductsClick}
                            onUsersDashboard={handleDashUsersClick}
                        />

                        }
                        {showProducts && <DashProducts
                            axiosData={axiosData}
                            productData={productData}
                            onClose={() => setShowProducts(false)} />}
                        {showDashboard && <Dashboard
                            axiosProductData={axiosData}
                            onClose={() => setShowDashboard(false)} />}
                        {showUsers && <DashUsers
                            onClose={() => setShowUsers(false)}
                        />}
                        {showLogin && <Login onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
                        {showCart && <Cart
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                            isCartEmpty={isCartEmpty}
                            setIsCartEmpty={setIsCartEmpty}
                            cartItems={cartItems}
                            onClose={() => setShowCart(false)}
                            getSubTotal = {getSubTotal}
                            subTotal = {subTotal}
                            showCart = {showCart}
                            setShowCart={setShowCart}
                            setCartItems = {setCartItems}
                            axiosData={axiosData}
                        />}
                    </div>
                </div>
            </div>
            <ul className="links-container">
                <li className="link-item"><Link className="link" to="/shoppidy">Anasayfa</Link></li>
                <li className="link-item"><Link className="link" to="meyveler">Meyveler</Link></li>
                <li className="link-item"><Link className="link" to="icecekler">İçecekler</Link></li>
                <li className="link-item"><Link className="link" to="atistirmaliklar">Atıştırmalıklar</Link></li>
                <li className="link-item"><Link className="link" to="temel_gida">Temel Gıda</Link></li>
                <li className="link-item"><Link className="link" to="temizlik_malzemeleri">Temizlik Malzemeleri</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;