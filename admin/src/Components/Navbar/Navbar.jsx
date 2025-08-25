import React from 'react'
import "./Navbar.css" ;
import navlogo from "../../assets/newlogo.png"
import navProfile from "../../assets/nav-logo.png" ;

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="nav logo" className="nav-logo" />
      <img src={navProfile} alt='nav profile' className='nav-profile'/>
    </div>
  )
}

export default Navbar ;
