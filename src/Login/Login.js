import { Box, Button, Card, Link, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'
const Login = (user,setUser) => {
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    let[data,setData]=useState()
    const navigate=useNavigate()
    const handleNavigate=()=>{
        navigate('/signup')
    }
    const handleSubmit=async()=>{
        const payload={
            Email:email,
            Password:password
        }
        try {
            const response = await axios.post('http://localhost:8000/Login', payload, {
              headers: { 'Content-Type': 'application/json' }
            });
            console.log('Response:', response);
            data=response?.data?._doc
            localStorage.setItem('token',response?.data?.Token)
          } catch (error) {
            if (error.response) {
              console.error('Server error:', error.response.status, error.response.data);
            } else if (error.request) {
              console.error('Network error:', error.request);
            } else {
              console.error('Error:', error.message);
            }
          }
          console.log("data:",data)
          navigate('/ChatWindow',{state:data})

        

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
                    <Typography variant='h5'>Login</Typography>
                   
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
                    <Typography>Don't Have an account? <Link onClick={handleNavigate}>Sign up</Link></Typography>
                </Card>
            </Box>
        </>
    )
}
export default Login