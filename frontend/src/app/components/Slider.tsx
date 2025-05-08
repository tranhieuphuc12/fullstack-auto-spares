"use client";
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Slider1 from '../../../public/slider-1.jpg';
import Slider2 from '../../../public/slider-2.jpg';
import Slider3 from '../../../public/slider-3.jpg';
import Slider4 from '../../../public/slider-4.jpg';
import Slider5 from '../../../public/slider-5.jpg';
import Slider6 from '../../../public/slider-6.jpg';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';


const Slider = () => {

    const swiperRef = useRef<SwiperType | null>(null);



    const sliders = [
        { id: 1, name: 'Brand 1', src: Slider1 },
        { id: 2, name: 'Brand 2', src: Slider2 },
        { id: 3, name: 'Brand 3', src: Slider3 },
        { id: 4, name: 'Brand 4', src: Slider4 },
        { id: 5, name: 'Brand 5', src: Slider5 },
        { id: 6, name: 'Brand 6', src: Slider6 },
    ]



    return (
        <div className="py-8 bg-white">
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                pagination={true}
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                navigation={true}
                className="max-w-7xl mx-auto"
            >
                {sliders.map((slider) => (
                    <SwiperSlide key={slider.name}>
                        <div className="w-full rounded-2xl overflow-hidden shadow-xl bg-gray-100">
                            <Image
                                src={slider.src}
                                alt={slider.name}
                                className="w-full h-auto object-cover"
                                style={{ maxHeight: '500px' }}
                            />                         
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
