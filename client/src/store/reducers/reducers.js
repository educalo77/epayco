import { combineReducers } from "redux";
import balanceReducer from "./balanceReducer/balanceReducer.js";
import transactionReducer from "./transactionReducer/transactionReducer.js";
import userReducer from "./userReducer/userReducer.js";

export default combineReducers({
    balanceReducer,
    transactionReducer,
    userReducer
});
