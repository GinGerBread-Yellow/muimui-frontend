import { SettingsSuggestRounded } from '@mui/icons-material';
import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const setToken = (token) => {
    cookies.set('token', token, {
        path: '/',
        secure: true, // 只能在https傳cookie
        sameSite: true, // 禁止跨站傳cookie
        // httpOnly: true, // 禁止透過script操作cookie
    });
    // console.log(cookies.get('token'));
}

const setUserName = (name) => {
  cookies.set('username', name, {
      path: '/',
      // secure: true, // 只能在https傳cookie
      sameSite: true, // 禁止跨站傳cookie
      // httpOnly: true, // 禁止透過script操作cookie
  });
  // console.log(cookies.get('token'));
}

export const getUserName = () => {
  if (cookies.get('username') === undefined) {
    console.log("name not stored");
    return null;
  }
  return cookies.get('username');
}

const setJWTToken = ({access, refresh}) => {

    cookies.set('access', access);
    // , {
    //   path: '/',
    //   secure: true,
    //   sameSite: true,
    // });
    cookies.set('refresh', refresh);
    // , {
    //   path: '/',
    //   secure: true,
    //   sameSite: true,
    // });
}

// const getAuthToken = () => {
//     if (cookies.get('token') === undefined) {
//         console.log("token not found");
//         return '';
//     }
//     return cookies.get('token');
// }

const getAuthToken = () => {
    if (cookies.get('access') === undefined) {
        console.log("token not stored");
        return '';
    }
    return cookies.get('access');
}

// import {useState} from 'react'
console.log('NODE_ENV',process.env.NODE_ENV)
// const API_ROOT = (process.env.NODE_ENV==='production')?'/api':'http://localhost:4000'
const API_ROOT = 'https://localhost:8000'
const instance = axios.create({
  baseURL: API_ROOT,
  // withCredentials: true
  headers: { 'Content-Type': 'application/json',},
})

instance.interceptors.request.use(function (config) {
  const token = getAuthToken();
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});


const dbCatch = e=>console.log('myError:',e?.response?.data?.msg)

// spring boot
export const login = async (req)=> {
  try {
    const res = await instance.post("/api/token/", req);
    console.log(res);
    if (res.status===200 && res.data) {
      // setToken(res.data.access);
        setUserName(req.username);
        setJWTToken(res.data);
    }
    return "success";
  } catch (e) {
    console.log(e);
    return "error";
  }
}

export const test = async ()=> {
  console.log(cookies.getAll());
  try {
    console.log(getAuthToken())
    const res = await instance.get('rest/cars'); // "/api/v1/user"
    return res.data;
  } catch(e) {
    console.log(e);
    return null;
  }
}

export const logout = async () => {
  // remove jwt
  cookies.remove("username");
  cookies.remove("access");
  cookies.remove("refresh");
}

// =========== login post ============


export const loginAsNormalUser = async ({user,password}) => {
    try {
        return await instance.post('/login',{user, password});
    } catch (e){
        throw e;
    }
    
}

export const loginAsAuth = async () => {
    try {
        return await instance.post('/loginAuth');
    } catch (e) {
        // console.log("login auth fail");
        throw e;
    }
    
}

export const addAuth = async (user,isAuth) => {
    try {
        const {data} = await instance.post('/addAuth', {params: {user,isAuth}});
        return {user:data.user, isAuth: isAuth};
    } catch (err) {
        return null;
    }
}

export const logoutUser = async () => {
    await instance.post('/logout')
        .catch((err) => {
            throw err;
        })
}

export const logoutAuth = async () => {
    instance.post('/logoutAuth')
        .catch((err) => {
            throw err;
        })
}

export const registerUser = async ({user,password}) => {
    try {
        const {data: {user: name}} = await instance.post('/register', {user,password});
        return name;
    } catch (e) {
        // console.log("fail to register");
        throw e;
    }
}

// ============ houses =============
export const sendHouseInformation = async(lat, lng, buildingType, floor, age) => {
    try {
        const {data: {similar, avgPrice}} = await instance.post('/valuate', {lat, lng, buildingType, floor, age})
        return {similar, avgPrice}
    } catch(err)  {
        // console.log("fail to send houseImformation")
        return null;
    }
}
export const axiosGetHouses = async (params) => {
    try {        
        // console.log("get houses", params)
        const {data:req_houses} = await instance.get('/houses',{params});
        return req_houses;
    } catch (e) {
        // console.log("fail to get houses")
        return null;
    }
    
}
export const axiosGetCars = async (params) => {
    try {
        const {data:req_cars} = await instance.get('/cars', {params});
        return req_cars;
    } catch (e) {
        return null;
    }
}
export const axiosPostCars = async (params) => {
    try {
        const {data:req_cars} = await instance.post('/cars', {params});
        return req_cars;
    } catch (e) {
        return null;
    }
}

// ============ test =============
export const init = async () => {
    const dbCatch = e=>{
        console.log('myError:',e?.response?.data?.msg)
        return {data:{}}
    }
    // const {data:{user,auth}} = await instance.post('/login',{user:'b07901029',password:'123'}).catch(dbCatch)
    // console.log(user,auth)
    // // const {data:jif} = await instance.get('/valuate/user',{params:{neighbor:{center:{lat:25,lng:121.5},distance:800}}}).catch(dbCatch)
    // // await instance.patch('/valuate/user',{_id:jif[0]._id,buildingType:null}).catch(dbCatch)
    // // jif.forEach(async ({_id})=>{
    //     // const {data:col} = await instance.delete('/valuate/user',{data:{_id:jif[3]._id}}).catch(dbCatch) 
    //     const {data:col} = await instance.patch('/valuate/user',{_id:"6007a8c848a21c1f1cc66e32"}).catch(dbCatch)
    //     console.log(col)
    // // })
}

export const testErr = async () => {
    instance.get('/error')
        .catch((err) => {
            throw err;
        })
}