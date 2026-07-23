import { configureStore } from "@reduxjs/toolkit";
import { appApi } from "../services/api";
 
export const store = configureStore({ //configureStore - הפונקציה שמייצרת את ה store

    reducer: {
        //מוסיפים את הAPI לסטייט הגלובלי
        [appApi.reducerPath] :appApi.reducer ,
    },

    //הוספת מידלוור לניהול בקשות API, cache, רענון נתונים, טעינה ושגיאות
    middleware:(getMiddleware) =>//פה הוספנו את המידלוור של Redux Toolkit
         getMiddleware().concat(appApi.middleware), //הוספת המידלוור של Redux Toolkit

    
    
})
//מה זה ?
//פה מייבאים את כל הסטייט הגלובלי שבעצם יהיה אליו גישה בכל האפליקציה
//store.getState - זוהי פונקציה שמחזירה את כל הסטייט הגלובלי
//ReturnType - לוקח את הטיפוס שהפונקציה מחזירה
//type RootState - שומרים בתוך משתנה ומייצאים
export type RootState = ReturnType<typeof store.getState>;

//מה זה ?
//מייצאים את כל הactions - הפעולות שצריך להשתמש בהם באפליקציה
//store.dispatch - הפונקציה שמייצאת את ה actions
//נשמר בתוך משתנה AppDispatch
export type AppDispatch = typeof store.dispatch;

