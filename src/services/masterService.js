import api from './api.js'

/**
 * Получение всех мастеров
 * Можно использовать query-параметры: craft, region
 */
export const fetchMasters = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString()
    const response = await api.get(`/masters${params ? `?${params}` : ''}`)
    return response.data
}

/**
 * Получение одного мастера по ID
 * @param {number} id
 */
export const fetchMasterById = async (id) => {
    const response = await api.get(`/masters/${id}`)
    return response.data
}

/**
 * Получение достижений мастера по ID
 * @param {number} masterId
 */
export const fetchMasterAchievements = async (masterId) => {
    const response = await api.get(`/masters/${masterId}/achievements`)
    return response.data
}
