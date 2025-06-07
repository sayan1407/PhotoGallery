import { configureStore } from "@reduxjs/toolkit";
import { photoAPI } from "../Api/photoApi";
import authAPI from "../Api/AuthApi";
import { userAuthReducer } from "./userAuthSlice";
export const store = configureStore({
    reducer : {
        [photoAPI.reducerPath] : photoAPI.reducer,
        [authAPI.reducerPath] : authAPI.reducer,
        userAuthStore : userAuthReducer,

    },
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(photoAPI.middleware)
    .concat(authAPI.middleware)
    
    
})