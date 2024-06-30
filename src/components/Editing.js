import React, {useState, useEffect} from "react";
import axios from "axios";


const Editing = ({ product,saveChanges,handleCancel}) => {

    const [updatedProduct, setUpdatedProduct] = useState({...product})

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct(prevState => ({
            ...prevState,
            [name]: value,
            discount: 0,
        }));
    };

    const handleClick = () => {

        const {_id, __v, discount, ...rest} = updatedProduct;

        saveChanges(product._id, rest)
    }

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        let processing = true;
        axiosData(processing);
        return () => {
            processing = false;
        }
    }, [])

    const axiosData = async (processing) => {
        await axios.get('http://localhost:3000/api/categories')
            .then(res => {
                if(processing){
                    setCategories(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <>
            <select className="dash-product-select" name="category" value={updatedProduct.category} onChange={handleInputChange}>
                <option value="" key="none">Kategori Seçin</option>
                {
                    categories?.map((item) => (
                        <option value={item._id} key={item.name}>{item.name}</option>
                    ))
                }
            </select>
            <input
                className="dash-product-input"
                key={`price-${product._id}`}
                type="number"
                name="price"
                value={updatedProduct.price}
                placeholder={updatedProduct.price}
                onChange={handleInputChange}
            />
            <input
                className="dash-product-input"
                key={`stockCount-${product._id}`}
                type="number"
                name="stock"
                placeholder={product.stock}
                value={updatedProduct.stock}
                onChange={handleInputChange}
            />
            <button onClick={handleClick} id="delete-btn" className="dash-product-btn">Kaydet</button>
            <button onClick={handleCancel} id="edit-btn" className="dash-product-btn">İptal et</button>
        </>
    )
}

export default Editing;