"use client";
import React from "react";
import Slider from "@/app/components/Slider";
import ProductList from "@/app/components/ProductList";
import BrandCarousel from "@/app/components/BrandsCarousel";
import BrandNSX from '../../public/brands/nsx-1.webp';
import BrandCH from '../../public/brands/ch-1.webp';
import type Brand from '@/app/interfaces/IBrand';
import GroupFixedButtons from "./components/GroupFixedButtons";
 

export default function Home() {

  
  //Mock data 
  const brandsNSX: Brand[] = [
    { name: 'Brand1', src: BrandNSX },
    { name: 'Brand2', src: BrandNSX },
    { name: 'Brand3', src: BrandNSX },
    { name: 'Brand4', src: BrandNSX },
    { name: 'Brand5', src: BrandNSX },
    { name: 'Brand6', src: BrandNSX },
    { name: 'Brand7', src: BrandNSX },
    { name: 'Brand8', src: BrandNSX },
  ];
  const brandsCH: Brand[] = [
    { name: 'Brand1', src: BrandCH },
    { name: 'Brand2', src: BrandCH },
    { name: 'Brand3', src: BrandCH },
    { name: 'Brand4', src: BrandCH },
    { name: 'Brand5', src: BrandCH },
    { name: 'Brand6', src: BrandCH },
    { name: 'Brand7', src: BrandCH },
    { name: 'Brand8', src: BrandCH },
  ];
  
  

  return (
    <div className="mx-auto">
      
      <Slider />
      
      <ProductList />

      <BrandCarousel brands={brandsNSX} title="Phụ tùng nhà sản xuất" />

      <BrandCarousel brands={brandsCH} title="Phụ tùng chính hãng" />

      <GroupFixedButtons />
    </div>
  );
}
