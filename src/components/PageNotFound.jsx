
import '../css/PageNotFound.css';
import {useNavigate} from "react-router-dom";


const PageNotFound = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    return (
        <div className="not-found">
            <img src="https://www.walmart.com/vpwaitingroom/pglass/walmart-glass-spa_files/images/error-page-not-found-tv.svg"/>
            <h1>404</h1>
            <h1>Ürün Bulunamadı</h1>
            <button onClick={handleClick}>Ana Sayfa</button>
        </div>
    )
}

export default PageNotFound;