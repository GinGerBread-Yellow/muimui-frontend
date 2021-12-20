import axios from 'axios'
// import {useState} from 'react'
console.log('NODE_ENV',process.env.NODE_ENV)
const API_ROOT = (process.env.NODE_ENV==='production')?'/api':'http://localhost:4000'
const instance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true
})
const dbCatch = e=>console.log('myError:',e?.response?.data?.msg)



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