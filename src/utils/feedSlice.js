/* eslint-disable no-unused-vars */

import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : "feed",
    initialState : null,
    reducers :{
        addfeed : (state , action) =>{
            return action.payload
        },
        removefeed : (state , action) => {
            const updateFeed = state.filter((r)=> r._id !== action.payload)
            return updateFeed
        }
    }
})

export const {addfeed , removefeed} = feedSlice.actions;
export default feedSlice.reducer