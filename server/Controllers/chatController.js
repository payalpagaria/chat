const chatModel =require('../model/chatModel')
const createChat=async(req,res)=>{
  
    try {
        const newChat= await chatModel.create({
            members:[req.params.senderId,req.params.receiverId]
        })
        res.status(200).json(newChat)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}
const userChat=async(req,res)=>{
    try {
        const chat= await chatModel.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)

    }
}
const findChat=async(req,res)=>{
    try {
        const chat= await chatModel.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]}
        })
        res.status(200).json(chat)

    } catch (error) {
        res.status(500).json(error)

    } 
}
module.exports={createChat,userChat,findChat}