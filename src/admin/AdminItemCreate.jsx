// src/admin/AdminItemCreate.jsx
import { useEffect, useState } from 'react';
import { adminApi } from '../services/adminService';
import { useNavigate } from 'react-router-dom';

const AdminItemCreate = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        masterId: '',
        categoryId: '',
        subcategoryId: '',
        materialId: '',
        techniqueId: '',
    });
    const [mainImage, setMainImage] = useState(null);

    const [masters, setMasters] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [techniques, setTechniques] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDependencies = async () => {
            try {
                const [mastersRes, categoriesRes, subcatRes, materialsRes, techRes] = await Promise.all([
                    adminApi.get('/api/masters'),
                    adminApi.get('/api/categories'),
                    adminApi.get('/api/subcategories'),
                    adminApi.get('/api/materials'),
                    adminApi.get('/api/techniques'),
                ]);
                setMasters(mastersRes.data);
                setCategories(categoriesRes.data);
                setSubcategories(subcatRes.data);
                setMaterials(materialsRes.data);
                setTechniques(techRes.data);
            } catch (e) {
                setError('Ошибка загрузки данных');
            }
        };
        fetchDependencies();
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleFileChange = (e) => {
        setMainImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value) data.append(key, value);
        });
        if (mainImage) data.append('mainImage', mainImage);

        try {
            await adminApi.post('/api/items', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/admin/items');
        } catch (err) {
            console.error(err);
            setError('Ошибка создания изделия');
        }
    };

    return (
        <section className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Создание нового изделия</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl">
                <input type="text" name="name" placeholder="Название" value={formData.name} onChange={handleChange} className="p-2 border rounded" required />
                <textarea name="description" placeholder="Описание" value={formData.description} onChange={handleChange} className="p-2 border rounded" required />
                <input type="number" step="0.01" name="price" placeholder="Цена" value={formData.price} onChange={handleChange} className="p-2 border rounded" required />

                <select name="masterId" value={formData.masterId} onChange={handleChange} className="p-2 border rounded" required>
                    <option value="">Выберите мастера</option>
                    {masters.map(master => <option key={master.id} value={master.id}>{master.fullName}</option>)}
                </select>

                <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="p-2 border rounded" required>
                    <option value="">Выберите категорию</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>

                <select name="subcategoryId" value={formData.subcategoryId} onChange={handleChange} className="p-2 border rounded">
                    <option value="">Выберите подкатегорию (необязательно)</option>
                    {subcategories.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
                </select>

                <select name="materialId" value={formData.materialId} onChange={handleChange} className="p-2 border rounded" required>
                    <option value="">Выберите материал</option>
                    {materials.map(mat => <option key={mat.id} value={mat.id}>{mat.name}</option>)}
                </select>

                <select name="techniqueId" value={formData.techniqueId} onChange={handleChange} className="p-2 border rounded">
                    <option value="">Выберите технику (необязательно)</option>
                    {techniques.map(tech => <option key={tech.id} value={tech.id}>{tech.name}</option>)}
                </select>

                <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border rounded" />

                <button type="submit" className="bg-[#DAAB50] text-white font-bold py-2 rounded hover:bg-[#c7993e]">
                    Создать изделие
                </button>
            </form>
        </section>
    );
};

export default AdminItemCreate;
