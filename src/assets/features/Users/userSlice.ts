import { createSlice, createAsyncThunk, PayloadAction, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  id: string | number;
  username: string;
  email: string;
  profilePictures: string;
  follower: number;
  password?: string; 
  bio: string;
  bannerPict: string;
  createdAccount: string; 
  followerUser: (string | number)[];
}

interface UserState {
  user: User | null;
  users: User[]; 
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: (() => {
    try {
      if (typeof window !== "undefined") {
        const userData = localStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
      }
      return null;
    } catch {
      return null;
    }
  })(),
  users: [],
  isLoading: false,
  error: null,
};

export const user_api_key = (import.meta.env.VITE_USER_API_KEY as string) || "";

const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  return error instanceof Error ? error.message : "Something went wrong";
};

export const registerUser = createAsyncThunk<
  User,
  { email: string; password: string; username: string },
  { rejectValue: string }
>(
  "user/registerUser",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const existingUsers = await axios.get<User[]>(
        `https://${user_api_key}.mockapi.io/users/Users`
      );
      const usernameExists = existingUsers.data.some(
        (user) => user.username === username
      );
      const emailExists = existingUsers.data.some(
        (user) => user.email === email
      );

      if (usernameExists) throw new Error("Username already in use.");
      if (emailExists) throw new Error("Email already in use.");

      const response = await axios.post<User>(
        `https://${user_api_key}.mockapi.io/users/Users`,
        {
          email,
          username,
          profilePictures:
            "https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798821_clzISlzMqjLxx8YjYFBfOaVvIj5qifwm.jpg",
          follower: 0,
          bio: "Add more information about yourself",
          password,
          bannerPict: "",
          createdAccount: new Date().toISOString(),
          followerUser: []
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const followUser = createAsyncThunk<
  User,
  string | number,
  { rejectValue: string }
>("user/followUser", async (userId, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { user: UserState };
    const currentUser = state.user.user; 

    if (!currentUser) {
      throw new Error("User not logged in.");
    }

    const updatedFollowUsers = [...currentUser.followerUser, userId];
    const response = await axios.put<User>(`https://${user_api_key}.mockapi.io/users/Users/${currentUser.id}`, {
      followerUser: updatedFollowUsers,
      follower: updatedFollowUsers.length,
    });
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data; 
  } catch (error: unknown) {
    return rejectWithValue(handleApiError(error));
  }
});

export const updateData = createAsyncThunk<User, { id: string | number; username?: string; email?: string; bio?: string; profilePictures?: string; bannerPict?: string }, { rejectValue: string }>(
  "user/updateData",
  async ({ id, username, email, bio, profilePictures, bannerPict }, { rejectWithValue }) => {
    try {
      const response = await axios.put<User>(`https://${user_api_key}.mockapi.io/users/Users/${id}`, {
        username,
        email,
        bio,
        profilePictures,
        bannerPict,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>(`https://${user_api_key}.mockapi.io/users/Users`);
      return response.data; 
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const loginUser = createAsyncThunk<User, { username: string; password: string }, { rejectValue: string }>(
  "user/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>(`https://${user_api_key}.mockapi.io/users/Users`);
      const user = response.data.find((user) => user.username === username && user.password === password);

      if (!user) {
        throw new Error("Invalid username or password."); 
      }

      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error));
    }
  } 
);

export const toggleFollowUser = createAsyncThunk<
  { updatedUser: User; targetUser: User },
  { targetUserId: string | number },
  { rejectValue: string; state: { user: UserState } }
>(
  "user/toggleFollowUser",
  async ({ targetUserId }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const currentUser = state.user.user;

      if (!currentUser) {
        throw new Error("User not logged in.");
      }

      const targetResponse = await axios.get<User>(
        `https://${user_api_key}.mockapi.io/users/Users/${targetUserId}`
      );

      const targetUser: User = targetResponse.data;
      const isFollowing = targetUser.followerUser.map(String).includes(String(currentUser.id));

      const updatedFollowers = isFollowing
        ? targetUser.followerUser.filter((id) => String(id) !== String(currentUser.id))
        : [...targetUser.followerUser, currentUser.id];

      const updatedTargetUser = await axios.put<User>(
        `https://${user_api_key}.mockapi.io/users/Users/${targetUserId}`,
        {
          followerUser: updatedFollowers,
          follower: updatedFollowers.length,
        }
      );
      const updatedCurrentUserFollowererUser = isFollowing
        ? currentUser.followerUser.filter((id) => String(id) !== String(targetUserId))
        : [...currentUser.followerUser, targetUserId];

      const updatedCurrentUserResponse = await axios.put<User>(
        `https://${user_api_key}.mockapi.io/users/Users/${currentUser.id}`,
        {
          followerUser: updatedCurrentUserFollowererUser
        }
      );

      localStorage.setItem("user", JSON.stringify(updatedCurrentUserResponse.data));

      return {
        updatedUser: updatedCurrentUserResponse.data,
        targetUser: updatedTargetUser.data,
      };
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteUser = createAsyncThunk<
  string | number, 
  string | number, 
  { rejectValue: string }
>("user/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    await axios.delete(`https://${user_api_key}.mockapi.io/users/Users/${userId}`);
    return userId; 
  } catch (error: unknown) {
    return rejectWithValue(handleApiError(error));
  }
});

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
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch users";
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string | number>) => {
        state.isLoading = false;
        state.users = state.users.filter((user) => String(user.id) !== String(action.payload));
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to delete user";
      })
      .addCase(toggleFollowUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleFollowUser.fulfilled, (state, action: PayloadAction<{ updatedUser: User; targetUser: User }>) => {
        state.isLoading = false;
        state.user = action.payload.updatedUser;
        const targetIndex = state.users.findIndex(
          (user) => String(user.id) === String(action.payload.targetUser.id)
        );
        if (targetIndex !== -1) {
          state.users[targetIndex] = action.payload.targetUser;
        }
      })
      .addCase(toggleFollowUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to toggle follow status.";
      });
  },
});

export const { logout } = userSlice.actions;

const selectUserState = (state: { user: UserState }) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserState],
  (userState) => userState.user
);

export const selectAllUsers = createSelector(
  [selectUserState],
  (userState) => userState.users
);

export const selectUserIsLoading = createSelector(
  [selectUserState],
  (userState) => userState.isLoading
);

export default userSlice.reducer;