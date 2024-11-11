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
  users:[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
  isLoading: false,
  users: [],
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
        profilePictures: "https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798821_clzISlzMqjLxx8YjYFBfOaVvIj5qifwm.jpg",
        follower: 0,
        following: 0,
        bio:"Add more information about yourself",
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
export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://672e97cf229a881691f07176.mockapi.io/megasin/user');
      console.log(response.data);
      
      return response.data; // Return data array to populate users
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
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
      // try{
      //   const response = await axios.delete(`https://672e97cf229a881691f07176.mockapi.io/megasin/user/${id}`
      // }catch(error){
      //   return
      // }
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
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.users = action.payload; // Populate users with API data
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch users";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
