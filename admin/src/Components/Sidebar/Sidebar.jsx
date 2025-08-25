import React from 'react';
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaList } from "react-icons/fa";


const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <FaShoppingCart size={28} color="#333" style={{ cursor: "pointer" }} />
                    <p>Add Product</p>
                </div>
            </Link>
            <Link to={'/listproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <FaList size={28} color="#333" />                    <p>Product List</p>
                </div>
            </Link>

        </div>
    )
}

export default Sidebar
