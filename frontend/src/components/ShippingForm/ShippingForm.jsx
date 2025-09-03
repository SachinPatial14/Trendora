import React, { useContext, useState } from "react";
import "./ShippingForm.css";
import { ShopContext } from "../../contexts/ShopContext";
import axios from "axios";

const ShippingForm = ({ close }) => {
    const { loggedUser, setUserAddress } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        phone: "",
        street: "",
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put("http://localhost:4000/saveaddress", {
                _id: loggedUser._id,
                address: formData,
            });

            setUserAddress(res.data.addresses);

            setFormData({
                id: "",
                name: "",
                phone: "",
                street: "",
                city: "",
                state: "",
                postalCode: "",
                country: "",
            });

            close(false);
        } catch (err) {
            console.error("Error saving address", err);
            alert("Failed to save address");
        }
    };

    return (
        <form className="shipping-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Shipping Information</h2>

            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
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
                name="street"
                placeholder="Street Address"
                value={formData.street}
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
