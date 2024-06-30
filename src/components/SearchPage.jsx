import '../css/Search.css';
import "../css/Footer.css"
import './ProductCard';
import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import ProductCard from "./ProductCard";

const SearchPage = (props) => {

    const {onAdd, productData} = props

    const location = useLocation();

    const navigate = useNavigate();

    const searchQuery = new URLSearchParams(location.search).get("query");

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        // Filter items based on the search query
        const filtered = productData.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredProducts(filtered);

    }, [searchQuery]);

    return(
        <div>
            <section className="search-results">
                <h2 className="heading"><span>{searchQuery}</span> için arama sonuçları</h2>
                <div className='product-container'>
                    {filteredProducts.length === 0 && navigate('/404')}
                    {filteredProducts.map((product) => (
                        <ProductCard
                            addToCart={onAdd}
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default SearchPage;