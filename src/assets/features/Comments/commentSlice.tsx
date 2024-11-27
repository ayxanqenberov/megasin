import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { user_api_key } from "../Users/userSlice";

interface Comment {
  id: string;
  userId: number;
  comment: string;
  postId: number;
  created: string;
}

interface User {
  id: number;
  username: string;
  profilePictures: string;
}

interface Post {
  id: number;
  title: string;
}

interface CommentWithDetails {
  id: string;
  comment: string;
  created: string;
  post: Post | null;
  user: User | null;
}

interface CommentState {
  commentsWithDetails: CommentWithDetails[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  commentsWithDetails: [],
  isLoading: false,
  error: null,
};

export const comment_api = import.meta.env.VITE_COMMENT_API_KEY;

export const checkup = createAsyncThunk<
  CommentWithDetails[],
  void,
  { rejectValue: string }
>("comments/checkup", async (_, { rejectWithValue }) => {
  try {
    const [commentsRes, postsRes, usersRes] = await Promise.all([
      axios.get(`https://${comment_api}.mockapi.io/comments`),
      axios.get(`https://${user_api_key}.mockapi.io/Posts`),
      axios.get(`https://${user_api_key}.mockapi.io/Users`),
    ]);

    const comments = commentsRes.data;
    const posts = postsRes.data;
    const users = usersRes.data;

    const commentsWithDetails = comments.map((comment: Comment) => {
      const post = posts.find((post: Post) => post.id === comment.postId) || null;
      const user = users.find((user: User) => user.id === comment.userId) || null;

      return {
        id: comment.id,
        comment: comment.comment,
        created: comment.created,
        post,
        user,
      };
    });

    return commentsWithDetails;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch comment details");
  }
});

export const sendComment = createAsyncThunk<
  CommentWithDetails,
  { comment: string; postId: number },
  { state: { user: any }; rejectValue: string }
>("comments/sendComment", async ({ comment, postId }, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const currentUser = state.user.user;

    if (!currentUser) {
      return rejectWithValue("User not logged in");
    }

    const response = await axios.post(`https://${comment_api}.mockapi.io/comments`, {
      userId: currentUser.id,
      comment,
      postId,
      created: new Date().toISOString(),
    });

    const createdComment = response.data;

    return {
      id: createdComment.id,
      comment: createdComment.comment,
      created: createdComment.created,
      post: { id: postId, title: "Post Title Placeholder" }, // Post bilgisi olmayabilir
      user: {
        id: currentUser.id,
        username: currentUser.username,
        profilePictures: currentUser.profilePictures,
      },
    };
  } catch (error: any) {
    return rejectWithValue("Failed to send comment to the API");
  }
});

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkup.fulfilled, (state, action: PayloadAction<CommentWithDetails[]>) => {
        state.isLoading = false;
        state.commentsWithDetails = action.payload;
      })
      .addCase(checkup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch comments";
      })
      .addCase(sendComment.fulfilled, (state, action: PayloadAction<CommentWithDetails>) => {
        state.commentsWithDetails.push(action.payload);
      });
  },
});

export default commentSlice.reducer;
