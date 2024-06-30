import "../css/Footer.css";
import ProductCard from "./ProductCard";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home = (props) => {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const {onAdd, productData} = props

    return(
        <div className='divider'>
            <section className="product">
                <h2 className="product-category">Çok Satanlar</h2>
                <div className="carousel">
                    <Carousel responsive={responsive}>
                        {productData.map((product, index) => (
                            index % 2 === 0 && (
                                <ProductCard key={product.id} addToCart={onAdd} product={product}/>
                            )
                        ))}
                    </Carousel>
                </div>
                <h2 className="product-category">En Popüler</h2>
                <div className="carousel">
                    <Carousel responsive={responsive}>
                        {productData.map((product, index) => (
                            index % 2 !== 0 && (
                                <ProductCard key={product.id} addToCart={onAdd} product={product}/>
                            )
                        ))}
                    </Carousel>
                </div>
                <h2 className="product-category">Yeni Eklenenler</h2>
                <div className="carousel">
                    <Carousel responsive={responsive}>
                        {productData.map((product, index) => (
                            index % 5 === 0 && (
                                <ProductCard key={product.id} addToCart={onAdd} product={product}/>
                            )
                        ))}
                    </Carousel>
                </div>
            </section>
        </div>

    )
}

export default Home;