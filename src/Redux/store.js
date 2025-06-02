import { configureStore } from "@reduxjs/toolkit";
import { photoAPI } from "../Api/photoApi";
export const store = configureStore({
    reducer : {
        [photoAPI.reducerPath] : photoAPI.reducer,
    },
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(photoAPI.middleware)
    
    
})