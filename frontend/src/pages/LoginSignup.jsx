import React from "react";
import "./CSS/LoginSignup.css"
import { useState } from "react";

const LoginSignup = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    })

    const login = async () => {
        console.log("Login function executed");
        let responseData;
        await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((res) => res.json())
            .then((data) => {
                responseData = data
            });

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            localStorage.setItem('auth-user',JSON.stringify(responseData.user));
            window.alert('Congrats you are successfully logged in');
            window.location.replace("/")
            setFormData({
                username: "",
                password: "",
                email: "",
            })

        } else {
            window.alert(responseData.errors)
        }
    };

    const signUp = async () => {
        console.log("signup function is executed")
        let responseData;
        await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((res) => res.json())
            .then((data) => {
                responseData = data
            });

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.alert('Congrats you are successfully logged in');
            window.location.replace("/")
            setFormData({
                username: "",
                password: "",
                email: "",
            })

        } else {
            window.alert(responseData.errors)
        }
    };

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" ? <input type="text" name="username" value={formData.username} onChange={changeHandler} placeholder="Your Name" /> : <></>}
                    <input type="email" name="email" value={formData.email} onChange={changeHandler} placeholder="Email Address" />
                    <input type="password" name="password" value={formData.password} onChange={changeHandler} placeholder="Password" />
                </div>
                <button onClick={() => { state === "Login" ? login() : signUp() }}>Continue</button>
                {state === "Sign Up" ?
                    <p className="loginsignup-login">Already have an account? <span onClick={() => setState("Login")}>Login</span></p> :
                    <p className="loginsignup-login">Create an account? <span onClick={() => setState("Sign Up")}>Click here</span></p>
                }
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id="" />
                    <p>By continuing, i agree to the terms of use & privacy Policy.</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup;