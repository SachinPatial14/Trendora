import React, { useContext, useState } from "react";
import "./ShippingForm.css";
import { ShopContext } from "../../contexts/ShopContext";

const ShippingForm = ({ close }) => {
    const { addAddress } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        id: "",
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,

            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAddres = {
            ...formData,
            id: Math.round(Math.random()*100),
        }
        addAddress(newAddres);
        setFormData({
            id: "",
            fullName: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
        });
        close(false);

    };

    return (
        <form className="shipping-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Shipping Information</h2>

            <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
            />


            <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
            />

            <textarea
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
                required
            />

            <div className="form-row">
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="state"
                    placeholder="State / Province"
                    value={formData.state}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-row">
                <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" className="btn-submit">
                Continue to Payment
            </button>
            <button type="button" className="btn-cancel" onClick={() => close(false)}>
                Cancel
            </button>
        </form>
    );
};

export default ShippingForm;
