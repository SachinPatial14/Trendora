import React, { useState, useEffect } from "react";
import "./Order.css";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

const Order = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [view, setView] = useState(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (view) {
      setStatus(view.orderStatus);
    }
  }, [view]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/getallorders");
      setAllUsers(res.data);
    } catch (err) {
      console.error("Error failed to fetch users");
    }
  };

  const handleOrderStatus = async()=>{
    try{
     await axios.put(`http://localhost:4000/updatestatus/${view._id}`,{
      status
     });
     alert("Order Status updated");
     fetchAllUsers();
     setOpen(false);
    }catch(err){
      console.error("Error to change order status",err)
    }
  }

  return (
    <div className="order-page">
      <h1>Customer Details</h1>

      {/* Table header */}
      <div className="order-header">
        <p>Order Id</p>
        <p>Order Date</p>
        <p>User Id</p>
        <p>Orders</p>
        <p>Status</p>
        <p>Action</p>
      </div>

      {/* Table body */}
      <div className="customer-list">
        {allUsers.length === 0 ? (
          <div className="no-orders">
            <p>No Orders Available</p>
          </div>
        ) : (
          allUsers.map((user) => (
            <div className="order-row" key={user._id}>
              <p className="order-id">{String(user._id).slice(-4)}</p>
              <p className="order-date">
                {new Date(user.orderDate).toLocaleDateString()}
              </p>
              <p className="user-id">{String(user.userId).slice(-4)}</p>

              {/* Orders grouped */}
              <div className="order-items">
                {user.orders.map((ord, idx) => (
                  <div key={idx} className="order-item">
                    <p>{ord.address.split(" ").slice(0, 2).join(" ")}..</p>
                    <p>{ord.orderType}</p>
                    <p>${ord.amount}</p>
                    <p>Qty: {ord.quantity}</p>
                  </div>
                ))}
              </div>

              <p className="order-status">{user.orderStatus}</p>
              <p className="action-icon">
                <FaEdit size={20} onClick={() => {
                  setView(user)
                  setOpen(true)
                }} />
              </p>
            </div>
          ))
        )}
      </div>

      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setOpen(false)}>×</button>
            <h2>Order Details</h2>
            <div className="modal-body">
              <p><span>Order ID:</span> {view._id}</p>
              <p><span>User ID:</span> {view.userId}</p>
              {/* since view.orders is an array, you might need map() here */}
              <p><span>Address:</span> {view.orders[0]?.address}</p>
              <p><span>Payment Method:</span> {view.orders[0]?.orderType}</p>
              <p><span>Quantity:</span> {view.orders[0]?.quantity}</p>
              <p><span>Amount:</span> ${view.orders[0]?.amount}</p>
            </div>
            <div className="modal-footer">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="status-dropdown"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button className="update-btn" onClick={handleOrderStatus}>Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
