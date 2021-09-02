import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { orderListReducer, orderReducer } from "./reducers/orderReducer";
import { productListReducer, productReducer } from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";

const { applyMiddleware } = require("redux");
const { createStore } = require("redux");
const { combineReducers } = require("redux");
const { composeWithDevTools } = require("redux-devtools-extension");

const reducer = combineReducers({
    authState: authReducer,
    userState: userReducer,
    productListState: productListReducer,
    productState: productReducer,
    orderListState: orderListReducer,
    orderState: orderReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store