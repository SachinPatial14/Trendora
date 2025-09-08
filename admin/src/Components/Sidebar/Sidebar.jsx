import React from 'react';
import "./Sidebar.css";
import {NavLink } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";


const Sidebar = () => {
    const menuItems=[
        {
            title:"Dashboard",
            url:"/",
            icon:<MdDashboard size={24} style={{ cursor: "pointer" }}  />
        },
        {
            title:"Add Product",
            url:"/addproduct",
            icon:<FaShoppingCart size={28}  style={{ cursor: "pointer" }} />
        },
        {
            title:"Product List",
            url:"/listproduct",
            icon:<FaList size={28}  />
        },{
            title:"Customer",
            url:"/customer",
            icon:<FaUser size={20}/>
        },
        {
            title:"Orders",
            url:"/order",
            icon:  <FaClipboardList size={24} />
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
