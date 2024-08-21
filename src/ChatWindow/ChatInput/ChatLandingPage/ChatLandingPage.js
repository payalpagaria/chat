import {Paper,Typography} from '@mui/material'
import './ChatLandingPage.css'
const ChatLandingPage=()=>{
    return(<>
          <Paper elevation={3} className="landing-page-container">
            <Typography variant="h4" gutterBottom>Welcome to Chat</Typography>
            <Typography variant="subtitle1" gutterBottom>Select any chat to get started</Typography>
        </Paper>
    </>
    )
}
export default ChatLandingPage;