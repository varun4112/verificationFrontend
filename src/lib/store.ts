import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./features/register/registerSlice";

export const store = configureStore({
    reducer: {
        userInfo: userInfoReducer
    }
});

// Define the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
