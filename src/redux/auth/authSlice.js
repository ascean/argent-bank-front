import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
        id: 0
    },
    token: null,
    error: null,
};


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            return initialState
        },
        login: (state, action) => {
            state.token = action.payload.token 
            state.error = action.payload.error
        }, 
        fetchProfile: (state, action) => {
            state.user.firstName = action.payload.firstName
            state.user.lastName = action.payload.lastName
            state.user.id = action.payload.id
            state.user.email = action.payload.email
            state.error = action.payload.error
        },
        register: (state, action) => {
            state.user.firstName = action.payload.firstName
            state.user.lastName = action.payload.lastName
            state.user.email = action.payload.email
            state.user.id = action.payload._id
            state.error = action.payload.error
        },
        updateProfile: (state, action) => {
            state.user.firstName = action.payload.firstName
            state.user.lastName = action.payload.lastName
            state.user.email = action.payload.email
            state.user.password = action.payload.password
            state.user.id = action.payload.id
            state.error = action.payload.error
        }
    }
});

export const { reset, login, fetchProfile, register, updateProfile } = authSlice.actions;
export default authSlice.reducer;
