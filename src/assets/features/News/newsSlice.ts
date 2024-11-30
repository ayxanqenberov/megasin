import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { comment_api } from '../Admin/adminSlice';

interface News {
  id: string;
  title: string;
  content: string;
  pict: string;
  createdAt: string;
}

interface NewsState {
  news: News[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: NewsState = {
  news: [],
  status: 'idle',
};

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await axios.get(`https://${comment_api}.mockapi.io/news`);
  return response.data;
});
export const createNews = createAsyncThunk('news/createNews', async (newsData: News) => {
  const response = await axios.post(`https://${comment_api}.mockapi.io/news`, newsData);
  return response.data;
});
export const deleteNews = createAsyncThunk('news/deleteNews', async (id: string) => {
  await axios.delete(`https://${comment_api}.mockapi.io/news/${id}`);
  return id;
});
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
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<News[]>) => {
        state.status = 'idle';
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.status = 'failed';
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
