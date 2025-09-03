import React, { useEffect, useState } from 'react';
import "./Customer.css";
import { FaEye } from 'react-icons/fa';

const Customer = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [view, setView] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const fetchAllUsers = async () => {
        await fetch("http://localhost:4000/allusers")
            .then((res) => res.json())
            .then((data) => {
                setAllUsers(data)
            });
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className="customer-page">
            <div className="customer-container">
                <h1 className="customer-title">Customer Details</h1>

                <div className="customer-header">
                    <p>User Id</p>
                    <p>Name</p>
                    <p>E-mail</p>
                    <p>Addresses</p>
                    <p>Action</p>
                </div>

                <div className="customer-list">
                    <hr />
                    {allUsers.map((customer, index) => (
                        <React.Fragment key={customer._id}>
                            <div className="customer-row">
                                <p>{String(customer._id).slice(-4)}</p>
                                <p>{customer.name}</p>
                                <p>{customer.email}</p>
                                {customer.addresses.length === 0 ? (
                                    <p>No addresses</p>
                                ) : (
                                    customer.addresses.map((adr) => (
                                        <p>{adr.street}</p>
                                    ))
                                )}
                                <p className="customer-action">
                                    <FaEye onClick={() => {
                                        setOpenModal(true);
                                        setView(customer)
                                    }} className="eye-icon" size={20} />
                                </p>
                            </div>
                            <hr />
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* view modal */}

            {openModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setOpenModal(false)}>×</button>

                        <h2>User Details</h2>
                        <p><span>Name:</span> {view.name}</p>
                        <p><span>Email:</span> {view.email}</p>

                        <h3>Addresses:</h3>
                        {view.addresses.length === 0 ? (
                            <p><span>No addresses</span></p>
                        ) : (
                            view.addresses.map((adr, index) => (
                                <div key={index} className="address-box">
                                    <p><span>Street:</span> {adr.street}</p>
                                    <p><span>State:</span> {adr.state}</p>
                                    <p><span>City:</span> {adr.city}</p>
                                    <p><span>Country:</span> {adr.country}</p>
                                    <p><span>Postal Code:</span> {adr.postalCode}</p>
                                    <p><span>Phone:</span> {adr.phone}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Customer
