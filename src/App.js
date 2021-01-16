import React from 'react';
import { useSelector } from 'react-redux';

import './App.css';
import Login from './features/pages/auth/Login';
import Appp from './features/App';
import { selectLoggedIn } from './features/pages/auth/authSlice';

function App() {
  const loggedIn = useSelector(selectLoggedIn);
  
  return (
    <div className="App">
      {true ? <Appp /> : <Login />}
    </div>
  );
}

export default App;
