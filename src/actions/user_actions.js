import { LOGIN_SUCCESS } from './types'
import { LOGIN_ERROR } from './types'
import { FETCH_USER_SUCCESS } from './types'
import { FETCH_USER_ERROR } from './types'
import { LOGOUT } from './types'
import { ROOT_URL } from './types'
import {FetchLogin, FetchUser} from './fetchapi'
import axios from 'axios'

function loginResolve(id) {
    return {
        type: LOGIN_SUCCESS,
        payload: id
    }
}

function loginError(error) {
    return {
        type: LOGIN_ERROR,
        payload: error
    }
}

function populateUser(user) {
    return {
        type: FETCH_USER_SUCCESS,
        payload: user
    }
}

function fetchUserError(error){
    return {
        type: FETCH_USER_ERROR,
        payload: error
    }
}

function logOutUser(response){
    return {
        type: LOGOUT,
        payload: response
    }
}

export function authenticateUser(email,pass) {

        return (dispatch) => {

            FetchLogin(email,pass).then((data) => {
                if(data){
                dispatch(loginResolve(data));
                }
                
            }).catch((error) => {
                dispatch(loginError(error));
            })
    }
}
export function getUser() {

    return (dispatch, getState) => {

        const id = getState().loggedInDetails.id;

        if (id){

            FetchUser(id).then((data) => {
                dispatch(
                    populateUser(data)
                );
            }).catch(error => {
                dispatch (
                    fetchUserError(error)
                );
            })
        }
        else {

            dispatch(
                loginError({message: 'Please log in'})
                );
        }
    }
}

export async function CreateUser(name,email,pass) {
    let msg=null;
    try{
    
    await axios.post(`${ROOT_URL}/login`,{
        username: email,
      password: pass,
      name: name,
      admin: true
    }).then((response) =>{
    console.log(response);
    console.log(response.data);
    })
    msg ="Account Created Successfully!! Please go to Login Page";
    }
    catch(error) {
        console.log("error");
            msg ="Some Error : "+ error;
        }

        return msg;
}



export function logoutUser() {

    return (dispatch, getState) => {
        const id = getState().loggedInDetails.id

        if (id){
                dispatch (logOutUser(id));
        } 
        else {
            dispatch(loginError({message: 'User not logged in'}));
        }
    }
}