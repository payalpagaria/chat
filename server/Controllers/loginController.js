const {user} =require('../model/user')
const {setUser, getUser}=require('../Service/auth')
const handleLogin = async (req, res) => {
    const { Email, Password } = req.body;
    try {
      const User = await user.findOne({ Email, Password });
      const token = setUser(User);
      const UserNew = {
        ...User,
        Token: token
      };
        res.status(200).json(UserNew);
      return res;
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
const hanglesignup=async(req,res)=>{
    try {
     const User=await user.create(req.body)
     res.status(200).json(User)
    
     
    } catch (error) {
     res.status(500).json(error.message)
 
    }
}
module.exports={handleLogin,hanglesignup}