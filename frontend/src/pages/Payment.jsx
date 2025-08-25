import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import "./CSS/Payment.css" ;
import BillingDetails from "../components/BillingDetails/BillingDetails";


const Payment = () => {
    const { selectedAddress, selectedDelivery } = useContext(ShopContext);
    return (
        <div>
            <div className="address-section">
                {selectedAddress === null ? (
                    <p><b>Please Choose Address First</b></p>
                ) : (
                    <div className="address-content">
                        <p><b>Name:</b>{selectedAddress.fullName}</p>
                        <p><b>Address:</b>{selectedAddress.address}</p>
                        <p><b>Mobile No.:</b>{selectedAddress.phone}</p>
                        <p><b>Place:</b>{selectedAddress.country},{selectedAddress.city}</p>
                        <p><b>Shipping Method :</b>{selectedDelivery.name}</p>
                    </div>

                )}
            </div>
            <div className="billing-section">
                <BillingDetails location="shipping" shippingFee={selectedDelivery.price} />
            </div>
        </div>
    )
}

export default Payment
