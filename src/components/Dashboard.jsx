import React, {useEffect, useState} from "react";
import "../css/Dashboard.css";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import Resizer from "react-image-file-resizer";



const Dashboard = ( {onClose, axiosProductData}) => {

    const URL = 'https://mynode-mb4z.onrender.com';

    const [product, setProduct] = useState({
        name: "",
        description: "",
        actualPrice: "",
        discount: "",
        price: "",
        stock: "",
        imageUrl: "",
        category: "",
        tags: [],
    })

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        let processing = true;
        axiosData(processing);
        return () => {
            processing = false;
        }
    }, [])

    const axiosData = async (processing) => {
        await axios.get(`${URL}/api/categories`)
            .then(res => {
                if(processing){
                    setCategories(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    const handleChange = (event) => {
        const {name, value} = event.target;

        setProduct((prevValue) => {
            // If changing stock

            if (name === 'tags') {
                return {
                    ...prevValue,
                    tags: [value.split(',')]
                };
            }

            // If changing discount
            if (name === 'discount') {
                // Ensuring discount is null or an increment of 5 starting from 10
                let newDiscount = 0;
                const discountValue = parseInt(value);
                if (discountValue || !discountValue) {
                    newDiscount = discountValue;
                    // Calculate new price based on discount
                    const newPrice = Math.round(prevValue.actualPrice * (1 - newDiscount / 100));
                    return {
                        ...prevValue,
                        [name]: discountValue,
                        price: newPrice,
                    };
                }
                return {
                    ...prevValue,
                    [name]: newDiscount,
                    price: prevValue.actualPrice,
                };
            }

            return {
                ...prevValue,
                [name]: value,
            }
        })
    }

    const [previewImage, setPreviewImage] = useState(null);

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                200,
                200,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });

    const handleFileChange = async (e) => {

        try {
            const file = e.target.files[0];
            const image = await resizeFile(file);
            // const reader = new FileReader();

            setPreviewImage(image);
            product.imageUrl = image;

        } catch (err) {
            console.log(err);
        }

    };

    const handleAddProduct = async () => {
        // Call the onAdd callback with the new note

        try {
            // Send POST request to add product
            const token = localStorage.getItem('token');

            const response = await axios.post(
                '/api/products',
                product,
                {
                    headers: {
                        'x-auth-token': token,
                    },
                }
            );

            if (response.status === 201) {
                // Product added successfully
                axiosProductData();
                console.log('Product added successfully');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }

        setPreviewImage(null);

        setProduct({
            name: "",
            description: "",
            actualPrice: "",
            discount: "",
            price: "",
            stock: "",
            imageUrl: "",
            category: "",
            tags: [],
        });
    }

    return(
        <div className="dashboard-overlay" onClick={onClose}>
            <div className="dashboard-content" onClick={(event) => event.stopPropagation()}>
                <h2 style={{textAlign: "center", fontFamily:"\"McLaren\", cursive"}}>Shoppidy</h2>
                <div className="form">
                    <input className="dash-input"
                           name="name"
                           value={product.name}
                           type="text"
                           onChange={handleChange}
                           placeholder="Ürün adı"
                    />
                    <input className="dash-input"
                           value={product.description}
                           type="text"
                           name="description"
                           onChange={handleChange}
                           placeholder="ürün hakkında kısa bilgi"
                    />

                    <div>
                        <div  className="dashproduct-image">
                            {previewImage ?
                                <img src={previewImage} alt="" style={{width: "300px", height: "300px"}}/>
                                : <p className="text">Ürün Resmi</p>
                            }
                            <label htmlFor="image-upload">
                                <input
                                    name="imageUrl"
                                    id="url"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{display: 'none'}} // Hide the input element
                                />
                                <Fab
                                    size="small"
                                    aria-label="upload"
                                    onClick={() => document.getElementById('url').click()}
                                >
                                    <AddIcon/>
                                </Fab>
                            </label>

                        </div>

                    </div>
                    <div className="product-price">
                    <input className="dash-input"
                           type="number"
                           value={product.actualPrice}
                           name="actualPrice"
                           onChange={handleChange}
                           placeholder="asıl fiyat"
                    />
                        <input className="dash-input"
                               type="number"
                               value={product.discount}
                               name="discount"
                               onChange={handleChange}
                               placeholder="İndirim oranı"
                        />
                        <input className="dash-input"
                               type="number"
                               value={product.price}
                               name="price"
                               onChange={handleChange}
                               placeholder="satış fiyatı"
                               readOnly={true}
                        />
                    </div>
                    <input className="dash-input"
                           type="number"
                           value={product.stock}
                           name="stock" min="20"
                           onChange={handleChange}
                           placeholder="stoklardaki ürün (minimum 20)"
                    />
                    <select name="category" value={product.category} onChange={handleChange}>
                        <option value="" key="none" >Kategori Seçin</option>
                        {
                            categories?.map( (item) => (
                                <option value={item._id} key={item.name}>{item.name}</option>
                            ))
                        }
                    </select>
                    <textarea name="tags"
                              value={product.tags}
                              onChange={handleChange}
                              placeholder="Ürünle ilgili etiketleri girin.">
                    </textarea>
                    <div className="buttons">
                        <button onClick={handleAddProduct} className="btn" id="add-btn">ekle</button>
                        <button onClick={onClose} className="btn" id="cancel-btn">İptal</button>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default Dashboard;