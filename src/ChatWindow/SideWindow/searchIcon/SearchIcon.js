import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
function SearchUsers({id,filterList,setMembers}) {
    const [selectedUser, setSelectedUser] = useState(null);
    const handleSubmit = async () => {
      if (selectedUser) {
        // members:[req.body.senderId,req.body.receiverId]
        const payload={
          senderId:id,
          receiverId:selectedUser?._id
        }
        try {
          const response=await axios.post(('http://localhost:8000/chat', payload, {
            headers: { 'Content-Type': 'application/json' }} ))
            console.log(response)
        } catch (error) {
          console.log(error)
        }
    
      } else {
        console.log('No user selected');
      }
    };
  
  return (
    <Autocomplete
    options={filterList}
    getOptionLabel={(option) => option?.UserName}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Search for friend"
        variant="outlined"
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
        }}
      />
    )}
    onChange={(event, value) => setSelectedUser(value)} 
    
  />
  );
}

export default SearchUsers;
