import { useEffect, useState } from 'react';
import { adminApi } from '../services/adminService';
import { useNavigate } from 'react-router-dom';

const AdminNews = () => {
    const [newsList, setNewsList] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchNews = async () => {
        try {
            const res = await adminApi.get('/api/news');
            setNewsList(res.data.reverse()); // от новых к старым
        } catch (err) {
            setError('Ошибка при получении новостей');
        }
    };

    const handleAddNews = async (e) => {
        e.preventDefault();

        if (!title || !content || !type) {
            return setError('Заполните все поля');
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('type', type);
        if (image) formData.append('image', image);

        try {
            await adminApi.post('/api/news', formData);
            setTitle('');
            setContent('');
            setType('');
            setImage(null);
            setError('');
            fetchNews();
        } catch (err) {
            setError('Ошибка при создании новости');
        }
    };

    const handleDelete = async (id) => {
        try {
            await adminApi.delete(`/api/news/${id}`);
            fetchNews();
        } catch {
            setError('Ошибка при удалении');
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <section className="min-h-screen bg-[#f5f5f5] p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Управление новостями</h1>
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="bg-[#DAAB50] hover:bg-[#c4993f] text-white px-4 py-2 rounded"
                >
                    Назад
                </button>
            </div>

            {/* Форма добавления */}
            <form
                onSubmit={handleAddNews}
                className="bg-white p-6 rounded shadow mb-6"
                encType="multipart/form-data"
            >
                <h2 className="text-xl font-semibold mb-4">Добавить новость</h2>
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-3 p-3 border border-gray-300 rounded"
                />
                <textarea
                    placeholder="Контент"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    className="w-full mb-3 p-3 border border-gray-300 rounded resize-none"
                />
                <input
                    type="text"
                    placeholder="Тип (например: объявление, событие)"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full mb-3 p-3 border border-gray-300 rounded"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full mb-3"
                />

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
                >
                    Добавить новость
                </button>
            </form>

            {/* Список новостей */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newsList.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-4 rounded shadow flex flex-col justify-between"
                    >
                        {item.image && (
                            <img
                                src={`http://localhost:5000${item.image}`}
                                alt={item.title}
                                className="w-full h-48 object-cover rounded mb-3"
                            />
                        )}
                        <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.type}</p>
                        <p className="text-gray-800 text-sm mb-3">{item.content}</p>
                        <p className="text-xs text-gray-400 mb-2">
                            {new Date(item.publishedDate).toLocaleString()}
                        </p>
                        <button
                            onClick={() => handleDelete(item.id)}
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

export default AdminNews;
