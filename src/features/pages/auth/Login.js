import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';

import { login as loginAction } from './authSlice';

const PASSWORD = 'andre';

export default function Login() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();
    if(password !== PASSWORD) return;

    dispatch(loginAction())
  };

  return (
    <header className="App-header">
      <form onSubmit={login}>
        <TextField
          size="small"
          label="Password"
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoFocus
        />
        
        <br/>

        <Button variant="outlined" color="primary" disabled={password !== PASSWORD} onClick={login}>
          Login
        </Button>
      </form>
    </header>
  );
}
