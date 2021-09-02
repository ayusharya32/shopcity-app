import axios from "axios";
import { jsonContentTypeConfig, removeTokenHeader, setTokenHeader } from "../../utils/AxiosUtils";
import { KEY_AUTH_TOKEN, KEY_PAYMENT_METHOD } from "../../utils/Constants";
import { AUTH_ERROR, AUTH_LOADING, LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS, RESET_ORDER_LIST_STATE, RESET_ORDER_STATE, RESET_PRODUCT_LIST_STATE, RESET_PRODUCT_STATE, RESET_USER_STATE } from "../types";

export const registerUser = (name, email, password) => async (dispatch) => {
    dispatch({ type: AUTH_LOADING })

    const requestBody = { name, email, password }

    try {
        const res = await axios.post("/api/auth/register", requestBody, jsonContentTypeConfig)

        localStorage.setItem(KEY_AUTH_TOKEN, res.data.accessToken)
        setTokenHeader()
        dispatch({ type: REGISTER_SUCCESS, payload: res.data })

    } catch(err) {
        dispatch({ type: AUTH_ERROR, payload: err.response.data })
    }
}

export const loginUser = (email, password) => async (dispatch) => {
    dispatch({ type: AUTH_LOADING })

    const requestBody = { email, password }

    try {
        const res = await axios.post("/api/auth/login", requestBody, jsonContentTypeConfig)

        localStorage.setItem(KEY_AUTH_TOKEN, res.data.accessToken)
        setTokenHeader()
        dispatch({ type: LOGIN_SUCCESS, payload: res.data })
        
    } catch(err) {
        dispatch({ type: AUTH_ERROR, payload: err.response.data })
    }
}

export const logOut = () => (dispatch) => {
    localStorage.removeItem(KEY_AUTH_TOKEN)
    localStorage.removeItem(KEY_PAYMENT_METHOD)
    removeTokenHeader()

    dispatch({ type: RESET_USER_STATE })
    dispatch({ type: RESET_PRODUCT_STATE })
    dispatch({ type: RESET_PRODUCT_LIST_STATE })
    dispatch({ type: RESET_ORDER_STATE })
    dispatch({ type: RESET_ORDER_LIST_STATE })
    dispatch({ type: LOGOUT })
}