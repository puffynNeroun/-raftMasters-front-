// src/admin/AdminMasters.jsx
import { useEffect, useState } from 'react';
import { adminApi } from '../services/adminService';
import { useNavigate } from 'react-router-dom';

const AdminMasters = () => {
    const [masters, setMasters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchMasters = async () => {
        try {
            const response = await adminApi.get('/api/masters')

            setMasters(response.data);
        } catch (err) {
            console.error(err);
            setError('Ошибка загрузки мастеров');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Удалить этого мастера?')) return;
        try {
            await adminApi.delete(`/api/masters/${id}`)

            setMasters(prev => prev.filter(master => master.id !== id));
        } catch (err) {
            console.error(err);
            alert('Ошибка удаления мастера');
        }
    };

    useEffect(() => {
        fetchMasters();
    }, []);

    return (
        <section className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Управление мастерами</h1>

            {loading && <p>Загрузка...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && masters.length === 0 && (
                <p className="text-gray-500">Мастера отсутствуют.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {masters.map(master => (
                    <div key={master.id} className="bg-white rounded shadow p-4 flex flex-col justify-between">
                        <div>
                            <img
                                src={master.photo ? `http://localhost:5000${master.photo}` : 'https://via.placeholder.com/300x200?text=Мастер'}
                                alt={master.fullName}
                                className="w-full h-48 object-cover rounded mb-4"
                            />
                            <h2 className="text-xl font-semibold mb-1">{master.fullName}</h2>
                            <p className="text-gray-600 text-sm mb-1">
                                {master.shortDescription}
                            </p>
                            <p className="text-sm text-gray-500">
                                Категория: <strong>{master.category?.name}</strong>
                            </p>
                            <p className="text-sm text-gray-500">
                                Регион: <strong>{master.region?.name}</strong>
                            </p>
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => handleDelete(master.id)}
                                className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Удалить
                            </button>
                            <button
                                onClick={() => navigate(`/admin/masters/edit/${master.id}`)}
                                className="flex-1 py-2 bg-[#DAAB50] text-white rounded hover:bg-[#c7993e] transition"
                            >
                                Редактировать
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => navigate('/admin/masters/create')}
                className="mb-6 px-6 py-3 bg-[#DAAB50] text-white font-semibold rounded hover:bg-[#c7993e]"
            >
                + Добавить мастера
            </button>
        </section>
    );
};

export default AdminMasters;
