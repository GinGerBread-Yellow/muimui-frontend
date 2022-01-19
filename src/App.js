// import logo from './logo.svg';
import './App.css';
import { useEffect, useState} from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
// import Post from './containers/Post'
import Login from './containers/Login'
// import UserInterface from './containers/UserInterface';
// import SignUp from './containers/SignUp';
// import {PrivateRoute} from './components/PrivateRoute';
import CarApp from './containers/CarApp';
import SignUp from './containers/SignUp';
import { getUserName } from './axios/axios';

function App() {
  const [isLoading, setLoading] = useState(false);
  // const {username, isAuth, login, logout, autoLogin} = useAuth();
  // useEffect(() => {
    // do read cache here
  //   setLoading(true)
  //   if (!username) {
  //     console.log("Welcome to Mui Mui");
  //     console.log("try login automatically...");
  //     autoLogin();
  //   }
  //   setLoading(false)
  // }, []);

  // if (isLoading) {
  //   return <div><p>is loading...</p></div>;
  // }

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