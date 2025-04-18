import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    fetchMasters,
    fetchMasterById,
    fetchMasterAchievements
} from '../../services/masterService.js'

// Получение всех мастеров (с фильтрами опционально)
export const loadMasters = createAsyncThunk(
    'masters/load',
    async (filters = {}) => await fetchMasters(filters)
)

// Получение одного мастера
export const loadMasterById = createAsyncThunk(
    'masters/loadById',
    async (id) => await fetchMasterById(id)
)

// Получение достижений мастера
export const loadMasterAchievements = createAsyncThunk(
    'masters/loadAchievements',
    async (id) => await fetchMasterAchievements(id)
)

const masterSlice = createSlice({
    name: 'masters',
    initialState: {
        masters: [],
        selectedMaster: null,
        achievements: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedMaster(state) {
            state.selectedMaster = null
            state.achievements = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadMasters.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loadMasters.fulfilled, (state, action) => {
                state.loading = false
                state.masters = action.payload
            })
            .addCase(loadMasters.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            .addCase(loadMasterById.fulfilled, (state, action) => {
                state.selectedMaster = action.payload
            })

            .addCase(loadMasterAchievements.fulfilled, (state, action) => {
                state.achievements = action.payload
            })
    },
})

export const { clearSelectedMaster } = masterSlice.actions
export default masterSlice.reducer
