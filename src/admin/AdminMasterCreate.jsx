import { useState, useEffect } from 'react';
import { adminApi } from '../services/adminService';
import { useNavigate } from 'react-router-dom';

const AdminMasterCreate = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: '',
        categoryId: '',
        regionId: '',
        shortDescription: '',
        biography: '',
        contactEmail: '',
        contactPhone: '',
        socialLinks: '',
        photo: null
    });

    const [categories, setCategories] = useState([]);
    const [regions, setRegions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cats, regs] = await Promise.all([
                    adminApi.get('/api/categories'),
                    adminApi.get('/api/regions'),
                ]);
                setCategories(cats.data);
                setRegions(regs.data);
            } catch (err) {
                console.error(err);
                setError('Ошибка загрузки данных');
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo') {
            setForm(prev => ({ ...prev, photo: files[0] }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in form) {
            formData.append(key, form[key]);
        }

        try {
            await adminApi.post('/api/masters', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/admin/masters');
        } catch (err) {
            console.error(err);
            setError('Ошибка при создании мастера');
        }
    };

    return (
        <section className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Создание мастера</h1>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
                <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="ФИО" required className="border p-2" />

                <select name="categoryId" value={form.categoryId} onChange={handleChange} required className="border p-2">
                    <option value="">Выберите категорию</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                <select name="regionId" value={form.regionId} onChange={handleChange} required className="border p-2">
                    <option value="">Выберите регион</option>
                    {regions.map(reg => (
                        <option key={reg.id} value={reg.id}>{reg.name}</option>
                    ))}
                </select>

                <input name="contactEmail" value={form.contactEmail} onChange={handleChange} placeholder="Email" className="border p-2" />
                <input name="contactPhone" value={form.contactPhone} onChange={handleChange} placeholder="Телефон" className="border p-2" />
                <input name="socialLinks" value={form.socialLinks} onChange={handleChange} placeholder="Соц. сети (через ,)" className="border p-2" />

                <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="Краткое описание" className="border p-2 md:col-span-2" rows={2} />
                <textarea name="biography" value={form.biography} onChange={handleChange} placeholder="Биография" className="border p-2 md:col-span-2" rows={4} />

                <div className="md:col-span-2">
                    <label className="block mb-2 font-medium">Фото мастера</label>
                    <input type="file" name="photo" accept="image/*" onChange={handleChange} className="block w-full" />
                </div>

                <button type="submit" className="md:col-span-2 py-3 bg-[#DAAB50] text-white font-semibold rounded hover:bg-[#c7993e] transition">
                    Создать мастера
                </button>
            </form>
        </section>
    );
};

export default AdminMasterCreate;