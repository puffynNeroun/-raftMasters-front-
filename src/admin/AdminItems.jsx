// src/admin/AdminItems.jsx
import { useEffect, useState } from 'react';
import { adminApi } from '../services/adminService';
import { useNavigate } from 'react-router-dom';

const AdminItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchItems = async () => {
        try {
            const response = await adminApi.get('/api/items');
            setItems(response.data);
        } catch (err) {
            console.error(err);
            setError('Ошибка загрузки изделий');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Удалить это изделие?')) return;
        try {
            await adminApi.delete(`/api/items/${id}`);
            setItems(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error(err);
            alert('Ошибка удаления изделия');
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <section className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Управление изделиями</h1>

            {loading && <p>Загрузка...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && items.length === 0 && (
                <p className="text-gray-500">Нет изделий для отображения.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                    <div key={item.id} className="bg-white rounded shadow p-4 flex flex-col justify-between">
                        <div>
                            <img
                                src={item.mainImage ? `http://localhost:5000${item.mainImage}` : 'https://via.placeholder.com/300x200?text=Изделие'}
                                alt={item.name}
                                className="w-full h-48 object-cover rounded mb-4"
                            />
                            <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
                            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                            <p className="text-[#DAAB50] font-bold">₴{item.price}</p>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Удалить
                            </button>
                            <button
                                onClick={() => navigate(`/admin/items/edit/${item.id}`)}
                                className="flex-1 py-2 bg-[#DAAB50] text-white rounded hover:bg-[#c7993e] transition"
                            >
                                Редактировать
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AdminItems;
