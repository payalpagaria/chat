const  express = require('express');
const {handleLogin,hanglesignup}=require('../Controllers/loginController')
const router = express.Router();
router.post('/login',handleLogin)
router.post('/signup',hanglesignup)

module.exports=router