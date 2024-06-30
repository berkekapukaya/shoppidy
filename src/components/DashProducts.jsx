import "../css/DashProducts.css"
import axios from "axios";
import DashEachProduct from "./DashEachProduct";
//Make it so that the dashboard view all the available products\
//Add functionality to delete or change stock count of a product2

const DashProducts = ({onClose, axiosData, productData}) => {

    const URL = 'https://mynode-mb4z.onrender.com';

    const onDelete = async (id) => {
        await axios.delete(
            `${URL}/api/products/${id}`,
            {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            }
        )
            .then(res => {
                console.log(res)
                axiosData();
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <div className="dash-products-overlay" onClick={onClose}>
            <div className="dash-products-content" onClick={(e) => e.stopPropagation()}>
                <h2>Ürünler</h2>
                <div className="dash-product-titles">
                    <div className="dash-product-name">
                        <h3>İsim</h3>
                    </div>
                    <div className="dash-product-category">
                        <h3>Kategori</h3>
                    </div>
                    <div className="dash-product-price">
                        <h3>Fiyat</h3>
                    </div>
                    <h3>Stok</h3>
                </div>
                <div className="dash-product-container">
                    {productData.map((product) => (
                        <DashEachProduct axiosData={axiosData} onDelete={onDelete} key={product._id} product={product}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DashProducts;