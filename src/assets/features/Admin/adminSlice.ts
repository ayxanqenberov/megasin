import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { comment_api } from "../Comments/commentSlice";

interface Admin {
  id: number;
  name: string;
  password: string;
}

interface AdminState {
  user: Admin | null;
  loading: boolean;
  error: string | null;
}
const initialState: AdminState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
  loading: false,
  error: null,
};

export const loginAdmin = createAsyncThunk<
  Admin, 
  { name: string; password: string }, 
  { rejectValue: string }
>(
  "Admin/loginAdmin",
  async ({ name, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get<Admin[]>(`https://${comment_api}.mockapi.io/admin`);
      const admins = response.data;
      const user = admins.find(
        (admin) => admin.name === name && admin.password === password
      );

      if (!user) {
        return rejectWithValue("Invalid username or password.");
      }
      
      return user;
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred while logging in.";
      return rejectWithValue(errorMessage);
    }
  }
);
// const postAdmin = async (name: string, password: string) => {
//   try {
//     const response = await axios.post(`https://${comment_api}.mockapi.io/admin`, {
//       name: name,
//       password: password,
//     });
//     console.log('Admin created:', response.data);
//   } catch (error: any) {
//     console.error("Error creating admin:", error.message || error);
//   }
// };

// Example usage:
// postAdmin("adminAyxan", "ayxan0123");

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logoutAdmin(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed.";
      });
  },
});

export const { logoutAdmin } = adminSlice.actions;

export default adminSlice.reducer;

// const postAdmin = async () => {
//   try {
//     const response = await axios.post(`https://${comment_api}.mockapi.io/admin`, {
//       name: "adminAyxan",
//       password: "ayxan0123",
//     });
//   } catch (error) {
//     console.error("Error", error);
//   }
// };

//  postAdmin();