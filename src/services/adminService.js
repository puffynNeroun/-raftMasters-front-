// src/services/adminService.js
import api  from './api';

const ADMIN_TOKEN_KEY = 'adminToken';

/**
 * Сохраняет токен администратора, если он совпадает с секретом.
 * @param {string} password - Введённый пользователем пароль
 * @returns {boolean} - true если логин успешен
 */
export const adminLogin = (password) => {
    if (password === import.meta.env.VITE_ADMIN_SECRET) {
        localStorage.setItem(ADMIN_TOKEN_KEY, password);
        return true;
    }
    return false;
};

/**
 * Возвращает токен администратора из localStorage
 * @returns {string|null}
 */
export const getAdminToken = () => {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
};

/**
 * Удаляет токен администратора (выход)
 */
export const logoutAdmin = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
};

/**
 * Проверяет, авторизован ли пользователь как админ
 * @returns {boolean}
 */
export const isAdmin = () => {
    const token = getAdminToken();
    return token === import.meta.env.VITE_ADMIN_SECRET;
};

/**
 * Возвращает экземпляр axios с заголовком Authorization
 */
export const adminApi = api.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// Добавляем токен в каждый запрос динамически
adminApi.interceptors.request.use((config) => {
    const token = getAdminToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
