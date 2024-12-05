import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const comment_api = import.meta.env.VITE_COMMENT_API_KEY
export const loginAdmin = createAsyncThunk(
  "admin/login",
  async ({ username, password }, thunkAPI) => {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    if (data.token && data.user) {
      localStorage.setItem("adminToken", data.token);
      return data.user;
    } else {
      throw new Error("Invalid credentials");
    }
  }
);

const postAdmin = async (name: string, password: string) => {
  try {
    const response = await axios.post(`https://${comment_api}.mockapi.io/admin`, {
      name: name,
      password: password,
    });
    console.log('Admin created:', response.data);
  } catch (error: any) {
    console.error("Error creating admin:", error.message || error);
  }
};

// postAdmin("adminay", "ayxan0123");
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logoutAdmin(state) {
      state.user = null;
      localStorage.removeItem("adminToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },  
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
