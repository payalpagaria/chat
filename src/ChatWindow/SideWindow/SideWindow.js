import { Box, Paper, Typography, Link, Divider, Avatar } from "@mui/material"
import './SideWindow.css'
import Chat from "./Chat/Chat"
import axios from 'axios'
import { useEffect, useState } from "react"
import SearchIcon from '../SideWindow/searchIcon/SearchIcon'
const SideWindow = ({ user, data, userList, setSelected, setChatId, handleFindChat, setReceiverId }) => {
    const [chatMembers, setChatMembers] = useState()
    const [filterList, setFilterList] = useState()
    const elementsNotIncluded = [];

    const id = user ? user._id : data?._id
    const setMembers = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/chat/${user ? user?._id : data?._id}`)
            setChatMembers(response.data)

            userList?.forEach((element) => {
                let idFound = false;

                response?.data?.forEach((ele) => {
                    if (ele?.members?.includes(element?._id)) {
                        idFound = true;
                    }
                });

                if (!idFound) {
                    elementsNotIncluded.push(element);
                }
            });

            setFilterList(elementsNotIncluded)




        } catch (error) {
            console.log(error)

        }

    }
    useEffect(() => {
        setMembers()

    }, [])
    return (<>
        <Paper className='Sidewindow' elevation={2}>
            <Box className='sideheader'>
                <Typography>Joy Chat</Typography>
                <Box className='sideheader-v1'>
                    <Typography>{user ? user?.UserName : data?.UserName}</Typography>
                    <Link>Logout</Link>
                </Box>

            </Box>
            <Divider></Divider>
        <SearchIcon id={id} userList={userList} chatMembers={chatMembers} filterList={filterList} setMembers={setMembers} />

            <Box className='title-st' >
            </Box>
            <Box>
                {chatMembers?.map((element) => {
                    let memberId = element.members.find(uid => uid !== id); // Assuming userId is available in the scope
                    let name = userList?.find((ele) => ele?._id === memberId)
                    return (
                        <Chat name={name?.UserName} setSelected={setSelected} chatId={element?._id} setChatId={setChatId} handleFindChat={handleFindChat} receiver_id={memberId} />
                    )

                })}
            </Box>
        </Paper>
    </>)
}
export default SideWindow