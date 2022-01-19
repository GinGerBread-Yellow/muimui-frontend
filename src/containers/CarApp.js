import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import CircularProgress from '@mui/material/CircularProgress';


import { mainListItems, secondaryListItems } from '../components/listItems';
import Chart from '../components/Chart';
import Deposits from '../components/Deposits';
import Orders from '../components/Orders';
import Copyright from '../components/Copyright';
import CopyText from '../components/CopyText';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';


import { useNavigate } from 'react-router';
import { axiosGetCars, axiosBookCar, getUserName, logout } from '../axios/axios';
import CarForm from '../components/CarForm';
import Title from '../components/Title';
const drawerWidth = 240;


/** 
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
*/

const myrows = [
  create("03392", "Jetson Nano", "m"),
  create("30224", "mui mui", "a"),
  create("49492", "Jetson Nano3", "a"),
  create("49494", "Jetson Nano2", "m"),
  create("22034", "Jetson Nano4", "r"),
];


function create(id, type, st) {
  return {carID:id, type:type, status:st};
}


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [username, setUsername] = React.useState(null);
  const [cars, setCars] = React.useState([]);
  const [alertMsg, setAlert] = React.useState({status:"", message:""});
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("");

  
  const navigate = useNavigate();

  const bookCar = async (carID, duration) => {
    /**
     * carID: string, 
     * duration: int(in second)
    */
    // open effect
    setLoading(true);
    
    const {status, data} = await axiosBookCar({carID, duration});
    setLoading(false);
    if (status === 'success') {
      // data = sdp
      setText(data);
      console.log(data);
    } else  {
      console.log(data);
      handleException(data);
    }

    return;

  }

  const handleException = (e) => {
    console.log("err", e)
    if (e.code === 'token_not_valid') {
      setAlert({status: "error", message: "Please Login Again!"});
      console.log("log out");
      userLogout();
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({status:"", message:""});
  };

  const getCars = async () => {
    const {status, data} = await axiosGetCars();
    if (status === 'success') {
      setCars(data);
    } else if (status === 'error') {
      handleException(data);
    } else {
      setCars([]);
    }

  }

  const userLogout = () => {
      setUsername(null);
      logout();
      navigate('/login');
  }

  React.useEffect( async ()=> {
    let name = getUserName();
    if (!name) {
      console.log("not login");
      setAlert({status: "info", message: "Login first!"})
      navigate('/login');
    }
    setUsername(name)
    // ask avail car here
    // await getCars();
    setCars(myrows);
  },[])

  // React.useEffect( ()=> {
  //   console.log(alertMsg);
  // }, [alertMsg]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" color='primary' open={open} >
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            // onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Mui Mui Reservation System
          </Typography>
          
          <Typography
            component="h4"
            variant="h6"
            color="white"
            noWrap
            sx= {{mr: 3,}}
          >
              {username? username: "Anonymous"}
          </Typography>
          <IconButton 
            color="inherit"
            onClick={userLogout}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}> 
              { text.length>0 && ( 
                <Grid item xs={12} >
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      // height: 240,
                    }}
                  >
                    <Title>
                      Your token
                    </Title>
                    {loading && (
                      <CircularProgress color='inherit' />
                    )}
                    <CopyText text={text} />
                  </Paper>
                </Grid>
              )}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    // height: 240,
                  }}
                >
                  
                  <Orders 
                    cars={cars}
                  />
                  {/* <CopyText text="Hello Worldekmfojoijoieno;;ojoij;olin;oine;onooiho;n;knjijoinoinooijoijoijo"/> */}
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    // height: 240,
                  }}
                >
                  <CarForm cars={cars} onSubmit={bookCar}/>
                  {/* <Deposits /> */}
                </Paper>
              </Grid>
              {/* Recent Orders */}
              {/* <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  I don't know
                </Paper>
              </Grid> */}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
      
      <Snackbar open={alertMsg.status !== ""} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertMsg.status || "success"} sx={{ width: '100%' }}>
          {alertMsg.message}
        </Alert>
      </Snackbar>
      

    </ThemeProvider>
  );
}

export default function CarApp() {
  return <DashboardContent />;
}