import React from "react";
import "../css/Cart.css";

const Subtotal = ({subTotal, handleConfirmOrder, isOrderConfirmed}) =>{
    return(
        <div>
            <h2>Toplam: {subTotal}₺ </h2>
            {!isOrderConfirmed && <button onClick={handleConfirmOrder} className="confirm-btn" type="submit">Siparişi Onayla</button>}
        </div>
    )
}


export default Subtotal;