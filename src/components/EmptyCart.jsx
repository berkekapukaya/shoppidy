import React from "react";
import '../css/Cart.css';

const EmptyCart = ({showCart, setShowCart}) => {

    const handleClick = () => {
        setShowCart(!showCart);
    }

    return (
        <div className="empty-cart">
            <img src="https://www.migros.com.tr/assets/images/cart-empty/cart-empty.webp"
                 alt="empty cart"/>
            <p>Alışveriş Sepetiniz Boş</p>
            <button onClick={handleClick} className="submit-btn">Alışverişe Başlayın</button>
        </div>
    )
}


export default EmptyCart;