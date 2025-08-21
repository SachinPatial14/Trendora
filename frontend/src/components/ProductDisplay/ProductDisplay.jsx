import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../../assets/star_icon.png";
import star_dull_icon from "../../assets/star_dull_icon.png";
import { Button } from "bootstrap";
import { ShopContext } from "../../contexts/ShopContext";
import ReactImageMagnify from 'react-image-magnify';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="product image" />
                    <img src={product.image} alt="product image" />
                    <img src={product.image} alt="product image" />
                    <img src={product.image} alt="product image" />
                </div>
                <div className="productdisplay-img">
                    <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'product small image',
                            isFluidWidth: true,
                            src: product.image ,
                        },
                        largeImage: {
                            src: product.image ,
                            width: 1500,
                            height: 1450
                        },
                        isHintEnabled:true ,
                        
                    }} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="star icon" />
                    <img src={star_icon} alt="star icon" />
                    <img src={star_icon} alt="star icon" />
                    <img src={star_icon} alt="star icon" />
                    <img src={star_dull_icon} alt="star dull icon" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        ${product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        ${product.new_price}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    A cloth shirt is a garment worn on the upper body, typically made from woven fabric. It has a collar, sleeves, and a full-length opening at the front, which is closed with buttons. Shirts can be made from a variety of materials, including cotton, linen, silk, and synthetic blends.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
                <p className="productdisplay-right-category"><span>Category :</span>Women , T-Shirt, Crop Top</p>
                <p className="productdisplay-right-category"><span>Tags :</span>Modern , Latest</p>

            </div>
        </div>
    )
};

export default ProductDisplay;