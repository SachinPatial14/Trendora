import React from 'react';
import "./Sidebar.css";
import {NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaList } from "react-icons/fa";


const Sidebar = () => {

    return (
        <div className='sidebar'>
            <div className="sidebar-item">
                <NavLink to='/addproduct' style={{ textDecoration: "none" }} >
                    <FaShoppingCart size={28} color="#333" style={{ cursor: "pointer" }} />
                    Add Product
                </NavLink>
            </div>
            <div className="sidebar-item">
                <NavLink to='/listproduct' style={{ textDecoration: "none" }}>
                    <FaList size={28} color="#333" />
                    Product List
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
