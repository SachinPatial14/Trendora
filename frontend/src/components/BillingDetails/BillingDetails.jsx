import React, { useContext } from "react";
import { ShopContext } from "../../contexts/ShopContext";
import "./BillingDetails.css";
import { Link } from "react-router-dom";

const BillingDetails = (props) => {
    const { getTotalAmount } = useContext(ShopContext);
    const subtotal = getTotalAmount();
    const shipping = props.shippingFee || 0;
    const total = subtotal + shipping;

    return (
        <div className="billingitem-total">
            <h1>Cart Totals</h1>
            <div>
                <div className="billingitems-total-item">
                    <p>SubTotal</p>
                    <p>${subtotal}</p>
                </div>
                <hr />
                <div className="billingitems-total-item">
                    <p>Shipping Fee</p>
                    <p>{shipping === 0 ? "Free" : `$${shipping}`}</p>
                </div>
                <hr />
                <div className="billingitems-total-item">
                    <h3>Total</h3>
                    <h3>${total}</h3>
                </div>
            </div>
            <Link to={`/${props.path}`}>
              <button>PROCEED TO {props.location === "checkout" ? "CHECKOUT" : "PAYMENT"}</button>
            </Link>
        </div>
    )
};

export default BillingDetails;
