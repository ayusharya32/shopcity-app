import axios from "axios";
import { jsonContentTypeConfig } from "../../utils/AxiosUtils";
import { CREATE_ORDER_SUCCESS, GET_ORDER_LIST_SUCCESS, GET_ORDER_SUCCESS } from "../../utils/Constants";
import { ORDER_ERROR, ORDER_LIST_ERROR, ORDER_LIST_LOADING, ORDER_LIST_SUCCESS, ORDER_LOADING, ORDER_SUCCESS, RESET_ORDER_STATE, SET_ORDER, SET_ORDER_LIST } from "../types";

export const createOrder = (requestBody) => async (dispatch) => {
    dispatch({ type: ORDER_LOADING })

    try {
        const res = await axios.post(`/api/orders`, requestBody, jsonContentTypeConfig)

        dispatch({ type: SET_ORDER, payload: res.data })
        dispatch({ type: ORDER_SUCCESS, payload: CREATE_ORDER_SUCCESS })

    } catch(err) {
        dispatch({ type: ORDER_ERROR, payload: err.response.data })
    }
}

export const getOrderById = (orderId) => async (dispatch) => {
    dispatch({ type: ORDER_LOADING })

    try {
        const res = await axios.get(`/api/orders/${orderId}`)

        dispatch({ type: SET_ORDER, payload: res.data })
        dispatch({ type: ORDER_SUCCESS, payload: GET_ORDER_SUCCESS })

    } catch(err) {
        dispatch({ type: ORDER_ERROR, payload: err.response.data })
    }
}

export const getUserOrders = () => async (dispatch) => {
    dispatch({ type: ORDER_LIST_LOADING })

    try {
        const res = await axios.get(`/api/orders`)

        dispatch({ type: SET_ORDER_LIST, payload: res.data })
        dispatch({ type: ORDER_LIST_SUCCESS, payload: GET_ORDER_LIST_SUCCESS })

    } catch(err) {
        dispatch({ type: ORDER_LIST_ERROR, payload: err.response.data })
    }
}

export const resetOrderState = () => (dispatch) => {
    dispatch({ type: RESET_ORDER_STATE })
}