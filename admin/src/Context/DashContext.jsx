import axios from "axios";
import React, {createContext, useContext, useEffect, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({children})=>{
   const [countOrder,setCountOrder] = useState(0);
   const [countUser,setCountUser] = useState(0);
   const [countProduct,setCountProduct] = useState(0);


   const totalOrders = async()=>{
    try{
      const res = await axios.get("http://localhost:4000/totalorders");
      setCountOrder(res.data)
    }catch(err){
        console.error("Error to get total number of orders",err)
    }
   };


   const totalUsers = async()=>{
    try{
      const res = await axios.get("http://localhost:4000/totalusers");
      setCountUser(res.data)
    }catch(err){
        console.error("Error to get total number of users",err)
    }
   };

      const totalProducts = async()=>{
    try{
      const res = await axios.get("http://localhost:4000/totalproducts");
      setCountProduct(res.data)
    }catch(err){
        console.error("Error to get total number of products",err)
    }
   };


   useEffect(()=>{
    totalOrders();
    totalUsers();
    totalProducts();
   },[]);


    return(
        <DashboardContext.Provider value={{countOrder,countUser,countProduct}}>
            {children}
        </DashboardContext.Provider>
    )
};

export  const  useDashboard = ()=> useContext(DashboardContext);