import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './slices/categorySlice'
import masterReducer from './slices/masterSlice'
import newsReducer from './slices/newsSlice';
import itemReducer from './slices/itemSlice';

export const store = configureStore({
    reducer: {
        news: newsReducer,
        categories: categoryReducer,
        master: masterReducer,
        items: itemReducer,
    },
})
