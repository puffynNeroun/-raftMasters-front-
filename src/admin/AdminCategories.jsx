import { useEffect, useState } from 'react';
import { adminApi } from '../services/adminService';
import { useNavigate } from 'react-router-dom';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const res = await adminApi.get('/api/categories');
            setCategories(res.data.reverse());
        } catch (err) {
            setError('Ошибка при получении категорий');
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError('Введите название категории');
            return;
        }

        try {
            await adminApi.post('/api/categories', { name, description });
            setName('');
            setDescription('');
            setError('');
            fetchCategories();
        } catch (err) {
            setError('Ошибка при создании категории');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Удалить эту категорию?')) return;

        try {
            await adminApi.delete(`/api/categories/${id}`);
            fetchCategories();
        } catch (err) {
            setError('Ошибка при удалении категории');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <section className="min-h-screen bg-[#f5f5f5] p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Управление категориями</h1>
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="bg-[#DAAB50] hover:bg-[#c4993f] text-white px-4 py-2 rounded"
                >
                    Назад
                </button>
            </div>

            {/* Форма добавления категории */}
            <form
                onSubmit={handleAddCategory}
                className="bg-white p-6 rounded shadow mb-6"
            >
                <h2 className="text-xl font-semibold mb-4">Добавить категорию</h2>
                <input
                    type="text"
                    placeholder="Название"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-3 p-3 border border-gray-300 rounded"
                />
                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full mb-3 p-3 border border-gray-300 rounded resize-none"
                />
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
                >
                    Добавить
                </button>
            </form>

            {/* Список категорий */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="bg-white p-4 rounded shadow flex flex-col justify-between"
                    >
                        <h3 className="text-xl font-bold mb-1">{cat.name}</h3>
                        {cat.description && (
                            <p className="text-sm text-gray-700 mb-2">{cat.description}</p>
                        )}
                        <button
                            onClick={() => handleDelete(cat.id)}
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded self-end"
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AdminCategories;
