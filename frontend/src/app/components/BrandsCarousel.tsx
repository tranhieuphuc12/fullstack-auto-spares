'use client';
import { useEffect, useRef,useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';
import BrandCarouselProps from '@/app/interfaces/IBrandCarouselProps';
import Brand from '@/app/interfaces/IBrand';


const BrandCarousel = ({BASE_URL, type, title }: BrandCarouselProps) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const swiperRef = useRef<SwiperType | null>(null);
  const handleClick = () => {
    swiperRef.current?.slideNext();
  };
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/brands/type/${type}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBrands(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    }
    fetchBrands();
  }, []);

  return (
    <div className="py-8 bg-white">
      <h2 className="border-t-3 text-center font-bold text-yellow-600 mb-6 uppercase bg-gray-100 p-4  md:text-lg lg:text-xl xl:text-2xl">
        {title}
      </h2>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Autoplay, Navigation]}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        loop
        autoplay={{ delay: 3000 }}
        navigation
        className="max-w-7xl mx-auto "
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand._id}>
            <div
              className="flex justify-center items-center cursor-pointer"
              onClick={handleClick}
            >
              <Image
                src={`/brands/${brand.logo}`}
                alt={brand.name}
                width={120}
                height={60}
                className="object-contain hover:scale-150 transition duration-300"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandCarousel;
