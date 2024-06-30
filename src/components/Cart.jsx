import React, {useState} from 'react';
import '../css/Cart.css'; // You can define styles for the modal here
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import ConfirmOrder from "./ConfirmOrder";

const Cart = ({ onClose, axiosData, setCartItems, cartItems, setIsCartEmpty, isCartEmpty, increaseQuantity, decreaseQuantity, subTotal, showCart,setShowCart }) => {

    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

    return (
        <div className="cart-overlay" onClick={onClose}>
            <div className="cart-content" onClick={(e) => e.stopPropagation()}>
                <h2>Sepetim</h2>
                <div className="cart-container">
                    {isCartEmpty && <EmptyCart
                     setShowCart={setShowCart}
                     showCart={showCart}
                    />}
                    {cartItems.map((product, index) => (
                        <CartItem
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                            key={index}
                            product={product}
                        />
                    ))}
                </div>
                <div className="sub-total-area">
                    {!isCartEmpty && <ConfirmOrder
                        axiosData={axiosData}
                        isOrderConfirmed={isOrderConfirmed}
                        setIsOrderConfirmed={setIsOrderConfirmed}
                        setIsCartEmpty={setIsCartEmpty}
                        subTotal={subTotal}
                        setCartItems={setCartItems}
                        cartItems={cartItems}
                    />}
                </div>
            </div>
        </div>
    );
};

export default Cart;