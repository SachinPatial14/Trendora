import React, { createContext, useState } from "react";
import all_product from "../assets/all_product";

export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
        cart[index] = 0;
    };
    return cart;
}
const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [addressData,setAddressData] = useState([]) ;
    const [selectedAddress,setSelectedAddress] = useState(null) ;

      const deliveryOptions = [
    { id: 1, name: "Standard (3-5 days)", price: 0 },
    { id: 2, name: "Express (1-2 days)", price: 10 },
    { id: 3, name: "Same Day Delivery", price: 20 },
  ];

    const [selectedDelivery, setSelectedDelivery] = useState(deliveryOptions[0]);


    const addToCart = (itemId)=>{
       setCartItems((prev)=>({
        ...prev,
        [itemId] : prev[itemId] + 1
       }));

    }

    const removeFromCart = (itemId)=>{
               setCartItems((prev)=>({
        ...prev,
        [itemId] : prev[itemId] - 1
       }))

    }

    const getTotalAmount = () =>{
        let totalAmount = 0;
        for (const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=> product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item]; 
            }
        };
        return totalAmount ;
    };

    const getTotalCartItems =()=>{
        let totalItems = 0 ;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItems += cartItems[item] ;
            }
        };
        return totalItems ;
    };

    const addAddress = (data)=>{
        setAddressData(((prev)=>[...prev, data])) ;
    };

    const contextValue = {selectedDelivery,setSelectedDelivery,deliveryOptions,selectedAddress,addressData,addAddress,setSelectedAddress, getTotalCartItems,getTotalAmount,all_product,cartItems,addToCart,removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
};

export default ShopContextProvider;
