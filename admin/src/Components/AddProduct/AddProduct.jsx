import React, { useState } from 'react';
import "./AddProduct.css";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:"",
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e)=>{
        setProductDetails({...productDetails,
            [e.target.name]: e.target.value ,
        })
    };

    const addProduct = async()=>{
        console.log(productDetails);
        let responseData;
        let product = productDetails ;

        let formData = new FormData() ;
        formData.append('product',image);

        await fetch('http://localhost:4000/upload',{
            method : 'POST',
            headers:{
                Accept: 'application/json',
            },
            body:formData
        }).then((res)=> res.json()).then((data)=>{responseData = data});

        if(responseData.success){
            product.image = responseData.image_url ;
            console.log(product);
            await fetch('http://localhost:4000/addproduct',{
                method:"POST",
                headers:{
                    Accept:'application/json',
                    'Content-Type' : 'application/json',
                },
                body:JSON.stringify(product),
            }).then((res)=> res.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Product added failed")
            })
        }
    };

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input type='text' value={productDetails.name} onChange={changeHandler} name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct itemfield">
                    <p>Price</p>
                    <input type='text' value={productDetails.old_price} onChange={changeHandler} name="old_price" placeholder='Type here' />
                </div>
                <div className="addproduct itemfield">
                    <p> Offer Price</p>
                    <input type='text' value={productDetails.new_price} onChange={changeHandler} name="new_price" placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select name='category' value={productDetails.category} onChange={changeHandler} className='add-product-selector'>
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
            <button onClick={()=>addProduct()} className='addproduct-btn'>ADD</button>
        </div>
    )
}

export default AddProduct
