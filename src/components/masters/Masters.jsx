import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks.js'
import { loadMasters } from '../../store/slices/masterSlice.js'

import { Navigation, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import leftBtn from '../../assets/img/navigationLeft.png'
import rightBtn from '../../assets/img/navigationRight.png'
import user from '../../assets/img/users.jpg'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const Masters = () => {
    const dispatch = useAppDispatch()
    const { masters, loading } = useAppSelector((state) => state.master)

    useEffect(() => {
        dispatch(loadMasters())
    }, [dispatch])

    return (
        <section className="masters py-10 sm:py-16">
            <div className="container mx-auto px-4">
                <h2 className="uppercase text-3xl sm:text-5xl md:text-6xl text-center text-gray-300 mb-8 sm:mb-12">
                    Найди своего мастера
                </h2>

                <div className="masters-nav flex flex-col md:flex-row items-center justify-between pb-8 sm:pb-12 gap-6">
                    <div className="flex flex-col gap-4 sm:gap-6 w-full md:w-auto">
                        <button className="px-4 py-3 text-base sm:text-lg lg:text-xl font-semibold hover:text-[#1A1A1A] bg-[#DAAB50] transition uppercase">
                            выбор Вид ремесла
                        </button>
                        <button className="px-4 py-3 text-base sm:text-lg lg:text-xl font-semibold hover:text-[#1A1A1A] bg-[#DAAB50] transition uppercase">
                            выбор Регион
                        </button>
                    </div>

                    <form className="w-full md:w-auto" action="/search" method="get">
                        <input
                            type="text"
                            placeholder="ПОИСК ПО РЕМЕСЛУ"
                            className="bg-[#DAAB50] border-2 border-[#DAAB50] text-lg font-bold uppercase text-center py-3 px-6 sm:px-10 lg:px-20 outline-none w-full md:w-[400px]"
                        />
                    </form>

                    <div className="flex gap-4">
                        <button className="my-prev-button-masters cursor-pointer">
                            <img src={leftBtn} alt="Предыдущий" className="w-8 sm:w-10" />
                        </button>
                        <button className="my-next-button-masters cursor-pointer">
                            <img src={rightBtn} alt="Следующий" className="w-8 sm:w-10" />
                        </button>
                    </div>
                </div>

                {loading ? (
                    <p className="text-center text-white">Загрузка мастеров...</p>
                ) : (
                    <Swiper
                        modules={[Navigation, A11y]}
                        spaceBetween={20}
                        breakpoints={{
                            320: { slidesPerView: 1.5 },
                            480: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                        navigation={{
                            nextEl: '.my-next-button-masters',
                            prevEl: '.my-prev-button-masters',
                        }}
                    >
                        {masters.map((master) => (
                            <SwiperSlide key={master.id}>
                                <div className="card bg-white overflow-hidden shadow-lg flex flex-col h-full">
                                    <div className="bg-gray-100 flex justify-center items-center p-6">
                                        <img
                                            src={master.photo || user}
                                            alt={master.fullName}
                                            className="w-40 h-40 object-cover"
                                        />
                                    </div>

                                    <div className="bg-[#DAAB50] p-4 flex flex-col flex-grow">
                                        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                                            <div className="flex flex-col">
                                                <p className="text-xl font-bold">{master.fullName}</p>
                                                <p className="text-sm text-gray-800">{master.contactEmail}</p>
                                                <div className="flex gap-2 mt-2">
                                                    {master.socialLinks?.split(',').map((link, idx) => (
                                                        <a
                                                            key={idx}
                                                            href={link.trim()}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <div className="w-4 h-4 bg-black rounded-full" />
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm max-w-[200px]">{master.shortDescription}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <button className="bg-black text-white px-4 py-2 uppercase text-sm hover:opacity-80">
                                                Подробнее
                                            </button>
                                            <div className="flex gap-4 text-black font-semibold text-sm uppercase">
                                                <span>{master.category?.name}</span>
                                                <span>{master.region?.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    )
}
