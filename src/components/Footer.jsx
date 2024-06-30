import "../css/Footer.css"
import React, {useState} from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import {Link} from "react-router-dom";
import {animateScroll as scroll} from "react-scroll";

const Footer = () => {

    const scrollToTop = () => {
        scroll.scrollToTop();
    }

    return(
        <footer>
            <div className="footer-content">
                <h1 className="light-logo"><ShoppingBasketIcon sx={{fontSize: 40}}/> Shoppidy</h1>
                <div className="footer-ul-container">
                    <ul className="category">
                        <li className="category-title">Kategoriler</li>
                        <li className="footer-link-item"><Link onClick={scrollToTop} className="footer-link" to="meyveler">Meyveler</Link></li>
                        <li className="footer-link-item"><Link onClick={scrollToTop} className="footer-link" to="icecekler">İçecekler</Link></li>
                        <li className="footer-link-item"><Link onClick={scrollToTop} className="footer-link" to="atistirmaliklar">Atıştırmalıklar</Link></li>
                        <li className="footer-link-item"><Link onClick={scrollToTop} className="footer-link" to="temel_gida">Temel Gıda</Link></li>
                        <li className="footer-link-item"><Link onClick={scrollToTop} className="footer-link" to="temizlik_malzemeleri">Temizlik Malzemeleri</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;