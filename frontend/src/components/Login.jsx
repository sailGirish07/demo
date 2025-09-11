import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(){
        const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email : "",
        password : ""
     });

    const handleInpChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
             const res = await axios.post("http://localhost:3000/api/v1/auth/login", formData);
        alert(res.data.message);

        if(res.data.token){
            localStorage.setItem("token", res.data.token);
        }else{
            alert("Login failed: no token received");
            return;
        }

        setFormData({
             email : "",
        userName : "",
        password : ""  
        })
        navigate('/home');
        }catch(err){
            console.error("Signup failed", err)
        }
        console.log("Form Submitted", formData);
        }

    return(
        <div>
            <h2>Log in here...</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email : </label><br/>
                <input type="email" placeholder="Enter Email" onChange={handleInpChange} value={formData.email} required name="email"/><br/><br/>
                <label htmlFor="password">Password</label><br/>
                <input type="password" placeholder="Enter Password" onChange={handleInpChange} value={formData.password} required name="password"/><br/><br/>
                <button>Login</button><br/><br/>
                <a href="/forgot-pass">Forgot Password ?</a>
                <p>
                    New User ? <a href="/signup">Signup Now</a>
                </p>
            </form>
        </div>
    );
}