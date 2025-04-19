import { useNavigate } from 'react-router-dom';
import { logoutAdmin, isAdmin } from '../services/adminService';
import { useEffect } from 'react';

const AdminPanel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin()) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        logoutAdmin();
        navigate('/admin/login');
    };

    return (
        <section className="min-h-screen bg-[#F5F5F5] p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Админ-панель</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Выйти
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <button
                    onClick={() => navigate('/admin/categories')}
                    className="bg-[#DAAB50] hover:bg-[#c7993e] text-white font-bold py-4 px-6 rounded shadow-md transition"
                >
                    📂 Управление категориями
                </button>

                <button
                    onClick={() => navigate('/admin/items')}
                    className="bg-[#DAAB50] hover:bg-[#c7993e] text-white font-bold py-4 px-6 rounded shadow-md transition"
                >
                    🛍️ Управление изделиями
                </button>

                <button
                    onClick={() => navigate('/admin/items/create')}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded shadow-md transition"
                >
                    ➕ Добавить изделие
                </button>

                <button
                    onClick={() => navigate('/admin/news')}
                    className="bg-[#DAAB50] hover:bg-[#c7993e] text-white font-bold py-4 px-6 rounded shadow-md transition"
                >
                    📰 Управление новостями
                </button>

                <button
                    onClick={() => navigate('/admin/masters')}
                    className="bg-[#DAAB50] hover:bg-[#c7993e] text-white font-bold py-4 px-6 rounded shadow-md transition"
                >
                    👨‍🎨 Управление мастерами
                </button>
            </div>
        </section>
    );
};

export default AdminPanel;
