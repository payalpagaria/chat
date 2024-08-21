const mongoose=require('mongoose')
const ChatSchema=new mongoose.Schema({
    members:{
        type:Array
    }
},{timestamps:true})
const chatModel=mongoose.model('members',ChatSchema)
module.exports=chatModel