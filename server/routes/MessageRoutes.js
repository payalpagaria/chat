const express=require('express')
const {getUser}=require('../Service/auth')
const router=express.Router()
const {addMessages,getMessages} = require('../Controllers/messageController')
router.post('/',addMessages)
router.get('/:chatId',getUser,getMessages)

module.exports=router