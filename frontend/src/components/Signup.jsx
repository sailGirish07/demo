import React,{useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

export default function Signup(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email : "",
        userName : "",
        password : ""
     });

    const handleInpChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
             const res = await axios.post("http://localhost:3000/api/v1/auth/signup", formData);
        alert(res.data.message);
        setFormData({
             email : "",
        userName : "",
        password : ""  
        })
        navigate('/login');
        }catch(err){
            console.error("Signup failed", err)
        }
        console.log("Form Submitted", formData);
        }

    return(
        <div>
            <h2>Create an account </h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email : </label><br/>
                <input type="email" placeholder="Enter Email" onChange={handleInpChange} value={formData.email} required name="email"/><br/><br/>
                <label htmlFor="username">User Name :</label><br/>
                <input type="text" placeholder="Enter User name" onChange={handleInpChange} value={formData.userName} required name="userName"/><br/><br/>
                <label htmlFor="password">Password</label><br/>
                <input type="password" placeholder="Enter Password" onChange={handleInpChange} value={formData.password} required name="password"/><br/><br/>
                <button>Signup</button><br/><br/>
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    )
}