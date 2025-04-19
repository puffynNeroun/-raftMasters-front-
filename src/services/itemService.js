// src/services/itemService.js
import api from './api';

export const itemService = {
    getAll: (params) => api.get('/items', { params }),
    getById: (id) => api.get(`/items/${id}`),
};
