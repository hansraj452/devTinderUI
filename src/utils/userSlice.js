
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    //name of the slice
    name :"user",
    //initial state of the slice 
    initialState : null,
    //reducres in which all action that can performed

    reducers: {
        addUser : (state , action) =>{
            return action.payload
        },

        // eslint-disable-next-line no-unused-vars
        removeUser : (state , action) =>{
            return null
        }
    }
    
})

//eporting the function
export const {addUser , removeUser } = userSlice.actions

// exporting the slice with user
export default userSlice.reducer