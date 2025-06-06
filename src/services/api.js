// src/services/api.ts
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // 👈 подставь актуальный адрес бэка
    headers: {
        'Content-Type': 'application/json',
    },
})

export default api
