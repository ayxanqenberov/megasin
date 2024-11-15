import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/app/store"; 
import axios from "axios";
interface Posts {
  id: number;
  username: string;
  userId: number;
  likeCount: number;
  content: string;
  comentCount: number;
  postPicture: string;
  tags: object;
  title: string;
  createdAt: string; 
  profilePicture:string;
}

export const createPost = createAsyncThunk<Posts, { title: string; content: string; postPicture: string }, { rejectValue: string }>(
  "posts/createPost",
  async ({ title, content, postPicture }, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState; 
      const userName = state.user.user?.username
      const userID = state.user.user?.id;
      const pp = state.user.user?.profilePictures
      if (!userID || !userName) {
        throw new Error("User not logged in");
      }

      const res = await axios.post("https://672e97cf229a881691f07176.mockapi.io/megasin/posts", {
        title,
        content,
        userId: userID, 
        username:userName,
        postPicture,
        likeCount: 0,
        comentCount: 0,
        profilePicture:pp,
        createdAt: new Date().toISOString(),
      });

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create post"); 
    }
  }
);
// In postsSlice.ts
export const fetchPosts = createAsyncThunk<Posts[], void, { rejectValue: string }>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://672e97cf229a881691f07176.mockapi.io/megasin/posts");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch posts");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [] as Posts[],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Posts[]>) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch posts";
      });
  },
  
});

export default postsSlice.reducer;
