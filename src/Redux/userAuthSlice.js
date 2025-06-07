import {createSlice} from "@reduxjs/toolkit";

const initialState  = {
   id : "",
   email : ""
};
export const userAuthSlice = createSlice({
    name : "UserAuth",
    initialState : initialState,
    reducers : {
        setLoggedInUser : (state,action) => {
            state.id = action.payload.id
            state.email = action.payload.email
     

        }
    }
});


export const {setLoggedInUser} = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;