import { createSlice, createAsyncThunk, createSelector, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../redux/app/store";

export interface AdminData {
  id: string;
  name: string;
  password?: string;
}

interface AdminState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
export const comment_api = (import.meta.env.VITE_COMMENT_API_KEY as string) || "";

export const loginAdmin = createAsyncThunk<
  { token: string },
  { username: string; password: string },
  { rejectValue: string }
>(
  "admin/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://${comment_api}.mockapi.io/admin`);
      const admins: AdminData[] = response.data;
      const admin = admins.find((a) => a.name === username && a.password === password);

      if (admin) {
        const token = "sample_admin_token"; 
        localStorage.setItem("adminToken", token); 
        return { token };
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(error instanceof Error ? error.message : "An error occurred");
    }
  }
);

const initialState: AdminState = {
  isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("adminToken") : false, 
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("adminToken");
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
      .addCase(loginAdmin.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = adminSlice.actions;

const selectAdminState = (state: RootState) => state.admin;

export const selectIsAdminAuthenticated = createSelector(
  [selectAdminState],
  (adminState) => adminState.isAuthenticated
);

export const selectAdminIsLoading = createSelector(
  [selectAdminState],
  (adminState) => adminState.isLoading
);

export const selectAdminError = createSelector(
  [selectAdminState],
  (adminState) => adminState.error
);

export default adminSlice.reducer;