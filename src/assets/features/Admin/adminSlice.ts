import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const comment_api = import.meta.env.VITE_COMMENT_API_KEY;

export const loginAdmin = createAsyncThunk(
  "admin/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://${comment_api}.mockapi.io/admin`);
      const admins = response.data;
      const admin = admins.find((a) => a.name === username && a.password === password);

      if (admin) {
        const token = "sample_admin_token"; 
        localStorage.setItem("adminToken", token); 
        return { token };
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isAuthenticated: !!localStorage.getItem("adminToken"), 
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("adminToken"); // Token'ı temizle
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;
