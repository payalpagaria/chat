const {mongoose}=require('mongoose')
const userSchema=new mongoose.Schema({
    UserName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    }
},{timestamps:true})
const user=mongoose.model('user',userSchema)
module.exports={user}