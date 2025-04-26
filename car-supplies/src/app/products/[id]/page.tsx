"use client";
import { useEffect, useState, use } from "react";
import Image from "next/image";
import React from "react";
import Product from "@/app/interfaces/IProduct";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ProductImagesCarousel from "@/app/components/ProductImagesCarousel";
import GroupFixedButtons from "@/app/components/GroupFixedButtons";


const ProductSlug = ({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = use(params);

  const [product, setProduct] = useState<Product>()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>();
  const apiBase = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${apiBase}/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
        setMainImage(data.images[0]);
      } catch (error) {
        setError("Failed to load product" + error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  const handleImageClick = (image: string) => {
    if (!image) return;
    setMainImage(image);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 border-t border-gray-200  shadow-md">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-300 rounded-lg overflow-hidden p-2">
            <Skeleton height={300} width="100%" className="mb-4" />
          </div>
          <div className="space-y-3">
            <Skeleton height={30} width="100%" className="mb-4" />
            <Skeleton height={20} width="50%" className="mb-4" />
            <Skeleton height={20} width="50%" className="mb-4" />
            <Skeleton height={20} width="30%" className="mb-4" />
            <Skeleton height={20} width="30%" className="mb-4" />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-10">
            <Skeleton height={100} width="100%" className="mb-4" />
            <Skeleton height={100} width="100%" className="mb-4" />
            <Skeleton height={100} width="100%" className="mb-4" />
          </div>
        </div>
        <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
          <div className="flex flex-col space-y-4">
            <Skeleton height={400} width="100%" className="mb-4" />
            <Skeleton height={50} width="100%" className="mb-4" />
            <Skeleton height={20} width="50%" className="mb-4" />
            <Skeleton height={20} width="30%" className="mb-4" />
          </div>

        </SkeletonTheme>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8 border-t border-gray-200  shadow-md">
        {/* Combined Image + Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Image and Thumbnails */}
          <div>
            <div className="border border-gray-300 rounded-lg overflow-hidden p-2 mb-5">
              <Image
                src={mainImage || "/placeholder-image.png"}
                alt="Product"
                width={600}
                height={400}
                className="w-full h-auto object-contain sm:max-w-full md:max-w-md lg:max-w-lg"
              />
            </div>

            <ProductImagesCarousel images={product?.images || []} onImageClick={handleImageClick} />
            


          </div>

          {/* Product Info */}
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-gray-800">{product?.name}</h1>
            <p className="text-gray-600">
              Mã sản phẩm: <strong>{product?.id}</strong>
            </p>
            <p className="text-gray-600">
              {/* Thương hiệu: <strong>{product?.brand}</strong> */}
            </p>
            <p className="text-gray-600">
              {/* Xuất xứ: <strong>{product?.from}</strong> */}
            </p>
            <p className="text-lg text-red-600 font-bold">Giá: {product?.price} VND</p>
            <p className="text-sm text-gray-500">
              Lượt xem: <span className="text-gray-700">359</span>
            </p>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white p-6 rounded shadow space-y-4">
          <h2 className="text-xl font-semibold mb-2">Thông tin sản phẩm</h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>Dây curoa</strong> là bộ phận quan trọng trong hệ thống truyền động của động cơ ô tô hay các loại máy móc trong công nghiệp...
          </p>

          {/* Optional large image */}
          <div className="mt-6">
            <Image
              src={product?.thumbnail || "/placeholder-image.png"}
              alt="Chi tiết sản phẩm"
              width={800}
              height={500}
              className="w-full h-auto rounded-lg shadow"
            />
          </div>
        </div>
      </div>
      <GroupFixedButtons />
    </>
  );
};

export default ProductSlug;