import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, isAdmin } from '../services/adminService';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = adminLogin(password);
        if (success) {
            navigate('/admin/dashboard'); // Перенаправляем в админку
        } else {
            setError('Неверный пароль администратора');
        }
    };

    // Если уже авторизован — редирект
    if (isAdmin()) {
        navigate('/admin/dashboard');
        return null;
    }

    return (
        <section className="min-h-screen flex justify-center items-center bg-[#1A1A4B] px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Вход в админ-панель</h2>
                <input
                    type="password"
                    placeholder="Введите секретный пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#DAAB50]"
                />
                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}
                <button
                    type="submit"
                    className="w-full py-3 bg-[#DAAB50] text-white font-bold rounded hover:bg-[#c4993f] transition"
                >
                    Войти
                </button>
            </form>
        </section>
    );
};

export default AdminLogin;
