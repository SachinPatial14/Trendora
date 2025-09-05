import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import "./CSS/Order.css";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { orderDate, getTotalAmount, selectedAddress, selectedDelivery } =
    useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <div className="order-container">
      <h2>Order Details</h2>
      <div className="order-details">
        <p><span>Name:</span> {selectedAddress.name}</p>
        <p><span>Mobile No.:</span> {selectedAddress.phone}</p>
        <p><span>Total Amount:</span> ${getTotalAmount()}</p>
        <p><span>Shipping Address:</span> {selectedAddress.street}</p>
        <p><span>Shipping Method:</span> {selectedDelivery.name}</p>
        <p><span>Order Date:</span> {orderDate.toLocaleTimeString()}</p>
      </div>
      <button
        className="order-btn"
        onClick={() => navigate("/", { replace: true })}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Order;
