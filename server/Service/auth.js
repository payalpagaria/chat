const jwt=require("jsonwebtoken")
const dotenv = require('dotenv');
dotenv.config();
const secretKey =123456;
console
function setUser(user){
    
    return jwt.sign({
        id:user.id,
        Email:user.Email
    },secretKey,{expiresIn:300000})
}

const getUser = (req, res, next) => {
    const { authorization } = req.headers;
    console.log("auth",req.headers)

    if (!authorization) return res.status(401).json({ error: 'Unauthorized' });
    
    const token = authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
  
      req.user = decoded;
  
      next();
    } catch (error) {
      console.error('Error verifying JWT token:', error);
  
      let errorMessage = 'Unauthorized';
      if (error.name === 'JsonWebTokenError') {
        errorMessage = 'Invalid token';
      } else if (error.name === 'TokenExpiredError') {
        errorMessage = 'Token expired';
      }
      return res.status(401).json({ error: errorMessage });
    }
  };
  
module.exports={setUser,getUser}