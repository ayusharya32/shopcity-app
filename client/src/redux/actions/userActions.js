import axios from "axios";
import { jsonContentTypeConfig } from "../../utils/AxiosUtils";
import { ADD_TO_CART_SUCCESS, CLEAR_CART_SUCCESS, GET_CURRENT_USER_SUCCESS, REMOVE_FROM_CART_SUCCESS, UPDATE_PROFILE_SUCCESS, UPDATE_SHIPPING_SUCCESS } from "../../utils/Constants";
import { RESET_USER_SUCCESS, SET_USER, USER_ERROR, USER_LOADING, USER_SUCCESS } from "../types";

export const getCurrentUser = () => async (dispatch) => {
    dispatch({ type: USER_LOADING })

    try {
        const res = await axios.get("/api/user")

        dispatch({ type: SET_USER, payload: res.data })
        dispatch({ type: USER_SUCCESS, payload: GET_CURRENT_USER_SUCCESS })

    } catch(err) {
        dispatch({ type: USER_ERROR, payload: err.response.data })
    }
}

export const addProductToCart = (productId, quantity = 1) => async (dispatch) => {
    dispatch({ type: USER_LOADING })

    const requestBody = { productId, quantity }
    try {
        const res = await axios.put("/api/user/cart/add", requestBody, jsonContentTypeConfig)

        dispatch({ type: SET_USER, payload: res.data.user })
        dispatch({ type: USER_SUCCESS, payload: ADD_TO_CART_SUCCESS })

    } catch(err) {
        dispatch({ type: USER_ERROR, payload: err.response.data })
    }
}

export const removeProductFromCart = (productId) => async (dispatch) => {
    dispatch({ type: USER_LOADING })

    try {
        const res = await axios.put(`/api/user/cart/remove/${productId}`)

        dispatch({ type: SET_USER, payload: res.data.user })
        dispatch({ type: USER_SUCCESS, payload: REMOVE_FROM_CART_SUCCESS })

    } catch(err) {
        dispatch({ type: USER_ERROR, payload: err.response.data })
    }
}

export const clearCart = () => async (dispatch) => {
    dispatch({ type: USER_LOADING })

    try {
        const res = await axios.put(`/api/user/cart/clear`)

        dispatch({ type: SET_USER, payload: res.data.user })
        dispatch({ type: USER_SUCCESS, payload: CLEAR_CART_SUCCESS })

    } catch(err) {
        dispatch({ type: USER_ERROR, payload: err.response.data })
    }
}

export const updateShippingAddress = (address, city, state, pincode) => async (dispatch) => {
    dispatch({ type: USER_LOADING })

    const requestBody = { address, city, state, pincode }

    try {
        const res = await axios.put(`/api/user/shipping`, requestBody, jsonContentTypeConfig)

        dispatch({ type: SET_USER, payload: res.data.user })
        dispatch({ type: USER_SUCCESS, payload: UPDATE_SHIPPING_SUCCESS })

    } catch(err) {
        dispatch({ type: USER_ERROR, payload: err.response.data })
    }
}

export const updateProfile = (requestBody) => async (dispatch) => {
    dispatch({ type: USER_LOADING })

    try {
        const res = await axios.put(`/api/user/profile`, requestBody, jsonContentTypeConfig)

        dispatch({ type: SET_USER, payload: res.data })
        dispatch({ type: USER_SUCCESS, payload: UPDATE_PROFILE_SUCCESS })

    } catch(err) {
        dispatch({ type: USER_ERROR, payload: err.response.data })
    }
}

export const resetUserSuccess = () => (dispatch) => {
    dispatch({ type: RESET_USER_SUCCESS })
}