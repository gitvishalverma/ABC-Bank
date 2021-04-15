import { LOGIN_SUCCESS } from '../actions/types'
import { LOGIN_ERROR } from '../actions/types'
import { FETCH_USER_SUCCESS } from '../actions/types'
import { FETCH_USER_ERROR } from '../actions/types'
import { LOGOUT } from '../actions/types'


const initialState = {
    id: null,
    error: {
        message: null
    },
    loggedIn: false,
    user: null
}




export default function(state = initialState, action) {
    switch(action.type){
        case LOGIN_SUCCESS:
            return {...state, id: action.payload, loggedIn: true}
        case LOGIN_ERROR:
            return {...state, error: action.payload}
        case FETCH_USER_SUCCESS:
            return {...state, user: action.payload}
        case FETCH_USER_ERROR:
            return {...state, error: action.payload}
        case LOGOUT:
            return {...state, id: null, loggedIn: false, user: null}
        default:
            return state
    }

    return state;
}