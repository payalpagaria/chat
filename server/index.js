const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app= express()

app.use(cookieParser());

const {user} =require('./model/user')
const {mongoose}=require('mongoose')

const chatRoute=require('./routes/ChatRoutes')
const messageRoute=require('./routes/MessageRoutes')
const loginRoute=require('./routes/Login')
mongoose.connect('connection string')
.then(()=>{console.log('Mongoose is connected!!')})
.catch(err=>console.log("Mongoose Error",err))
app.use(express.json())
app.use(cors())
app.use('/chat',chatRoute)
app.use('/message',messageRoute)
app.use('/',loginRoute)
app.get('/users',async(req,res)=>{
    try {
        const users=await user.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error.message)

    }
})
app.listen('8000',()=>{
    console.log("Server started on the port 8000")
})