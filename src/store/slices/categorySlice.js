import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCategories, createCategory, deleteCategory } from '../../services/categoryService'

export const loadCategories = createAsyncThunk(
    'category/load',
    async () => await fetchCategories()
)

export const addCategory = createAsyncThunk(
    'category/add',
    async (category) => await createCategory(category)
)

export const removeCategory = createAsyncThunk(
    'category/remove',
    async (id) => {
        await deleteCategory(id)
        return id
    }
)

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCategories.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loadCategories.fulfilled, (state, action) => {
                state.loading = false
                state.categories = action.payload
            })
            .addCase(loadCategories.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload)
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter((cat) => cat.id !== action.payload)
            })
    },
})

export default categorySlice.reducer
