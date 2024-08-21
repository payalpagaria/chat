const express = require('express');
const {getUser}=require('../Service/auth')
const { createChat, userChat, findChat } = require('../Controllers/chatController');
const router = express.Router();
router.post('/',createChat)
router.get('/:userId',userChat)
router.get('/find/:firstId/:secondId',findChat)
module.exports=router