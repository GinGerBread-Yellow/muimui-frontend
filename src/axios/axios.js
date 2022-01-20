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


const getAuthToken = () => {
    if (cookies.get('access') === undefined) {
        // console.log("token not stored");
        return '';
    }
    return cookies.get('access');
}

const API_ROOT =  process.env.REACT_APP_BASE_URL;  
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


const dbCatch = e=>{
    let err = e?.response?.data;
    return {"status": e?.response?.status, "data": err};
}

// spring boot
export const login = async (req)=> {
    try {
        const res = await instance.post("/api/token/", req);
        if (res.status===200 && res.data) {
        // setToken(res.data.access);
            setUserName(req.username);
            setJWTToken(res.data);
        }
        return {status:200, data: "login successfully"};
    } catch (e) {
        return dbCatch(e);
    }
}

export const test = async ()=> {
    // console.log(cookies.getAll());
    try {
        // console.log(getAuthToken())
        const res = await instance.get('rest/cars'); // "/api/v1/user"
        return res.data;
    } catch(e) {
        return dbCatch(e)
    }
}

export const logout = async () => {
    // remove jwt
    cookies.remove("username");
    cookies.remove("access");
    cookies.remove("refresh");
}

// =========== login post ============


export const axiosGetCars = async (params) => {
    try {
        const {status, data} = await instance.get('/rest/clients', {params});
        return {status, data};
    } catch (e) {
        return dbCatch(e);
    }
}

export const axiosBookCar = async (params) => {
    try {
        // console.log(params);
        // const {data} = await instance.get('/rest/clients/'+carID, req);
        console.log(params)
        const res = await instance.post('/rest/clients/', params);
        console.log("res", res);
        const {status, data} = res;

        return {status, data};
    } catch (e) {
        return dbCatch(e);
    }
}



export const testErr = async () => {
    instance.get('/error')
        .catch((err) => {
            throw err;
        })
}