import React, { useEffect, useState } from 'react';
import "./ListProduct.css";
import cross_icon from "../../assets/cart_cross_icon.png";
import { Link } from 'react-router-dom';
import { FaSyncAlt } from "react-icons/fa";

const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts").then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      })
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    });
    await fetchInfo();
  };

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Quantity</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return <><div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p style={{ color: product.quantity > 0 ? "#149911" : "#FF331F" }}>{product.quantity}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <Link to={`/updateproduct/${product._id}`}>  <FaSyncAlt
              size={20}  className="listproduct-edit-icon"
            /></Link>
            <img src={cross_icon} onClick={() => remove_product(product.id)} alt="cross icon " className="listproduct-remove-icon" />
          </div>
            <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct
