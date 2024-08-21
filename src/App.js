import './App.css';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import ChatWindow from './ChatWindow/ChatWindow';
import {Routes,Route, BrowserRouter as Router} from 'react-router-dom'
import { useState } from 'react';
import { Typography } from '@mui/material';
function App() {
  const [user,setUser]=useState()
  return (
    <>
      <Router>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/signup" element={<Signup user={user} setUser={setUser}/>}/>
              <Route path="/" element={<Login user={user} setUser={setUser}/>}/>

              <Route path="/ChatWindow" element={<ChatWindow user={user} setUser={setUser}/>}/>

          </Routes>
      </Router>     
    </>
  );
}

export default App;
