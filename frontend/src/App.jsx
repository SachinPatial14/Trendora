import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Shop from './pages/Shop'
import ShopCategory from './pages/ShopCategory'
import Product from './pages/Product'
import Cart from './pages/Cart'
import LoginSignup from './pages/LoginSignup'
import Footer from './components/Footer/Footer' 
import men_banner from "./assets/banner_mens.png" ;
import women_banner from "./assets/banner_women.png" ;
import kid_banner from "./assets/banner_kids.png" ;
import CheckOut from './pages/CheckOut'
import Payment from './pages/Payment'
import Order from './pages/Order'

function App() {
  return(
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>} />
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>} />
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>} />
        <Route path='/product' element={<Product />}>
          <Route path=':productId' element={<Product />}/>
        </Route>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/checkout' element={<CheckOut />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/login' element={<LoginSignup />}/>
        <Route path='/order' element={<Order />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
