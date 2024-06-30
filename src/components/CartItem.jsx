import '../css/Cart.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const CartItem = ({product, increaseQuantity, decreaseQuantity}) => {

    const {imageUrl, name, price, quantity} = product;

    return (
        <div className="cart-item">
            <img src={imageUrl} alt="product"/>
            <h3 style={{marginTop:'50px'}}>{name}</h3>
            <div className="cart-item-details">
                {}
                <p style={{margin: "10px 0"}}>Fiyat: {price + "₺"}</p>
                <p>Adet: {quantity}</p>
                <ButtonGroup className="button-group" variant="contained" aria-label="outlined primary button group">
                    <Button onClick={() => increaseQuantity(product)} className="inc-button">+</Button>
                    <Button onClick={() => decreaseQuantity(product)} className="dec-button">-</Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default CartItem;