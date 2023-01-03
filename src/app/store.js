import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice"
import editReducer from "../redux/edit/editSlice"

export default configureStore({
    reducer: {
        auth: authReducer,
        edit: editReducer
    }
})






