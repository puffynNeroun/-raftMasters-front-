import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './slices/categorySlice'
import masterReducer from './slices/masterSlice'

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        master: masterReducer,

    },
})
