// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../../features/Posts/postSlice';
import userReducer from "../../features/Users/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
