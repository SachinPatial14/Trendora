import React, { useContext, useRef, useState } from "react";
import newlogo from "../../assets/newlogo.png" ;
import cart_icon from "../../assets/cart_icon.png" ;
import "./Navbar.css" ;
import { Link } from "react-router-dom";
import { ShopContext } from "../../contexts/ShopContext";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
    const [menu,setMenu] = useState("shop") ;
    const {getTotalCartItems} = useContext(ShopContext) ;
    const menuRef = useRef() ;

    const dropDown_toggle = (e)=>{
        menuRef.current.classList.toggle("nav-menu-visible");
        e.target.classList.toggle("open")
    };

    return (
        <div className="navbar">
            <div className="nav-logo">
               <img src={newlogo} alt="trendora logo" />
            </div>
            <FaChevronDown className="nav-down" onClick={dropDown_toggle}/>
            <ul ref={menuRef} className="nav-menu">
               <li onClick={()=> setMenu("shop")}><Link to="/" style={{textDecoration:"none", color:"#00A6A6"}}>Shop</Link>{menu === "shop"?<hr />:<></>}</li>
               <li onClick={()=> setMenu("men")}><Link to="/mens" style={{textDecoration:"none",color:"#00A6A6"}}>Men</Link>{menu === "men"?<hr />:<></>}</li>
               <li onClick={()=> setMenu("women")}><Link to="/womens" style={{textDecoration:"none",color:"#00A6A6"}}>Women</Link> {menu === "women"?<hr />:<></>}</li>
               <li onClick={()=> setMenu("kids")}><Link to="/kids" style={{textDecoration:"none",color:"#00A6A6"}}>Kids</Link> {menu === "kids"?<hr />:<></>}</li>
            </ul>
            <div className="nav-login-cart">
              <Link to="/login"><button>Login</button></Link>  
                <Link to="/cart"><img src={cart_icon} alt="cart icon logo" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar;