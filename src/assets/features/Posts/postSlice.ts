import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/app/store"; 
import axios from "axios";
import { user_api_key } from "../Users/userSlice";
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
  createdAt: Date; 
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

      const res = await axios.post(`https://${user_api_key}.mockapi.io/users/Posts`, {
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
export const fetchPosts = createAsyncThunk<Posts[], void, { rejectValue: string }>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const postsResponse = await axios.get(`https://${user_api_key}.mockapi.io/users/Posts`);
      const usersResponse = await axios.get(`https://${user_api_key}.mockapi.io/users/Users`);

      const users = usersResponse.data; 
      const posts = postsResponse.data.map((post: any) => {
        const user = users.find((user: any) => user.id === post.userId);
        return {
          ...post,
          username: user?.username || "Unknown",
        };
      });

      return posts;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch posts");
    }
  }
);

export const likedPost = createAsyncThunk<
  Posts,
  { id: number },
  { rejectValue: string; state: RootState }
>(
  "posts/likedPost",
  async ({ id }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const post = state.posts.posts.find((post) => post.id === id);

      if (!post) {
        throw new Error("Post not found");
      }

      const isLiked = state.posts.likedPosts.includes(id);
      const updatedLikeCount = isLiked ? post.likeCount - 1 : post.likeCount + 1;

      const response = await axios.put(
        `https://${user_api_key}.mockapi.io/users/Posts/${id}`,
        { likeCount: updatedLikeCount }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update like count");
    }
  }
);


// const deleteCount = await axios.put(
//   `https://${user_api_key}.mockapi.io/users/Posts/5`,
//   {
//     likeCount: 0,
//   }
// );
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [] as Posts[],
    likedPosts: [] as number[], 
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Posts[]>) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(likedPost.fulfilled, (state, action: PayloadAction<Posts>) => {
        const updatedPost = action.payload;
        const postIndex = state.posts.findIndex((post) => post.id === updatedPost.id);
        if (postIndex !== -1) {
          state.posts[postIndex] = updatedPost; 
        }
        if (state.likedPosts.includes(updatedPost.id)) {
          state.likedPosts = state.likedPosts.filter((id) => id !== updatedPost.id);
        } else {
          state.likedPosts.push(updatedPost.id);
        }
      });
  },
});


export default postsSlice.reducer;
