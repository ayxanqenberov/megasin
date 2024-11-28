import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  username: string;
  email: string;
  profilePictures: string;
  follower: number;
  password: string; 
  bio: string;
  bannerPict: string;
  createdAccount: Date;
  followerUser: number[];
}

interface UserState {
  user: User | null;
  users:[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: (() => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  })(),
  users: [],
  isLoading: false,
  error: null,
};


export const user_api_key = import.meta.env.VITE_USER_API_KEY
const handleApiError = (error: any) => error.response?.data?.message || error.message || "Something went wrong";
export const registerUser = createAsyncThunk<User, { email: string; password: string; username: string }, { rejectValue: string }>(
  "user/registerUser",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const existingUsers = await axios.get(`https://${user_api_key}.mockapi.io/users/Users`);
      const usernameExists = existingUsers.data.some((user: User) => user.username === username);
      const emailExists = existingUsers.data.some((user: User) => user.email === email);

      if (usernameExists) throw new Error("Username already in use.");
      if (emailExists) throw new Error("Email already in use.");

      const response = await axios.post(`https://${user_api_key}.mockapi.io/users/Users`, {
        email,
        username,
        profilePictures: "https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798821_clzISlzMqjLxx8YjYFBfOaVvIj5qifwm.jpg",
        follower: 0,
        bio:"Add more information about yourself",
        password,
        bannerPict: "",
        createdAccount: new Date().toISOString(),
      });

      // localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const followUser  = createAsyncThunk<
  User,
  string, // userId
  { rejectValue: string }
>("user/followUser ", async (userId, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { user: UserState };
    const currentUser  = state.user.user; // Get the current user from the state

    if (!currentUser ) {
      throw new Error("User  not logged in.");
    }

    // Update the followUsers array
    const updatedFollowUsers = [...currentUser .followerUser , parseInt(userId)];

    const response = await axios.put(`https://${user_api_key}.mockapi.io/users/Users/${currentUser .id}`, {
      follower:User = updatedFollowUsers,
    });

    // Update localStorage if needed
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data; // Return the updated user data
  } catch (error: any) {
    return rejectWithValue(handleApiError(error));
  }
});
export const updateData = createAsyncThunk<User, { id: string; username?: string; email?: string; bio?: string; profilePictures?: string; bannerPict?: string }, { rejectValue: string }>(
  "user/updateData",
  async ({ id, username, email, bio, profilePictures, bannerPict }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://${user_api_key}.mockapi.io/users/Users/${id}`, {
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

interface Posts {
  id: number;
  username:string;
  userId:number;
  likeCount:number;
  content:string;
  comentCount: number;
  postPicture:string;
  tags: object;
  title:string;
  createdAt:Date;
}
// const posting = createAsyncThunk<Posts>
export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://${user_api_key}.mockapi.io/users/Users`);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
export const loginUser = createAsyncThunk<User, { username: string; password: string }, { rejectValue: string }>(
  "user/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://${user_api_key}.mockapi.io/users/Users`);
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
export const toggleFollowUser = createAsyncThunk<
  { updatedUser: User; targetUser: User },
  { targetUserId: number },
  { rejectValue: string; state: { user: UserState } }
>("user/toggleFollowUser", async ({ targetUserId }, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const currentUser = state.user.user;

    if (!currentUser) throw new Error("User not logged in.");

    const isFollowing = currentUser.followerUser.includes(targetUserId);

    const updatedFollowerUsers = isFollowing
      ? currentUser.followerUser.filter((id) => id !== targetUserId)
      : [...currentUser.followerUser, targetUserId];

    const updatedCurrentUser = await axios.put(
      `https://${user_api_key}.mockapi.io/users/Users/${currentUser.id}`,
      { followerUser: updatedFollowerUsers }
    );

    const targetUserResponse = await axios.get(
      `https://${user_api_key}.mockapi.io/users/Users/${targetUserId}`
    );

    const targetUser = targetUserResponse.data;
    const updatedTargetFollowerUsers = isFollowing
      ? targetUser.followerUser.filter((id: number) => id !== currentUser.id)
      : [...targetUser.followerUser, currentUser.id];

    const updatedTargetUser = await axios.put(
      `https://${user_api_key}.mockapi.io/users/Users/${targetUserId}`,
      { followerUser: updatedTargetFollowerUsers }
    );

    localStorage.setItem("user", JSON.stringify(updatedCurrentUser.data));

    return { updatedUser: updatedCurrentUser.data, targetUser: updatedTargetUser.data };
  } catch (error: any) {
    return rejectWithValue(handleApiError(error));
  }
});

export const deleteUser = createAsyncThunk<
  string, 
  string, 
  { rejectValue: string }
>("user/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    await axios.delete(`https://${user_api_key}.mockapi.io/users/Users/${userId}`);
    return userId; 
  } catch (error: any) {
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
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.users = state.users.filter((user) => user.id !== parseInt(action.payload)); // Remove the deleted user
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to delete user";
      })
      .addCase(toggleFollowUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        toggleFollowUser.fulfilled,
        (state, action: PayloadAction<{ updatedUser: User; targetUser: User }>) => {
          state.isLoading = false;
          state.user = action.payload.updatedUser;
          const targetIndex = state.users.findIndex(
            (user) => user.id === action.payload.targetUser.id
          );
          if (targetIndex !== -1) {
            state.users[targetIndex] = action.payload.targetUser;
          }
        }
      )
      .addCase(toggleFollowUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to toggle follow status.";
      });
      
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
