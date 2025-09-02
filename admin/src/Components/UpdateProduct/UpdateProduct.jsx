import React, { useEffect, useState } from 'react';
import "./UpdateProduct.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";


const UpdateProduct = () => {
        const [image, setImage] = useState(false);
            const [productDetails, setProductDetails] = useState({
                name: "",
                image: "",
                category: "",
                new_price: "",
                old_price: "",
                quantity: "",
            });
        const {id} = useParams() ;
        const navigate = useNavigate() ;

        useEffect(()=>{
            axios.get(`http://localhost:4000/updateproduct/${id}`)
            .then((res)=>{
                setProductDetails({
                    name:res.data.name ,
                    image:res.data.image,
                    category:res.data.category,
                    new_price:res.data.new_price,
                    old_price:res.data.old_price,
                    quantity:res.data.quantity,
                })
            }).catch((err)=>{
                console.log("Error to get product",err)
            })
        },[id])

            const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

        const changeHandler = (e) => {
        setProductDetails({
            ...productDetails,
            [e.target.name]: e.target.value,
        })
    };

const updateSubmit = async () => {
  try {
    let responseData;
    let product = { ...productDetails };

    if (image) {
      let formData = new FormData();
      formData.append("product", image);

      const uploadRes = await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      responseData = await uploadRes.json();

      if (responseData.success) {
        product.image = responseData.image_url;
      }
    }

    const res = await axios.put(
      `http://localhost:4000/updategetproduct/${id}`,
      product
    );

    if (res.status === 200) {
      alert("Product Updated");
      navigate("/listproduct");
    } else {
      alert("Update failed");
    }
  } catch (err) {
    console.error("Error updating product", err);
    alert("Something went wrong!");
  }
};



    
    return (

        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input type='text' value={productDetails.name} onChange={changeHandler}  name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct itemfield">
                    <p>Price</p>
                    <input type='text' value={productDetails.old_price} onChange={changeHandler}  name="old_price" placeholder='Type here' />
                </div>
                <div className="addproduct itemfield">
                    <p> Offer Price</p>
                    <input type='text' value={productDetails.new_price} onChange={changeHandler}  name="new_price" placeholder='Type here' />
                </div>
            </div>
            <div className='product-quantity'>
                <p>Quantity</p>
                <input type="number" value={productDetails.quantity} onChange={changeHandler}  name="quantity" placeholder='Set Quantity' />
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select name='category' value={productDetails.category}  onChange={changeHandler} className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input" className="cursor-pointer">
                    {image ? (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Uploaded preview"
                            className="w-32 h-32 object-cover rounded-lg shadow"
                        />
                    ) : (
                        <FaCloudUploadAlt
                            size={32}
                            color="#1976d2"
                            className="addproduct-thumnail-img"
                        />
                    )}
                </label>
                <input
                    type="file"
                    onChange={imageHandler}
                    name="image"
                    id="file-input"
                    hidden
                />
            </div>
            <button onClick={()=> updateSubmit()} className='addproduct-btn'>UPDATE</button>
        </div>


    )
}

export default UpdateProduct;
