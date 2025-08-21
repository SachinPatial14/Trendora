import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
    return (
 <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">
                    Description
                </div>
                <div className="descriptionbox-nav-box-fade">
                    Reviews (122)
                </div>
            </div>

            <div className="descriptionbox-description">
                <p>
                    Crafted with premium, breathable fabric, this piece combines comfort and durability 
                    for everyday wear. Its modern design pairs effortlessly with any style, making it a 
                    must-have in your wardrobe.
                </p>
                <p>
                    Designed for style and built to last, this product blends quality craftsmanship 
                    with timeless appeal.  it’s made to keep you looking 
                    and feeling your best all day long.
                </p>
            </div>
        </div>    )
};

export default DescriptionBox;