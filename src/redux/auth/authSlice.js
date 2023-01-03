import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authServices";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
};

//Register user
export const register = createAsyncThunk(
    "auth/signup",
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

//Fetch profile user
export const fetchProfile = createAsyncThunk(
    "auth/fetchProfile",
    async (user, thunkAPI) => {
        try {
            return await authService.fetchProfile(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Update profile user
export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (user, thunkAPI) => {
        try {
            return await authService.updateProfile(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Logout
export const logout = createAsyncThunk(
    "auth/logout",
    async () => await authService.logout()
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.user = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //REGISTER
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null
                state.message = null
                typeof action.payload === "number"
                    ? state.message = action.payload
                    : state.user = action.payload
                })
                .addCase(register.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    state.user = null;
                })
                
                //LOGIN
                .addCase(login.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(login.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.user = null
                    state.message = null
                    typeof action.payload === "number"
                        ? state.message = action.payload
                        : state.user = action.payload
                })
                .addCase(login.rejected, (state, action) => {
                    state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })

            //FETCHPROFILE
            .addCase(fetchProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null
                state.message = null
                typeof action.payload === "number"
                    ? state.message = action.payload
                    : state.user = action.payload
        })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })

            //LOGOUT
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })

            //UPDATEPROFILE
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                typeof action.payload === "number"
                    ? (state.message = action.payload)
                    : (state.user = action.payload);
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
