"use client";
import React from "react";
import Slider from "@/app/components/Slider";
// import ProductList from "@/app/components/ProductsList";
import BrandCarousel from "@/app/components/BrandsCarousel";
import GroupFixedButtons from "./components/GroupFixedButtons";
import HomeProductList from "./components/HomeProductList";

export default function Home() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  
  return (
    <div className="mx-auto">
      <link rel="icon" href="/logo.png" />
      <Slider />

      <HomeProductList />

      <BrandCarousel BASE_URL={API_BASE} type="nsx" title="Phụ tùng nhà sản xuất" />

      <BrandCarousel BASE_URL={API_BASE} type="ch" title="Phụ tùng chính hãng" />

      <GroupFixedButtons />
    </div>
  );
}
