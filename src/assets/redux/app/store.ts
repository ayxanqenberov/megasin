// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../../features/Posts/postSlice';
import userReducer from "../../features/Users/userSlice";
import commentReducer from "../../features/Comments/commentSlice"
import searchReducer from "../../features/Search/searchSlice"
import adminReducer from "../../features/Admin/adminSlice"
import notificationsReducer from "../../features/Notificians/notifcnsSlice"
export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    comments: commentReducer,
    search: searchReducer,
    admin: adminReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
