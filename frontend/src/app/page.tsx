"use client";
import React from "react";
import Slider from "@/app/components/Slider";
import ProductList from "@/app/components/ProductsList";
import BrandCarousel from "@/app/components/BrandsCarousel";
import GroupFixedButtons from "./components/GroupFixedButtons";
 

export default function Home() {


  
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const API_PRODUCTS = `${API_BASE}/api/products?`; 
  

  return (
    <div className="mx-auto">
       <link rel="icon" href="/logo.png" />
      <Slider />
      
      <ProductList API={API_PRODUCTS}/>

      <BrandCarousel BASE_URL={API_BASE} type="nsx" title="Phụ tùng nhà sản xuất" />

      <BrandCarousel BASE_URL={API_BASE} type="ch" title="Phụ tùng chính hãng" />

      <GroupFixedButtons />
    </div>
  );
}
