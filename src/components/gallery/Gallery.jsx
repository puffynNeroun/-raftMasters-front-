import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, fetchItemById } from '../../store/slices/itemSlice';
import { loadCategories } from '../../store/slices/categorySlice';
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import left from '../../assets/img/navigationLeft.png';
import right from '../../assets/img/navigationRight.png';

export const Gallery = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector(state => state.items);
    const { categories } = useSelector(state => state.categories);

    const [search, setSearch] = useState('');
    const [categoryId, setCategoryId] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        dispatch(loadCategories());
        dispatch(fetchItems({ search, categoryId }));
    }, [dispatch, search, categoryId]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleCategoryClick = (id) => {
        setCategoryId(prev => (prev === id ? null : id));
        setIsDropdownOpen(false); // закрыть дропдаун после выбора
    };

    const handleSlideClick = (id) => {
        dispatch(fetchItemById(id));
    };

    return (
        <section className="gallery mt-16">
            <div className="container mx-auto px-3">
                <h2 className="uppercase text-5xl sm:text-6xl text-center md:text-left md:text-7xl text-gray-300 mb-11">
                    галерея
                </h2>

                <div
                    className="gallery-nav items-center flex justify-center md:justify-between pb-11 gap-6 flex-wrap relative">
                    {/* КНОПКА + DROPDOWN */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(prev => !prev)}
                            className="px-3 py-4 text-base lg:pt-6 lg:pb-6 lg:pl-11 lg:pr-11 text-center lg:text-xl font-semibold hover:text-[#1A1A1A] bg-[#DAAB50] uppercase transition duration-300"
                        >
                            выбор категории
                        </button>

                        {isDropdownOpen && (
                            <div
                                className="absolute left-0 mt-2 bg-white border rounded-lg shadow-lg z-50 min-w-[200px] max-h-60 overflow-y-auto">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategoryClick(cat.id)}
                                        className={`w-full text-left px-4 py-2 hover:bg-[#DAAB50] hover:text-white transition ${
                                            categoryId === cat.id ? 'bg-[#DAAB50] text-white' : 'text-black'
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ПОИСК */}
                    <form className="flex items-center justify-center" onSubmit={e => e.preventDefault()}>
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="ПОИСК ПО РЕМЕСЛУ"
                            className="bg-[#DAAB50] border-2 border-[#DAAB50] text-lg font-bold uppercase text-center py-2 px-10 sm:px-20 lg:px-40 outline-none cursor-pointer"
                        />
                    </form>

                    {/* НАВИГАЦИЯ */}
                    <div className="gallery-nav flex gap-3 lg:gap-8 items-center">
                        <button type="button" className="swiper-button-prev-custom">
                            <img src={left} alt="prev" className="w-8 h-8 sm:w-10 sm:h-10"/>
                        </button>
                        <button type="button" className="swiper-button-next-custom">
                            <img src={right} alt="next" className="w-8 h-8 sm:w-10 sm:h-10"/>
                        </button>
                    </div>


                </div>

                {/* SWIPER */}
                {loading ? (
                    <p className="text-white text-xl text-center">Загрузка...</p>
                ) : error ? (
                    <p className="text-red-500 text-xl text-center">{error}</p>
                ) : (
                    <Swiper
                        modules={[Navigation, A11y]}
                        spaceBetween={20}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        breakpoints={{
                            0: { slidesPerView: 2 },
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                    >

                    {items.map(item => (
                            <SwiperSlide key={item.id} onClick={() => handleSlideClick(item.id)}>
                                <img
                                    src={
                                        item.mainImage
                                            ? `http://localhost:5000${item.mainImage}`
                                            : 'https://via.placeholder.com/300x300?text=Изделие'
                                    }
                                    alt={item.name}
                                    className="object-cover w-full h-[300px] cursor-pointer"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
};
