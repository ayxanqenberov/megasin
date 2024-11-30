import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/app/store";
import axios from "axios";
import { user_api_key } from "../Users/userSlice";

export interface Posts {
  id: number;
  username: string;
  userId: number;
  likeCount: number;
  likedUsers: number[];
  commentUsers: number[];
  content: string;
  comentCount: number;
  postPicture: string;
  tags: object;
  title: string;
  createdAt: Date;
  profilePicture: string;
  formats: string[]; // Stil bilgileri
}

interface PostState {
  posts: Posts[];
  isLoading: boolean;
  error: string | null;
  likedPosts: number[];
}

const initialState: PostState = {
  posts: [],
  isLoading: false,
  error: null,
  likedPosts: [],
};

// Yeni gönderi oluşturma
export const createPost = createAsyncThunk<
  Posts,
  { title: string; content: string; postPicture: string; formats: string[] },
  { rejectValue: string }
>(
  "posts/createPost",
  async ({ title, content, postPicture, formats }, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const userName = state.user.user?.username;
      const userID = state.user.user?.id;
      const pp = state.user.user?.profilePictures;

      if (!userID || !userName) {
        throw new Error("User not logged in");
      }

      const res = await axios.post(`https://${user_api_key}.mockapi.io/users/Posts`, {
        title,
        content,
        userId: userID,
        username: userName,
        postPicture,
        likeCount: 0,
        comentCount: 0,
        profilePicture: pp,
        createdAt: new Date().toISOString(),
        likedUsers: [],
        formats, // Stil bilgilerini kaydediyoruz
      });

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create post");
    }
  }
);

// Gönderileri getirme
export const fetchPosts = createAsyncThunk<Posts[], void, { rejectValue: string }>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const postsResponse = await axios.get(
        `https://${user_api_key}.mockapi.io/users/Posts`
      );
      const usersResponse = await axios.get(
        `https://${user_api_key}.mockapi.io/users/Users`
      );

      const users = usersResponse.data;
      const posts = postsResponse.data.map((post: any) => {
        const user = users.find((u: any) => u.id === post.userId);
        return {
          ...post,
          username: user?.username || "Unknown",
          profilePicture: user?.profilePicture || "",
        };
      });

      return posts;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch posts");
    }
  }
);

// Gönderiyi beğenme
export const likedPost = createAsyncThunk<
  Posts,
  { id: number },
  { rejectValue: string; state: RootState }
>(
  "posts/likedPost",
  async ({ id }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const user = state.user.user;
      const post = state.posts.posts.find((post) => post.id === id);

      if (!user) {
        throw new Error("User not logged in");
      }
      if (!post) {
        throw new Error("Post not found");
      }

      const isLiked = post.likedUsers.includes(user.id);
      const updatedLikedUsers = isLiked
        ? post.likedUsers.filter((userId) => userId !== user.id)
        : [...post.likedUsers, user.id];

      const response = await axios.put(
        `https://${user_api_key}.mockapi.io/users/Posts/${id}`,
        { likedUsers: updatedLikedUsers }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update like");
    }
  }
);

// Gönderi silme
export const deletePosts = createAsyncThunk<string, string, { rejectValue: string }>(
  "posts/deletePosts",
  async (postId, { rejectWithValue }) => {
    try {
      await axios.delete(`https://${user_api_key}.mockapi.io/users/Posts/${postId}`);
      return postId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete post"
      );
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Posts[]>) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Posts>) => {
        state.posts.push(action.payload);
      })
      .addCase(likedPost.fulfilled, (state, action: PayloadAction<Posts>) => {
        const updatedPost = action.payload;
        const postIndex = state.posts.findIndex(
          (post) => post.id === updatedPost.id
        );
        if (postIndex !== -1) {
          state.posts[postIndex] = updatedPost;
        }
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
