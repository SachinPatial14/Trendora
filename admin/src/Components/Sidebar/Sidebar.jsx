import React from 'react';
import "./Sidebar.css";
import {NavLink } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FaList } from "react-icons/fa";


const Sidebar = () => {
    const menuItems=[
        {
            title:"Add Product",
            url:"/addproduct",
            icon:<FaShoppingCart size={28} color="#333" style={{ cursor: "pointer" }} />
        },
        {
            title:"Product List",
            url:"/listproduct",
            icon:<FaList size={28} color="#333" />
        },{
            title:"Customer",
            url:"/customer",
            icon:<FaUser size={20} color="#333"/>
        }
    ]

// const renderIcon = (name) => {
   
//   const IconComponent = FaIcons[name];
//   return IconComponent ? <IconComponent /> : null;
// };

    return (
        <div className='sidebar'>
            {menuItems.map((item,index)=>(
                <div key={index} className="sidebar-item">
                <NavLink to={item.url} style={{ textDecoration: "none" }} >
                    {item.icon}
                    {item.title}
                </NavLink>
                </div>
            )
            )}
            {/* <div className="sidebar-item">
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
            </div> */}
        </div>
    )
}

export default Sidebar
