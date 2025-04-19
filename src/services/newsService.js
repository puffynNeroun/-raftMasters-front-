import  api  from './api';

export const newsService = {
    getAll: () => api.get('/news'),
    getById: (id) => api.get(`/news/${id}`),

};
