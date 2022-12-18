import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    editMode:false,
}

export const editSlice = createSlice({
    name:"edit",
    initialState,
    reducers: {
        status: (state) => {
            state.editMode = true
        },
        resetStatus: () => initialState
        
    }
})

export const {status, resetStatus} = editSlice.actions;
export default editSlice.reducer