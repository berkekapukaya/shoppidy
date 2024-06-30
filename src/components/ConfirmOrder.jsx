import React from "react";
import Subtotal from "./Subtotal";
import axios from "axios";


const ConfirmOrder = ({subTotal, axiosData, setCartItems, cartItems, isOrderConfirmed, setIsOrderConfirmed, setIsCartEmpty}) => {

    const handleConfirmOrder = async () => {

        setIsOrderConfirmed(true);

        try {
            // Send POST request to add product
            const response = await axios.post('/api/cart', cartItems);

            if (response.status === 201) {
                console.log('Product updated successfully');
            }
        } catch (error) {
            console.error('Error on order confirmation product:', error);
        }

        // Reset the confirmation after a delay
        setTimeout(() => {
            axiosData();
            setIsOrderConfirmed(false);
            setIsCartEmpty(true);
            setCartItems([]);
        }, 3000); // 3000 milliseconds (3 seconds) delay
    };

    return (
        <div className="sub-total">
            {isOrderConfirmed && <h2 className="confirmed-message">Siparişiniz Yolda!!</h2>}
            <Subtotal isOrderConfirmed={isOrderConfirmed} subTotal={subTotal} handleConfirmOrder={handleConfirmOrder}/>
        </div>
    )
}

export default ConfirmOrder;