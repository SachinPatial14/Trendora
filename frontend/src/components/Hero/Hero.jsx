import React from "react";
import "./Hero.css" ;
import hand_icon from "../../assets/hand_icon.png" ;
import arrow_icon from "../../assets/arrow.png" ;
import new_hero_image from "../../assets/new_hero_image.png" ;

const Hero = ()=>{
    return(
        <div className="hero">
           <div className="hero-left">
             <div>
                <div className="hero-hand-icon">
                    <p>new</p>
                    <img src={hand_icon} alt="hand icon" />
                </div>
                <p>collections</p>
                <p>for everyone</p>
             </div>
             <div className="hero-latest-btn">
                <div>
                    Latest Collection
                </div>
                <img src={arrow_icon} alt="arrow icon" />
             </div>
           </div>
           <div className="hero-right">
             <img src={new_hero_image} alt="hero image" />
           </div>
        </div>
    )
};

export default Hero ;