import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { newsService } from '../../services/newsService';

// Получение всех новостей
export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async (_, { rejectWithValue }) => {
        try {
            const response = await newsService.getAll();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки новостей');
        }
    }
);

export const fetchNewsById = createAsyncThunk(
    'news/fetchNewsById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await newsService.getById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки новости');
        }
    }
);


// Слайс новостей
const newsSlice = createSlice({
    name: 'news',
    initialState: {
        news: [],
        selectedNews: null,
        loading: false,
        error: null,
    },
    reducers: {
        // (если в будущем нужны будут локальные действия)
    },
    extraReducers: builder => {
        builder
            .addCase(fetchNews.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchNewsById.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewsById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedNews = action.payload;
            })
            .addCase(fetchNewsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default newsSlice.reducer;
