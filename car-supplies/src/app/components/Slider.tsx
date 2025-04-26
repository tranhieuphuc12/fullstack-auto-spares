"use client";
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Slider1 from '../../../public/slider-4.jpg';
import Slider2 from '../../../public/slider-5.jpg';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';

const Slider = () => {

    const swiperRef = useRef<SwiperType | null>(null);

    const handleClick = () => {
        swiperRef.current?.slideNext();
    };

    const sliders = [
        { name: 'Brand 1', src: Slider1 },
        { name: 'Brand 2', src: Slider2 },
        { name: 'Brand 3', src: Slider1 },
        { name: 'Brand 4', src: Slider2 },        
    ]

    return (
        <div className="py-8 bg-white">            
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                pagination={true}
                modules={[Navigation,Pagination]}                
                slidesPerView={1}                                
                navigation={true}
                className="max-w-7xl mx-auto"
            >
                {sliders.map((slider) => (
                    <SwiperSlide key={slider.name}>
                        <div
                            className="flex justify-center items-center cursor-pointer"
                            onClick={handleClick}
                        >
                            <Image
                                src={slider.src}
                                alt={slider.name}
                                layout="responsive"
                                className="w-full object-cover"
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
