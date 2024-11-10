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
export const registerUser  = createAsyncThunk<
  User,
  { email: string; password: string; username: string },
  { rejectValue: string }
>("user/registerUser ", async ({ email, password, username }, { rejectWithValue }) => {
  try {
    const existingUsers = await axios.get("https://672e97cf229a881691f07176.mockapi.io/megasin/user");
    const usernameExists = existingUsers.data.some((user: User) => user.username == username );
    const emailExists = existingUsers.data.some((user: User)=> user.email == email)

    if (usernameExists) {
      throw new Error("You cannot use this username"); 
    }
    if(emailExists){
        throw new Error("This gmail account was used")
    }
    const response = await axios.post("https://672e97cf229a881691f07176.mockapi.io/megasin/user", {
      email,
      username,
      profilePictures: "https://as2.ftcdn.net/v2/jpg/05/86/91/55/1000_F_586915596_gPqgxPdgdJ4OXjv6GCcDWNxTjKDWZ3JD.jpg",
      follower: 0,
      following: 0,
      bio: "Add more information about yourself",
      password,
    });
    
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const loginUser  = createAsyncThunk<User, { username: string; password: string }, { rejectValue: string }>(
  "user/loginUser ",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://672e97cf229a881691f07176.mockapi.io/megasin/user");
      console.log("Users from API:", response.data); 
      console.log("Attempting to log in with:", { username, password });

      const user = response.data.find((user: User) => user.username === username && user.password === password);
      console.log("Logging in user:", user); 

      if (!user) {
        throw new Error("Invalid username or password."); 
      }
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
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
      .addCase(registerUser .pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser .fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser .rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Registration failed";
      })
      .addCase(loginUser .pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser .fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser .rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;