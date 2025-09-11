const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) =>{
    console.log("Headers Received", req.headers);

    const authHeader = req.headers.authorization;
    if(!authHeader)
        return res.status(401).json({message: "No token provided"});

    const token = authHeader.split(" ")[1];
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRETE);
      console.log("Decoded JWT", decoded);
      req.userId = decoded.userId;
      next();
    }catch(err){
        res.status(401).json({message : "Invalide Token"});
    }
};

module.exports = authMiddleware;