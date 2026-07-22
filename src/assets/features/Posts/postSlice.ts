import { createAsyncThunk, createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../redux/app/store";
import axios from "axios";
import { user_api_key } from "../Users/userSlice";

interface MockUser {
  id: string | number;
  username: string;
  profilePictures?: string;
}

export interface Posts {
  id: string | number;
  username: string;
  userId: string | number;
  likeCount: number;
  likedUsers: (string | number)[];
  commentUsers?: number[];
  content: string;
  comentCount: number;
  postPicture: string;
  tags: string;
  title: string;
  createdAt: string;
  profilePicture: string;
  formats: string[]; 
}

interface PostState {
  posts: Posts[];
  isLoading: boolean;
  error: string | null;
  likedPosts: (string | number)[];
}

const initialState: PostState = {
  posts: [],
  isLoading: false,
  error: null,
  likedPosts: [],
};

export const createPost = createAsyncThunk<
  Posts,
  { title: string; content: string; postPicture: string; tags: string; formats: string[] },
  { rejectValue: string }
>(
  "posts/createPost",
  async ({ title, content, postPicture, tags, formats }, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const userName = state.user.user?.username;
      const userID = state.user.user?.id;
      const pp = state.user.user?.profilePictures;

      if (!userID || !userName) {
        throw new Error("User not logged in");
      }

      const res = await axios.post<Posts>(`https://${user_api_key}.mockapi.io/users/Posts`, {
        title,
        content,
        userId: userID,
        username: userName,
        postPicture,
        tags,
        likeCount: 0,
        comentCount: 0,
        profilePicture: pp,
        createdAt: new Date().toISOString(),
        likedUsers: [],
        formats, 
      });

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(error instanceof Error ? error.message : "Failed to create post");
    }
  }
);

export const fetchPosts = createAsyncThunk<Posts[], void, { rejectValue: string }>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const postsResponse = await axios.get<Posts[]>(
        `https://${user_api_key}.mockapi.io/users/Posts`
      );
      const usersResponse = await axios.get<MockUser[]>(
        `https://${user_api_key}.mockapi.io/users/Users`
      );

      const users = usersResponse.data;
      const posts = postsResponse.data.map((post: Posts) => {
        const user = users.find((u: MockUser) => String(u.id) === String(post.userId));
        return {
          ...post,
          username: user?.username || "Unknown",
          profilePicture: user?.profilePictures || post.profilePicture || "", 
        };
      });

      return posts;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch posts");
    }
  }
);

export const likedPost = createAsyncThunk<
  Posts,
  { id: string | number },
  { rejectValue: string; state: RootState }
>(
  "posts/likedPost",
  async ({ id }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const user = state.user.user;
      const post = state.posts.posts.find((post) => String(post.id) === String(id));

      if (!user) {
        throw new Error("User not logged in");
      }

      if (!post) {
        throw new Error("Post not found");
      }

      const isLiked = post.likedUsers.map(String).includes(String(user.id));

      const updatedLikedUsers = isLiked
        ? post.likedUsers.filter((userId) => String(userId) !== String(user.id))
        : [...post.likedUsers, user.id];

      const response = await axios.put<Posts>(
        `https://${user_api_key}.mockapi.io/users/Posts/${id}`,
        {
          likedUsers: updatedLikedUsers,
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(error instanceof Error ? error.message : "An error occurred");
    }
  }
);
export const deletePosts = createAsyncThunk<string | number, string | number, { rejectValue: string }>(
  "posts/deletePosts",
  async (postId, { rejectWithValue }) => {
    try {
      await axios.delete(`https://${user_api_key}.mockapi.io/users/Posts/${postId}`);
      return postId;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Failed to delete post");
      }
      return rejectWithValue(error instanceof Error ? error.message : "Failed to delete post");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
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
        state.error = action.payload || "Something went wrong";
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Posts>) => {
        state.posts.push(action.payload);
      })
      .addCase(likedPost.fulfilled, (state, action: PayloadAction<Posts>) => {
        const updatedPost = action.payload;
        const postIndex = state.posts.findIndex(
          (post) => String(post.id) === String(updatedPost.id)
        );
        if (postIndex !== -1) {
          state.posts[postIndex] = updatedPost;
        }
      })
      .addCase(deletePosts.fulfilled, (state, action: PayloadAction<string | number>) => {
        state.posts = state.posts.filter((post) => String(post.id) !== String(action.payload));
      });
  },
});

const selectPostsState = (state: RootState) => state.posts;

export const selectAllPosts = createSelector(
  [selectPostsState],
  (postsState) => postsState.posts
);

export const selectPostsIsLoading = createSelector(
  [selectPostsState],
  (postsState) => postsState.isLoading
);

export const selectPostsError = createSelector(
  [selectPostsState],
  (postsState) => postsState.error
);

export default postsSlice.reducer;