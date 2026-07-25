import { configureStore } from "@reduxjs/toolkit";
import { appApi } from "../services/api";
 
export const store = configureStore({ 

    reducer: {
        [appApi.reducerPath] :appApi.reducer ,
    },

    middleware:(getMiddleware) =>
         getMiddleware().concat(appApi.middleware), 

    
    
})
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

