import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { itemService } from '../../services/itemService';

// Получить все изделия (с фильтрами и поиском)
export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async (params, { rejectWithValue }) => {
        try {
            const response = await itemService.getAll(params);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки изделий');
        }
    }
);

// Получить одно изделие по ID (например, для модалки)
export const fetchItemById = createAsyncThunk(
    'items/fetchItemById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await itemService.getById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки изделия');
        }
    }
);

const itemSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        selectedItem: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedItem(state) {
            state.selectedItem = null;
        },
    },
    extraReducers: builder => {
        builder
            // Все изделия
            .addCase(fetchItems.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Одно изделие
            .addCase(fetchItemById.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItemById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedItem = action.payload;
            })
            .addCase(fetchItemById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSelectedItem } = itemSlice.actions;
export default itemSlice.reducer;
