import { Avatar, Box, Typography,Card } from "@mui/material"
const Chat = ({name,setSelected,chatId,setChatId,handleFindChat,receiver_id}) => {
    const handleClick=()=>{
        handleFindChat(chatId,receiver_id)
        setSelected(true)
        
    }

    return (<>
    <Card onClick={handleClick}>
     <Box className='tabs'>
        <Avatar></Avatar>
    
        <Typography sx={{ alignSelf: 'center' }}>{name}</Typography>
    </Box>
    </Card>
    </>)
}
export default Chat