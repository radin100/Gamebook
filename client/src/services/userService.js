import { decodeToken } from 'react-jwt';
import { applyUser } from "../utils/userSession";
import { applyUserLocally } from '../utils/userLocal';

const baseUrl = 'http://localhost:3030/user/';

const authUser = async (res, stay) => {
    const userToken = await res.json();
    if(userToken.dublicate){
        throw new Error(`User with this ${userToken.dublicate} already exist!`);
    }
    if(userToken.message){
        throw new Error(userToken.message);
    }

    const user = decodeToken(userToken);
    stay ? applyUserLocally(user) : applyUser(user);
    return user;
}

export const login = async (data) => {

    const res = await fetch(baseUrl + 'login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(data.stayIn){
        const user = await authUser(res, data.stayIn);
        return user;
    }else{
        const user = await authUser(res);
        return user;
    }
} 

export const register = async (data) => {
    const res = await fetch(baseUrl + 'register', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const user = await authUser(res);
    return user;
}

export const getUsername = async (id) => {
    const res = await fetch(baseUrl + id);
    const username = await res.json();
    return username;
} 
