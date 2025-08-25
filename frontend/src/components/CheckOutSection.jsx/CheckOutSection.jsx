import React, { useContext, useEffect, useState } from 'react';
import BillingDetails from '../BillingDetails/BillingDetails';
import "./CheckOutSection.css";
import ShippingForm from '../ShippingForm/ShippingForm';
import { ShopContext } from '../../contexts/ShopContext';

const CheckOutSection = () => {
  const {setSelectedDelivery, selectedDelivery,addressData,setSelectedAddress,selectedAddress,deliveryOptions } = useContext(ShopContext);
  const [openForm, setOpenForm] = useState(false);


  return (
    <div className='main-container'>
      <h3>Delivery To</h3>
      <div className="section-container">

        <div className="left-section">
          <div
            className="address add-address"
            onClick={() => {
              setOpenForm(true);
              window.scrollTo({ top: 60, behavior: "smooth" });
            }}
          >
            <span>+</span>
            <span>Add Address</span>
          </div>

          {addressData.map((addr) => (
            <div key={addr.id} className="address-card">
              <h4 className="address-name">{addr.name}</h4>
              <p className="address-text">{addr.address}</p>
              <p className="address-text">{addr.city}</p>
              <p className="address-phone"><b>Phone:</b> {addr.phone}</p>
              <button className="deliver-btn" onClick={()=> setSelectedAddress(addr)} disabled={selectedAddress === addr}>{selectedAddress === addr ? "Selected":"Delivere Here"}</button>
            </div>
          ))}

          <div className="delivery-section">
            <h4>Select Delivery Option</h4>
            {deliveryOptions.map((option) => (
              <label key={option.id} className="delivery-option">
                <input
                  type="radio"
                  name="delivery"
                  value={option.id}
                  checked={selectedDelivery.id === option.id}
                  onChange={() => setSelectedDelivery(option)}
                />
                {option.name} {option.price > 0 && `(+ $${option.price})`}
              </label>
            ))}
          </div>
        </div>

        <div className="right-section">
          <BillingDetails 
            path="payment" 
            location="payment" 
            shippingFee={selectedDelivery.price} 
          />
        </div>
      </div>

      {openForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ShippingForm close={setOpenForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOutSection;
