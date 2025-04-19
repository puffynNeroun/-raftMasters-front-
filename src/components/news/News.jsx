import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from '../../store/slices/newsSlice';
import { Link } from 'react-router-dom';

export const News = () => {
    const dispatch = useDispatch();
    const { news, loading, error } = useSelector(state => state.news);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    const filteredNews = () => {
        if (activeTab === 'all') return news;
        return news.filter(n => n.type === activeTab);
    };

    return (
        <section className="news pt-16 md:pt-24">
            <div className="container mx-auto">
                <h2 className="uppercase text-5xl sm:text-6xl md:text-7xl text-gray-300 text-center mb-11">
                    Новости
                </h2>

                {/* Tabs */}
                <div className="nav-group flex flex-wrap gap-6 items-center justify-center mb-16">
                    {[
                        { key: 'all', label: 'Все' },
                        { key: 'master', label: 'Мастера' },
                        { key: 'master-class', label: 'Мастер-классы' },
                        { key: 'contest', label: 'Конкурсы' }
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`pt-4 pb-4 px-10 text-xl font-semibold border-2 uppercase transition ${
                                activeTab === tab.key
                                    ? 'bg-[#DAAB50] text-black'
                                    : 'text-[#DAAB50] border-[#DAAB50]'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* News List */}
                <div className="flex items-center justify-center flex-wrap gap-6">
                    {loading ? (
                        <p className="text-white text-xl">Загрузка...</p>
                    ) : error ? (
                        <p className="text-red-500 text-xl">{error}</p>
                    ) : filteredNews().length === 0 ? (
                        <p className="text-white text-xl">Новостей не найдено</p>
                    ) : (
                        filteredNews().map(item => (
                            <div
                                key={item.id}
                                className="flex flex-col max-w-[300px] w-full shadow-lg rounded overflow-hidden bg-white h-[450px]" // ← фиксированная высота
                            >
                                <img
                                    src={
                                        item.image
                                            ? `http://localhost:5000${item.image}`
                                            : 'https://via.placeholder.com/300x200?text=News'
                                    }
                                    alt={item.title}
                                    className="w-full h-[200px] object-cover"
                                />
                                <div className="p-4 text-black flex flex-col gap-2 flex-grow">
                                    <h3 className="font-bold text-lg line-clamp-2">{item.title}</h3>
                                    <p className="text-sm line-clamp-3">{item.content}</p>
                                    <p className="text-xs text-gray-500 mt-auto">
                                        {new Date(item.publishedDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="bg-[#DAAB50] text-black p-4 flex justify-center">
                                    <Link
                                        to={`/news/${item.id}`}
                                        className="text-xl font-semibold uppercase"
                                    >
                                        Читать далее
                                    </Link>
                                </div>
                            </div>

                        ))
                    )}
                </div>
            </div>
        </section>
    );
};
