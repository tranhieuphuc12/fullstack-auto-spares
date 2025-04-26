'use client';

import React from 'react';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
  },
};



const ImagesCarousel = ({ images }: { images: string[] }) => {
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <Carousel
        responsive={responsive}
        arrows
        keyBoardControl
        autoPlay={false}
        itemClass="px-4"
        containerClass="carousel-container"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="rounded-2xl shadow-md"
          >
            <Image src={image}
              alt={image}
              width={120}
              height={60}
              className="object-contain hover:scale-150 transition duration-300" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default ImagesCarousel;