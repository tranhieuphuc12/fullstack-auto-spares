'use client';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductImagesCarousel = ({ images, onImageClick }: { images: string[], onImageClick: (image: string) => void }) => {


    const swiperRef = useRef<SwiperType | null>(null);

    const handleImageClick = (image: string) => {
        onImageClick(image);
    };

    return (
        <div className="relative bg-white border-1 border-gray-300 rounded-lg p-4">
            {/* Prev Button */}
            <button
                className="custom-prev absolute top-1/2 left-0 -translate-y-1/2 bg-white/80  hover:bg-white  shadow-md backdrop-blur-sm p-2 rounded-full z-10 transition"

                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous slide"
            >
                <ChevronLeft className="text-gray-800  w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
                className="custom-next absolute top-1/2 right-0 -translate-y-1/2 bg-white/80  hover:bg-white  shadow-md backdrop-blur-sm p-2 rounded-full z-10 transition"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next slide"
            >
                <ChevronRight className="text-gray-800  w-5 h-5" />
            </button>

            {/* Swiper */}
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                spaceBetween={10}
                slidesPerView={3}
                loop
                className="mx-auto bg-white"
            >
                {images.map((image) => (
                    <SwiperSlide key={image + Math.random()}>
                        <div
                            className="w-[100px] h-[70px] overflow-hidden flex justify-center items-center cursor-pointer group border border-gray-200 rounded-sm"
                            onClick={() => handleImageClick(image)}
                            onMouseEnter={() => handleImageClick(image)}
                        >
                            <Image
                                src={image}
                                alt={image}
                                width={150}
                                height={75}
                                className="object-contain scale-110 group-hover:scale-125 group-hover:opacity-80 transition-transform duration-500 ease-in-out"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );


}
export default ProductImagesCarousel;