

const ProductCard = (props) => {

    const {name, price, actualPrice, imageUrl, description, discount} = props.product;

    const {addToCart} = props;

    const handleClick = () => {
        addToCart(props.product);
    }

    return (
        <div className="product-card">
            <div className="product-image">
                {discount && <span className="discount-tag">{discount}% İndirim</span>}
                <img src={imageUrl} className="product-thumb" alt=""/>
                <button onClick={handleClick} className="card-btn">Sepete Ekle</button>
            </div>
            <div className="product-info">
                <h2 className="product-brand">{name}</h2>
                <p className="product-short-desc">{description}</p>
                {discount ?
                    <>
                        <span className="price">{price + "₺"}</span>
                        <span className="actual-price">{actualPrice}₺</span>
                    </> :
                    <span className="price">{price}₺</span>}
            </div>
        </div>
    )
}

export default ProductCard;