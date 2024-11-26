import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { user_api_key } from "../Users/userSlice";

interface Comment {
  id: number;
  userId: number;
  comment: string;
  postId: number;
  created: string;
  username: string;
  userPP: string;
}

interface User {
  id: number;
  name: string;
  profilePicture: string;
}

interface Post {
  id: number;
  title: string;
}

interface CommentWithDetails {
  id: number;
  comment: string;
  created: string;
  post: Post;
  user: User;
}

interface CommentState {
  commentsWithDetails: CommentWithDetails[];
  isLoading: boolean;
  error: string | null;
}

const savedComments = localStorage.getItem("commentsWithDetails");
const initialState: CommentState = {
  commentsWithDetails: savedComments ? JSON.parse(savedComments) : [],
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
      const post = posts.find((post: Post) => post.id === comment.postId);
      const user = users.find((user: User) => user.id === comment.userId);

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

// Add new comment
export const sendComment = createAsyncThunk<
  CommentWithDetails,
  { comment: string; postId: number },
  { state: { user: UserState }; rejectValue: string }
>(
  "comments/sendComment",
  async ({ comment, postId }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const currentUser = state.user.user;

      if (!currentUser) {
        return rejectWithValue("User not logged in");
      }

      const response = await axios.post(
        `https://${comment_api}.mockapi.io/comments`,
        {
          userId: currentUser.id,
          comment,
          postId,
          created: new Date().toISOString(),
          username: currentUser.username,
          userPP: currentUser.profilePictures,
        }
      );
      const createdComment = response.data;

      return {
        id: createdComment.id,
        comment: createdComment.comment,
        created: createdComment.created,
        postID : createdComment.postId,
        user: {
          id: currentUser.id,
          name: currentUser.username,
          profilePicture: currentUser.profilePictures,
        },
      };
    } catch (error: any) {
      return rejectWithValue("Failed to send comment to the API");
    }
  }
);

// Slice and reducer
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    getAllComments: (state) => state.commentsWithDetails,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        checkup.fulfilled,
        (state, action: PayloadAction<CommentWithDetails[]>) => {
          state.isLoading = false;
          state.commentsWithDetails = action.payload;
          localStorage.setItem(
            "commentsWithDetails",
            JSON.stringify(state.commentsWithDetails)
          );
        }
      )
      .addCase(
        sendComment.fulfilled,
        (state, action: PayloadAction<CommentWithDetails>) => {
          state.isLoading = false;
          state.commentsWithDetails.push(action.payload);

          localStorage.setItem(
            "commentsWithDetails",
            JSON.stringify(state.commentsWithDetails)
          );
        }
      );
  },
});

// Export the getAllComments selector
export const { getAllComments } = commentSlice.actions;

export default commentSlice.reducer;
