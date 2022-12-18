import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice"
import editReducer from "../feature/edit/editSlice"

export default configureStore({
    reducer: {
        auth: authReducer,
        edit: editReducer
    }
})