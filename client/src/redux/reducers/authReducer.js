import { KEY_AUTH_TOKEN } from "../../utils/Constants";
import { AUTH_ERROR, AUTH_LOADING, LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS } from "../types";

const initialAuthState = {
    authToken: localStorage.getItem(KEY_AUTH_TOKEN), 
    isAuthenticated: localStorage.getItem(KEY_AUTH_TOKEN) && true,
    success: "",
    error: null
}

export function authReducer(state = { ...initialAuthState }, action) {
    switch(action.type) {
        case AUTH_LOADING:
            return { 
                loading: true
            }

        case REGISTER_SUCCESS:
            return {
                authToken: action.payload.accessToken,
                isAuthenticated: true,
                loading: false,
                success: "User Registered Successfully",    
            }

        case LOGIN_SUCCESS:
            return {
                authToken: action.payload.accessToken,
                isAuthenticated: true,
                loading: false,
                success: "Logged In Successfully",    
            }

        case LOGOUT:
            return {
                isAuthenticated: false,
                success: "Logged Out Successfully",    
            }

        case AUTH_ERROR:
            return {    
                error: action.payload
            }

        default: 
            return state
    }
}