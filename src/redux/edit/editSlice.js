import { createSlice } from "@reduxjs/toolkit"

//SLICE for edit mode gestion : useful for updating Header component with firstname user 
const initialState = {
    editMode:false,
}

export const editSlice = createSlice({
    name:"edit",
    initialState,
    reducers: {
        edit: (state) => {
            state.editMode = true
        },
        noEdit: () => initialState
        
    }
})

export const {edit, noEdit} = editSlice.actions;
export default editSlice.reducer