import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
    name :"Requests",
    initialState:null,
    reducers : {
        addRequests: (state , action) => {
            return action.payload
        },
        removeRequests :() => {
            return null;
        }
    }
})


export const {addRequests,removeRequests} = RequestSlice.actions;

export default RequestSlice.reducer;