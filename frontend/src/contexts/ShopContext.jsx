import axios from "axios";
import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const ShopContext = createContext(null);
export const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    };
    return cart;
}
const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [orderDate,setOrderDate] = useState(null) ;
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null);
    const [userAddress, setUserAddress] = useState([]);

    const deliveryOptions = [
        { id: 1, name: "Standard (3-5 days)", price: 0 },
        { id: 2, name: "Express (1-2 days)", price: 10 },
        { id: 3, name: "Same Day Delivery", price: 20 },
    ];

    const [selectedDelivery, setSelectedDelivery] = useState(deliveryOptions[0]);

    useEffect(() => {
        fetch('http://localhost:4000/allproducts').
            then((res) => res.json())
            .then((data) => {
                setAll_Product(data);
            });

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
                method: "POST",
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': "application/json"
                },
                body: "",
            }).then((res) => res.json())
                .then((data) => {
                    setCartItems(data)
                })
        }
    }, []);

    useEffect(() => {
        async function fetchUserData() {
            const user = JSON.parse(localStorage.getItem("auth-user"));
            if (user) {
                setLoggedUser(user);
                try {
                    const res = await axios.get(`http://localhost:4000/getuseraddress/${user._id}`);
                    setUserAddress(res.data.addresses || []);
                } catch (err) {
                    setUserAddress([]); // fallback if not found
                }
            }
        }
        fetchUserData();
    }, []);


    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] + 1
        }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: "POST",
                headers: {
                    Accept: "application/form-data",
                    'auth-token': `${localStorage.getItem("auth-token")}`,
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ "itemId": itemId }),
            }).then((res) => res.json()).
                then((data) => console.log(data))
        }

    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }));
        if (localStorage.getItem("auth-token")) {
            fetch('http://localhost:4000/removefromcart', {
                method: "POST",
                headers: {
                    Accept: "application/form-data",
                    'auth-token': `${localStorage.getItem("auth-token")}`,
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ "itemId": itemId }),
            }).then((res) => res.json()).
                then((data) => console.log(data))
        }

    }

    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        };
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        };
        return totalItems;
    };


    const contextValue = { orderDate,setOrderDate,setUserAddress, userAddress, loggedUser, selectedDelivery, setSelectedDelivery, deliveryOptions, selectedAddress, setSelectedAddress, getTotalCartItems, getTotalAmount, all_product, cartItems, addToCart, removeFromCart, setCartItems, getDefaultCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
};

export default ShopContextProvider;
