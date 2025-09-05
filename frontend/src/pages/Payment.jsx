import React, { useContext, useState } from "react";
import { ShopContext, getDefaultCart } from "../contexts/ShopContext";
import "./CSS/Payment.css";
import BillingDetails from "../components/BillingDetails/BillingDetails";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Payment = () => {
  const { selectedAddress,setOrderDate, selectedDelivery, loggedUser, getTotalAmount, getTotalCartItems, setCartItems } = useContext(ShopContext);
  const [method, setMethod] = useState("credit");
  const navigate = useNavigate();

  const placeOrder = async () => {
    try {
      if (!loggedUser || !loggedUser._id) {
        alert("User not logged in");
        return;
      }

      const res = await axios.post("http://localhost:4000/saveorder", {
        userId: loggedUser._id,
        product: {
          orderType: method,
          amount: getTotalAmount(),
          address: selectedAddress.street,
          quantity: getTotalCartItems(),
        },
      });

      if (res.status === 201) {
        alert("Order confirmed successfully");

        await axios.post(
          "http://localhost:4000/emptycart",
          {},
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"), 
            },
          }
        );

       setOrderDate(new Date())
        setCartItems(getDefaultCart());
        console.log("Cart emptied");
        navigate("/order");
      }
    } catch (err) {
      alert("Error placing order");
      console.error("Error to place order", err);
    }
  };

  return (
    <div className="payment-container">
      {/* Top Row: Address + Billing */}
      <div className="top-section">
        {/* Address Section */}
        <div className="address-section">
          {selectedAddress === null ? (
            <p><b>Please Choose Address First</b></p>
          ) : (
            <div className="address-content">
              <p><b>Name:</b>{selectedAddress.name}</p>
              <p><b>Address:</b>{selectedAddress.street}</p>
              <p><b>Mobile No.:</b>{selectedAddress.phone}</p>
              <p><b>Place:</b>{selectedAddress.country}, {selectedAddress.city}</p>
              <p><b>Shipping Method :</b>{selectedDelivery.name}</p>
            </div>
          )}
        </div>

        {/* Billing Section */}
        <div className="billing-section">
          <BillingDetails location="shipping" shippingFee={selectedDelivery.price} />
        </div>
      </div>

      {/* Payment Section */}
      <div className="payment-method">
        <label className="method-option">
          <input
            type="radio"
            name="paymentMethod"
            value="credit"
            checked={method === "credit"}
            onChange={() => setMethod("credit")}
          />
          Credit Card
        </label>

        <label className="method-option">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={method === "cod"}
            onChange={() => setMethod("cod")}
          />
          Cash On Delivery
        </label>
      </div>

      {method === "credit" ? (
        <div className="card-form">
          <div className="form-group">
            <label>Card Number</label>
            <input type="text" placeholder="Enter Card Number" maxLength={19} />
          </div>

          <div className="form-row">
            <div className="form-group small">
              <label>Expiry Date</label>
              <input type="text" placeholder="MM/YY" maxLength={5} />
            </div>

            <div className="form-group small">
              <label>CVV</label>
              <input type="password" maxLength={4} />
            </div>
          </div>

          <div className="form-group">
            <label>Card Holder Name</label>
            <input type="text" placeholder="Card Holder Name" />
          </div>

          <button className="pay-btn">Pay Now</button>
        </div>
      ) : (
        <button className="pay-btn alt" onClick={placeOrder}>Place Order</button>
      )}
    </div>)
}

export default Payment
