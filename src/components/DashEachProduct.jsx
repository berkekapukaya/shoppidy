import "../css/DashProducts.css"
import {useState} from "react";
import axios from "axios";
import Editing from "./Editing";

const DashEachProduct = ({axiosData , onDelete, product}) => {

    const URL = 'https://mynode-mb4z.onrender.com';

    const [editProductMode, setEditProductMode] = useState(false)

    const [isDeleting, setIsDeleting] = useState(false);

    const toggleEditMode = () => {
        setEditProductMode(!editProductMode)
    }

    const handleCancel = () => {
        toggleEditMode()
    }

    const saveChanges = async (productId, updatedProduct) => {
        try {

            const token = localStorage.getItem('token');

            await axios.put(`${URL}/api/products/${productId}`,
                updatedProduct,
                {
                    headers: {
                        'x-auth-token': token,
                    }
                }
            );
            // After successful update, fetch updated list of products
            axiosData();
            // Exit edit mode
            toggleEditMode();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const NotEdited = () => {
        return(
            <>
                <div className="dash-each-category">
                    <p>{product.category.name}</p>
                </div>
                <p>{product.price}₺</p>
                <p>{product.stock}</p>
                {isDeleting ? <DeletionConfirmation /> : <Buttons/>}
            </>
        )
    }

    const Buttons = () => {
        return(
            <>
                <button onClick={() => setIsDeleting(!isDeleting)} id="delete-btn" className="dash-product-btn">Sil</button>
                <button onClick={toggleEditMode} id="edit-btn" className="dash-product-btn">Düzenle</button>
            </>
        )
    }

    const DeletionConfirmation = () => {
        return(
            <div className="delete-confirm">
                <p>Bu ürünü silmek istediğinizden emin misiniz ?</p>
                <div className="delete-confirm-buttons">
                    <button onClick={() => onDelete(product._id)} id="delete-btn" className="delete-confirm-btn">Evet</button>
                    <button onClick={() => setIsDeleting(!isDeleting)} id="edit-btn" className="delete-confirm-btn">Hayır</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="dash-product">
                <img src={product.imageUrl} alt="product"/>
                <h3>{product.name}</h3>
                {editProductMode ? <Editing
                    product={product}
                    saveChanges={saveChanges}
                    handleCancel={handleCancel}/>
                    : <NotEdited/>}
            </div>
        </div>
    )
}

export default DashEachProduct;