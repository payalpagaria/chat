const MessageModel =require('../model/MessageModel')

const addMessages=async(req,res)=>{
    try {
        const message=await MessageModel.create({
            chatId: req.body.chatId,
            senderId:req.body.senderId,
            receiverId:req.body.receiverId,
            text:req.body.text
        })
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)

    }
}
const getMessages=async(req,res)=>{
    const chatId=req.params.chatId
    try {
        const response=await MessageModel.find({chatId})
        
        res.status(200).json(response)

    } catch (error) {
        res.status(500).json(error)

    }

}
module.exports={addMessages,getMessages}