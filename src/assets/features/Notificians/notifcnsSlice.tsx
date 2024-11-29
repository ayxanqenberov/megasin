import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const noth_api = import.meta.env.VITE_NOTH_AND_NEW_KEY


export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await axios.get(`https://${noth_api}.mockapi.io/notificians`);
    return response.data;
  }
);
export const postNotification = createAsyncThunk(
  'notifications/postNotification',
  async (notification: { title: string; content: string }) => {
    const response = await axios.post(`https://${noth_api}.mockapi.io/notificians`, notification);
    return response.data;
  }
);

interface Notification {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface NotificationsState {
  notifications: Notification[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: NotificationsState = {
  notifications: [],
  status: 'idle',
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = 'idle';
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(postNotification.fulfilled, (state, action) => {
        state.notifications.push(action.payload);
      });
  },
});

export default notificationsSlice.reducer;
