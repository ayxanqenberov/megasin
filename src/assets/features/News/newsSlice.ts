import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { comment_api } from '../Admin/adminSlice';

export interface News {
  id: string;
  title: string;
  content: string;
  pict: string;
  createdAt: string;
}

interface NewsState {
  news: News[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  status: 'idle',
  error: null,
};

export const fetchNews = createAsyncThunk<News[], void, { rejectValue: string }>(
  'news/fetchNews', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<News[]>(`https://${comment_api}.mockapi.io/news`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch news');
    }
  }
);

// Yeni haber eklerken henüz id oluşmadığı için id alanını Omit kullanarak hariç bıraktık
export const createNews = createAsyncThunk<News, Omit<News, 'id'>, { rejectValue: string }>(
  'news/createNews', 
  async (newsData, { rejectWithValue }) => {
    try {
      const response = await axios.post<News>(`https://${comment_api}.mockapi.io/news`, newsData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create news');
    }
  }
);

export const deleteNews = createAsyncThunk<string, string, { rejectValue: string }>(
  'news/deleteNews', 
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`https://${comment_api}.mockapi.io/news/${id}`);
      return id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete news');
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    sortNewsByDate: (state) => {
      state.news.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
    sortNewsAlphabetically: (state) => {
      state.news.sort((a, b) => a.title.localeCompare(b.title));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<News[]>) => {
        state.status = 'idle';
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(createNews.fulfilled, (state, action: PayloadAction<News>) => {
        state.news.unshift(action.payload); 
      })
      .addCase(deleteNews.fulfilled, (state, action: PayloadAction<string>) => {
        state.news = state.news.filter((news) => news.id !== action.payload);
      });
  },
});

export const { sortNewsByDate, sortNewsAlphabetically } = newsSlice.actions;

export default newsSlice.reducer;