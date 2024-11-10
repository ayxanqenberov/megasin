// src/redux/features/Users/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: string;
  username: string;
  email: string;
  profilePictures: string;
  follower: number;
  following: number;
  password: string; 
  bio: string;
  bannerPict: string;
  createdAccount: Date;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
  isLoading: false,
  error: null,
};

const handleApiError = (error: any) => error.response?.data?.message || error.message || "Something went wrong";
export const registerUser = createAsyncThunk<User, { email: string; password: string; username: string }, { rejectValue: string }>(
  "user/registerUser",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const existingUsers = await axios.get("https://672e97cf229a881691f07176.mockapi.io/megasin/user");
      const usernameExists = existingUsers.data.some((user: User) => user.username === username);
      const emailExists = existingUsers.data.some((user: User) => user.email === email);

      if (usernameExists) throw new Error("Username already in use.");
      if (emailExists) throw new Error("Email already in use.");

      const response = await axios.post("https://672e97cf229a881691f07176.mockapi.io/megasin/user", {
        email,
        username,
        profilePictures: "https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D",
        follower: 0,
        following: 0,
        bio: "Add more information about yourself",
        password,
        bannerPict: "",
        createdAccount: new Date().toISOString(),
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
export const updateData = createAsyncThunk<User, { id: string; username: string; email: string; bio: string; profilePictures: string; bannerPict: string }, { rejectValue: string }>(
  "user/updateData",
  async ({ id, username, email, bio, profilePictures, bannerPict }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://672e97cf229a881691f07176.mockapi.io/megasin/user/${id}`, {
        username,
        email,
        bio,
        profilePictures,
        bannerPict,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Thunk to log in a user
export const loginUser = createAsyncThunk<User, { username: string; password: string }, { rejectValue: string }>(
  "user/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://672e97cf229a881691f07176.mockapi.io/megasin/user");
      const user = response.data.find((user: User) => user.username === username && user.password === password);

      if (!user) {
        throw new Error("Invalid username or password."); 
      }

      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Registration failed";
      })
      .addCase(updateData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateData.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Update failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
