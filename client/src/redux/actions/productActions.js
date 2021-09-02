import axios from "axios";
import { jsonContentTypeConfig } from "../../utils/AxiosUtils";
import { GET_PRODUCT_LIST_SUCCESS, GET_PRODUCT_SUCCESS, POST_PRODUCT_REVIEW_SUCCESS } from "../../utils/Constants";
import { PRODUCT_ERROR, PRODUCT_LIST_ERROR, PRODUCT_LIST_LOADING, PRODUCT_LIST_SUCCESS, PRODUCT_LOADING, PRODUCT_SUCCESS, RESET_PRODUCT_STATE, SET_PRODUCT, SET_PRODUCT_LIST } from "../types";

export const getProductList = (keyword = "") => async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_LOADING })

    try {
        const res = await axios.get(`/api/products?keyword=${keyword}`)

        dispatch({ type: SET_PRODUCT_LIST, payload: res.data })
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: GET_PRODUCT_LIST_SUCCESS })

    } catch(err) {
        dispatch({ type: PRODUCT_LIST_ERROR, payload: err.response.data })
    }
}

export const getProductById = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_LOADING })

    try {
        const res = await axios.get(`/api/products/${productId}`)

        dispatch({ type: SET_PRODUCT, payload: res.data })
        dispatch({ type: PRODUCT_SUCCESS, payload: GET_PRODUCT_SUCCESS })

    } catch(err) {
        dispatch({ type: PRODUCT_ERROR, payload: err.response.data })
    }
}

export const addReviewToProduct = (productId, comment, rating) => async (dispatch) => {
    dispatch({ type: PRODUCT_LOADING })

    const requestBody = { comment, rating }
    try {
        const res = await axios.post(`/api/products/${productId}/reviews`, requestBody, jsonContentTypeConfig)

        dispatch({ type: SET_PRODUCT, payload: res.data.product })
        dispatch({ type: PRODUCT_SUCCESS, payload: POST_PRODUCT_REVIEW_SUCCESS })
    } catch(err) {
        dispatch({ type: PRODUCT_ERROR, payload: err.response.data })
    }
}

export const resetProductState = () => (dispatch) => {
    dispatch({ type: RESET_PRODUCT_STATE })
}