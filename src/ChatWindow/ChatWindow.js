import { Paper,Box } from "@mui/material";
import './ChatWindow.css'
import SideWindow from "./SideWindow/SideWindow";
import ChatInput from "./ChatInput/ChatInput";
import { useLocation } from 'react-router-dom';
import { useEffect, useState ,useRef} from "react";
import axios from "axios";

const ChatWindow = ({user}) => {
    const [selected,setSelected]=useState(false)
    const [userList,setUserList]=useState()
    const[chatId,setChatId]=useState()
    const [receiverId,setReceiverId]=useState()
    let [Messages, setMessages] = useState()
    
    const location = useLocation();
    const data = location.state;

 
    const getAllmembers=async()=>{
        try {
            const UserList=await axios.get("http://localhost:8000/users");
            setUserList(UserList.data)
        } catch (error) {
            console.log(error)
        }            
    }
    useEffect(()=>{
            getAllmembers()
            
    },[])
    const handleFindChat=async(chatId,receiver_id)=>{
        setReceiverId(receiver_id)
        setChatId(chatId)
        try {
            const response = await axios.get(`http://localhost:8000/message/${chatId}`)
            console.log(response.data) 
            setMessages(response.data)
         } catch (error) {
            console.log(error)
        }
    }
   
    return (
        <>
            <Box sx={{height:'100vh',width:'100vw',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Paper className='chatWinodw-paper' elevation={2}>
                    <SideWindow user={user} data={data} userList={userList} setSelected={setSelected} setChatId={setChatId} handleFindChat={handleFindChat} />
                    <ChatInput selected={selected} setSelected={setSelected} setChatId={setChatId} chatId={chatId} Messages={Messages} setMessages={setMessages}  user={user?user:data} receiverId={receiverId} handleFindChat={handleFindChat}/>
                </Paper>
            </Box>
        </>
    )
}
export default ChatWindow;