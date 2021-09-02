import { ORDER_ERROR, ORDER_LIST_ERROR, ORDER_LIST_LOADING, ORDER_LIST_SUCCESS, ORDER_LOADING, ORDER_SUCCESS, RESET_ORDER_LIST_STATE, RESET_ORDER_STATE, SET_ORDER, SET_ORDER_LIST } from "../types"

export function orderReducer(state = {}, action) {
    switch(action.type) {
        case ORDER_LOADING: 
            return {
                ...state,
                loading: true,
                success: null,
                error: null
            }

        case ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
                error: null
            } 

        case ORDER_ERROR:
            return {
                ...state,
                loading: false,
                success: null,
                error: action.payload
            }

        case SET_ORDER:
            return {
                ...state,
                order: action.payload,
            }

        case RESET_ORDER_STATE:
            return {}

        default:
            return state
    }
}

export function orderListReducer(state = {}, action) {
    switch(action.type) {
        case ORDER_LIST_LOADING: 
            return {
                ...state,
                loading: true,
                success: null,
                error: null
            }

        case ORDER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
                error: null
            } 

        case ORDER_LIST_ERROR:
            return {
                ...state,
                loading: false,
                success: null,
                error: action.payload
            }

        case SET_ORDER_LIST:
            return {
                ...state,
                orders: action.payload,
            }

        case RESET_ORDER_LIST_STATE:
            return {}

        default:
            return state
    }
}