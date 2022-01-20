// import logo from './logo.svg';
import './App.css';
import { useEffect, useState} from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './containers/Login'
import CarApp from './containers/CarApp';
import SignUp from './containers/SignUp';
// import env from 'dotenv';

// require('dotenv').config()

function App() {

  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route 
            path="/" element={<CarApp />} 
            />
          <Route
            path="*"
            element={<Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
  
}

export default App;