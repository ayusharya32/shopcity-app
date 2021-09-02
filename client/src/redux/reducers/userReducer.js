import { RESET_USER_STATE, RESET_USER_SUCCESS, SET_USER, USER_ERROR, USER_LOADING, USER_SUCCESS } from "../types"

export function userReducer(state = {}, action) {
    switch(action.type) {
        case USER_LOADING: 
            return {
                ...state,
                loading: true,
                success: null,
                error: null
            }

        case USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
                error: null
            } 

        case USER_ERROR:
            return {
                ...state,
                loading: false,
                success: null,
                error: action.payload
            }

        case SET_USER:
            return {
                ...state,
                user: action.payload
            }

        case RESET_USER_SUCCESS:
            return {
                ...state,
                success: null
            }

        case RESET_USER_STATE:
            return {}
        
        default:
            return state
    }
}