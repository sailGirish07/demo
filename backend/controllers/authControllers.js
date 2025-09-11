const User = require('../models/userModel');
const jwt = require("jsonwebtoken");

exports.signup = async(req, res) => {
    try{
    const {email, userName, password} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser)
        return res.status(400).json({error: "Email already registered"});

    const user = new User({email, userName, password})
    await user.save();

    res.json({message: "Signup successfull, Please login"})
}catch(err){
    res.status(500).json({error: "Signup failed"});
}
}

exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message : "Invalide Credentials"});

        const isMatch = await user.comparePassword(password)
        if(!isMatch) return res.status(400).json({message: "Invalide Credentials"});

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn : "1h",
        });
        res.json({message: "Login Successfull", token});
    }catch(err){
        res.status(500).json({error: "Login Failed"});
    }
}

exports.forgotPassword = async(req, res) => {
    try{
        const {email, newPassword} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message : "User not found"});

        user.password = newPassword;
        await user.save();

        res.json({message : "Password reset successfully"});
    }catch(err){
        res.status(500).json({error : "Server error"});
    }
};