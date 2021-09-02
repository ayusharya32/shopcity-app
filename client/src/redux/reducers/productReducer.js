import { PRODUCT_ERROR, PRODUCT_LIST_ERROR, PRODUCT_LIST_LOADING, PRODUCT_LIST_SUCCESS, PRODUCT_LOADING, PRODUCT_SUCCESS, RESET_PRODUCT_LIST_STATE, RESET_PRODUCT_STATE, SET_PRODUCT, SET_PRODUCT_LIST } from "../types";

export function productListReducer(state = {}, action) {
    switch(action.type) {
        case PRODUCT_LIST_LOADING: 
            return {
                ...state,
                loading: true,
                success: null,
                error: null
            }

        case PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
                error: null
            } 

        case PRODUCT_LIST_ERROR:
            return {
                ...state,
                loading: false,
                success: null,
                error: action.payload
            }

        case SET_PRODUCT_LIST:
            return {
                ...state,
                productList: action.payload,
            }

        case RESET_PRODUCT_LIST_STATE:
            return {}

        default:
            return state
    }
}

export function productReducer(state = {}, action) {
    switch(action.type) {
        case PRODUCT_LOADING: 
            return {
                ...state,
                loading: true,
                success: null,
                error: null
            }

        case PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
                error: null
            } 

        case PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                success: null,
                error: action.payload
            }

        case SET_PRODUCT:
            return {
                ...state,
                product: action.payload,
            }

        case RESET_PRODUCT_STATE: 
            return {}
            
        default:
            return state
    }
}