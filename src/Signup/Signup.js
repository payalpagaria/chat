import { Box, Button, Card, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import './Signup.css'
const Signup = ({user,setUser}) => {
    const navigate=useNavigate()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [name,setName]=useState()
    const handleSubmit=async()=>{
        const payload={
            UserName:name,
            Email:email,
            Password:password
        }
        try {
            const response = await axios.post('http://localhost:8000/signup', payload, {
              headers: { 'Content-Type': 'application/json' }
            });
            console.log('Response:', response.data);
          
            setUser(response.data)
            navigate('/')
          } catch (error) {
            if (error.response) {
              console.error('Server error:', error.response.status, error.response.data);
            } else if (error.request) {
              console.error('Network error:', error.request);
            } else {
              console.error('Error:', error.message);
            }
          }
         
    }
    const handleName=(e)=>{
        let input=e.target.value
        setName(input)
    }
    const handleEmail=(e)=>{
        e.preventDefault()
        let input=e.target.value
        setEmail(input)
    }
    const handlePassword=(e)=>{
        e.preventDefault()
        let input=e.target.value
        setPassword(input)
    }
  
      
    return (
        <>
            <Box className='Signup-card-outline-container'>

                <Card className='Signup-card-outline'>
                    <Typography variant='h5'>Sign Up</Typography>
                    <Box className='textfield-style-box'>
                        <Typography>UserName</Typography>
                        <TextField 
                            type='email' 
                            placeholder='Please Enter username' 
                            className='textfield-style'
                            onChange={handleName}
                        >

                            </TextField>
                    </Box>
                    <Box className='textfield-style-box'>
                        <Typography>Email</Typography>
                        <TextField 
                            type='email' 
                            placeholder='Please Enter Email' 
                            className='textfield-style'
                            onChange={handleEmail}
                        >

                            </TextField>
                    </Box>
                    <Box className='textfield-style-box'>

                        <Typography>Password</Typography>
                        <TextField 
                            type='password' 
                            placeholder='Please Enter password' 
                            className='textfield-style' 
                            onChange={handlePassword}

                        >

                            </TextField>
                    </Box>

                    <Button 
                        variant="contained" 
                        className='submit-btn'
                        onClick={handleSubmit}
                    >
                    Submit
                    </Button>
                </Card>
            </Box>
        </>
    )
}
export default Signup