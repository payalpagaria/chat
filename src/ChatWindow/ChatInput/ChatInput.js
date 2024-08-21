import { Button, TextField, Box, Typography, Card } from "@mui/material"
import './ChatInput.css'
import { useState, useEffect, useRef } from "react"
import ChatLandingPage from "./ChatLandingPage/ChatLandingPage"
import axios from "axios"
import io from 'socket.io-client'

const ChatInput = ({selected,Messages, setMessages,user,chatId,receiverId,}) => {
    const [currentMessage, setCurrentMessage] = useState('');
    const messagesEndRef = useRef(null);
    const socket=useRef()
    const [onlineUser,setOnlineUser]=useState([])
    const [sendMessage,setSendMessage]=useState(null)
    let [receivemessage,setReceiveMessage]=useState()
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    useEffect(()=>scrollToBottom, []);
    useEffect(()=>{
        if(sendMessage){
            socket.current.emit("send-message",sendMessage)
        }
    },[sendMessage])
   

    useEffect(() => {
        const getChat = async (chatId) => {
          const token = localStorage.getItem('token');  // Retrieve token from secure storage
            console.log("rfwrf",token)
          if (!token) {
            console.error('Missing JWT token');
            return; 
          }
      
          try {
            // const authBearer = {
            //     Authorization: `Bearer ${token}`
            //   };

            //   const headers = {
            //     headers : authBearer
            //   }
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
              const response = await axios.get(`http://localhost:8000/message/${chatId}`, {headers:{
                Authorization: `Bearer ${token}`
              }});
                    console.log(response.data);
            setMessages(response.data);
          } catch (error) {
            console.error('Error fetching messages:', error);
            // Handle errors appropriately (e.g., display user-friendly messages)
          }
        };
      
        if (chatId) {
          getChat(chatId);
        }
      
        // Initialize socket connection
        socket.current = io("http://localhost:8080");
      
        socket.current.emit('new-user', user?._id);
      
        socket.current.on('get-users', (user) => {
          setOnlineUser(user);
        });
      
        // Dependency array: Only runs when `socket` changes (avoids unnecessary re-renders)
      }, [socket]);
      
    useEffect(()=>{
     
        socket.current.on('receive-message',(val)=>{
            if(val){
                console.log("here", Messages)
                setMessages((prev)=>[...prev,val])
            }
        })
    
},[receivemessage])
    const handleChange = (e) => {
        setCurrentMessage(e.target.value);
    }

    const handleSubmit = async() => {
        if (currentMessage.trim()) {
            const payload={
                chatId: chatId,
                senderId:user?._id,
                receiverId:receiverId,
                text:currentMessage
            }
            try {
                const response=await axios.post("http://localhost:8000/message",payload, {
                    headers: { 'Content-Type': 'application/json' }
                  });
                  setMessages(prevMessages => [...prevMessages, response.data]);
                  setCurrentMessage('');
           
            } catch (error) {
                console.log(error)
            }
           setSendMessage(payload)
        
        }
    }
   

    return (
        selected?
        
        <Box className='outer-input-box-container'>
            <Box className='message-container' style={{ overflow: 'auto', maxHeight: '80vh', width: '45vw' ,paddingTop:'1em'}}>
                {Messages?.map((element, index) => (
                    <Card
                     key={index}
                     className={user?._id===element?.senderId?'card-style-right':'card-style-left'}
                     >
                        <Typography>{element?.text}</Typography>
                        
                    </Card>
                ))}
            
          
                <div ref={messagesEndRef} />
            </Box>
            <Box className='outer-input-box'>
                <TextField type="text" value={currentMessage} onChange={handleChange} />
                <Button onClick={handleSubmit}>Submit</Button>
            </Box>
        </Box>
        :<ChatLandingPage/>
    )
}

export default ChatInput
