import api from './api.js'

/**
 * Получение всех категорий
 */
export const fetchCategories = async () => {
    const response = await api.get('/categories')
    return response.data
}

/**
 * Создание новой категории
 * @param {{ name: string, description?: string }} category
 */
export const createCategory = async (category) => {
    const response = await api.post('/categories', category)
    return response.data
}

/**
 * Удаление категории по ID
 * @param {number} id
 */
export const deleteCategory = async (id) => {
    await api.delete(`/categories/${id}`)
}
