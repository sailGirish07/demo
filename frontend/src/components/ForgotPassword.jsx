import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(){
        const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email : "",
        newPassword : "",
        confirmPass: ""
     });

    const handleInpChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.newPassword !== formData.confirmPass){
            alert("Password do not match");
            return
        }
        try{
             const res = await axios.post("http://localhost:3000/api/v1/auth/forgot-pass",{
                email : formData.email,
                newPassword : formData.newPassword
        });
        console.log("Password Reset Successfully", res.data);

        setFormData({
             email : "",
        userName : "",
        newPassword : "",
        confirmPass : "",
        })
        navigate('/login');
        }catch(err){
            console.error("Password reset failed", err)
        }
     }

    return(
        <div>   
            <h3>Create a new Password</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email : </label><br/>
                <input type="email" placeholder="Enter Email" onChange={handleInpChange} value={formData.email} required name="email"/><br/><br/>
                <label htmlFor="password">Password</label><br/>
                <input type="password" placeholder="Enter Password" onChange={handleInpChange} value={formData.newPassword} required name="newPassword"/><br/><br/>
                <label htmlFor="confirm-pass">Confirm Password</label><br/>
                <input type="password" placeholder="Confirm Password" onChange={handleInpChange} value={formData.confirmPass} required name="confirmPass"/><br/><br/>
                <button>Reset Password</button>
            </form>
        </div>
        );
}