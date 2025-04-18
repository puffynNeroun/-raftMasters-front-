import {Navigation, A11y} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import left from '../../assets/img/navigationLeft.png'
import right from '../../assets/img/navigationRight.png'
import img from '../../assets/img/Group 2.jpg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const Gallery = () => {
    return (
        <section className="gallery mt-16">
            <div className="container mx-auto px-3">

                <h2 className="uppercase text-5xl sm:text-6xl text-center md:text-left md:text-7xl text-gray-300 mb-11">галерея</h2>

                <div className='gallery-nav items-center flex justify-center md:justify-between pb-11 gap-6 flex-wrap'>
                    <button
                        className="px-3 py-4 text-base lg:pt-6 lg:pb-6 lg:pl-11 lg:pr-11 text-center lg:text-xl cursor-pointer font-semibold hover:text-[#1A1A1A] bg-[#DAAB50] transition ease-in-out duration-300 uppercase">выбор
                        категории
                    </button>
                    <form className="flex items-center justify-center" action="/search" method="get">
                        <input type="text" placeholder="ПОИСК ПО РЕМЕСЛУ"
                               className="bg-[#DAAB50] border-2 border-[#DAAB50] text-lg font-bold uppercase text-center py-2 px-10 sm:px-20 lg:py-2 lg:px-40 outline-none cursor-pointer"/>
                    </form>
                    <div className="gallery-nav max-w-32 flex gap-3 lg:gap-8">
                        <button className="my-prev-button-sliders cursor-pointer">
                            <img src={left}/>
                        </button>
                        <button className="my-next-button-sliders cursor-pointer">
                            <img src={right}/>
                        </button>
                    </div>
                </div>

                <Swiper modules={[Navigation, A11y]}
                        spaceBetween={20}
                        breakpoints={{
                            0: {slidesPerView: 2},
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                        navigation={{
                            nextEl: '.my-next-button-sliders',
                            prevEl: '.my-prev-button-sliders',
                        }}
                        >
                    <SwiperSlide><img src={img} alt=""/></SwiperSlide>
                    <SwiperSlide><img src={img} alt=""/></SwiperSlide>
                    <SwiperSlide><img src={img} alt=""/></SwiperSlide>
                    <SwiperSlide><img src={img} alt=""/></SwiperSlide>
                    <SwiperSlide><img src={img} alt=""/></SwiperSlide>
                    <SwiperSlide><img src={img} alt=""/></SwiperSlide>
                    <SwiperSlide><img src={img} alt=""/></SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
};