import '../css/Search.css';
import "../css/Footer.css"
import './ProductCard';
import ProductCard from "./ProductCard";


const CategoryPage = ({onAdd, category, productData}) => {


    const filteredProducts = productData.filter((product) => {



       return product.category.name === category
    });


    return(
        <div className="wrapper">
            <section className="category-results">
                <h2 className="heading">Kategori: <span>{category}</span></h2>
                <div className='product-container'>
                    {filteredProducts.map((product) => (
                        <ProductCard
                            addToCart={onAdd}
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default CategoryPage;