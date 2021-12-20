import { useState, useEffect, useRef } from 'react'

// import './Login.css'
import { Navigate } from 'react-router-dom';

/*
const Login = ({id, login, history}) => {
    // const [form] = Form.useForm();
    // return <div>login page</div>

    // ===== some hooks for validating username and password ==== 
    // in Ant design, there are 3 status
    // status: success, warning, error
    // const history = useHistory();
    const [status, setStatus] = useState(null);
    const [userValid, setUsrVad] = useState(null);
    const [psdValid, setPsdVad] = useState(null);
    const [userMsg, setUsrMsg] = useState(null);
    const [psdMsg, setPsdMsg] = useState(null);
    
    // ==== some ref =======
    const userRef = useRef(null);
    const psdRef = useRef(null);

    // login as a normal user
    const logInNormal = async ({user,password}) => { 
        // console.log(user, password);      
        if (checkUserName(user) && checkPassWord(password)) {
            const result = await login({user,password});
            if (result === 'success') {
                // console.log("log in successfully, redirect to /");
                history.push("/");
            } else {
                setStatus('user');
                setUsrVad('error');
                setPsdVad('error');
                setUsrMsg(result);
                // form.resetFields();
                userRef.current.focus();
            }
        }
    }
    // return true if username is not empty
    const checkUserName = (user) => {
        if (!user) {
            setStatus('user')
            setUsrVad('error');
            setUsrMsg('User name should not be blank!!');
            userRef.current.focus(); 
            return false;           
        }
        setUsrVad(null)
        setUsrMsg(null)
        return true;

    }

    const onSignUp = () => {
        history.push("/register");
    }
    // return true if password is not empty
    const checkPassWord = (password) => {
        if (!password) {
            if(status==='psd') {
                setPsdVad('error')
                setPsdMsg('Password  should not be blank!!')
            } else {
                setStatus('psd')
                psdRef.current.focus();
            }
            return false;
        }
        setPsdVad(null)
        setPsdMsg(null)
        return true
    }
    // login as an Administrator

    // useEffect(()=>{
    //     if (userRef !== null && !id) { // && !id
    //         userRef.current.focus();
    //     }
    // }, [id]);
    
    // render Container
    // if (id) {
    //     // approach 1
    //     // console.log("has id, redirect to /")
    //     return <Navigate to="/" />;
    // }
    
    return(
        <div className="loginContainer">
            <div className="login-title">
                <h1>MuiMui</h1>
                <p> A system that helps you find cat </p>
            </div>
            <div className="login-main">
                <form 
                    form={form} 
                    name="normallogin" 
                    className="login-form"
                    onFinish={logInNormal} 
                    style={{marginTop: "10px"}}
                >
                    <div
                        name="user"
                        validateStatus={userValid}
                        help={userMsg}
                    >
                        <Input 
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="user"
                            ref={userRef}
                            onChange={(e)=>{
                                checkUserName(e.target.value)
                            }}
                        />
                    </div>
                    <div
                        name="password"
                        validateStatus={psdValid}
                        help={psdMsg}
                    >
                        <input
                            prefix={<LockOutlined className="site-form-item-icon"/>} 
                            placeholder="Password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            ref={psdRef} 
                            onChange={(e)=>{
                                checkPassWord(e.target.value)
                            }}
                        />
                    </div>  
                    <div >
                        <span className="register"><a 
                            onClick={onSignUp}
                        >Sign up here</a></span>
                        <button
                            type="primary"
                            htmlType="submit"
                            className="login-submit"
                        > Log in
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
    
    // return <div> login yeah</div>

}
*/

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/** 
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
*/

const theme = createTheme();

function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
export default SignIn;