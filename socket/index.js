
const io=require('socket.io')(8080,{
    cors:{
        origin:['http://localhost:3000']}
})
let activeUser=[]
io.on("connection",(socket)=>{
    socket.on('new-user',(newUserId)=>{
        console.log('user',newUserId)
    if(!activeUser.some((user)=>user.userId===newUserId)){
        activeUser.push({
            userId:newUserId,
            socketId:socket.id
        })
    }
    console.log("user connected",activeUser)
    io.emit('get-users',activeUser)
    })
    socket.on('send-message',(data)=>{
        
            const { receiverId } = data;
            const user = activeUser.find((user) => user.userId === receiverId);
            console.log("sending from socket to: ", receiverId);
            console.log("Data", data);
            if (user) {
                socket.to(user).emit('receive-message', data);
            }
      
    })
    socket.emit("receive-message",)
    socket.on("disconnect",()=>{
        activeUser=activeUser.filter((user)=>user.socketId!==socket.id)
        console.log("user disconnected",activeUser)
        io.emit('get-users',activeUser)

    })
})