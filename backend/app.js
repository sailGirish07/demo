const express = require('express');
require("dotenv").config();
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
// const User = require('./models/userModel');
const app = express();

//Connecte to DB
connectDB();

//Middlewares   
app.use(express.json());
app.use(
    cors({
        origin : "http://localhost:5173",
        credentials: true,
    })
)

//Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));

//Route Not Found
app.use((req, res) =>{
    res.status(400).json({message : "Route not found"});
});



// const user1 = new User({
//     email:"sail@gmail.com",
//     userName:"Giru",
//     password:"abcd"
// });

// user1.save()
// .then((res) => {
//     console.log(res)
// })
// .catch((err) => {
//     console.log(err);
// })


//Start Server
const port = process.env.PORT
app.listen(port, () => {
    console.log(`App started, listening on port ${port}`);
});