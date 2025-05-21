"use client";
import { useEffect, useState, use } from "react";
import Image from "next/image";
import React from "react";
import Product from "@/app/interfaces/IProduct";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ProductImagesCarousel from "@/app/components/ProductImagesCarousel";
import GroupFixedButtons from "@/app/components/GroupFixedButtons";
import Breadcrumb from "@/app/components/breadcrumb";

const ProductSlug = ({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = use(params);

  const [product, setProduct] = useState<Product>()
  const [loading, setLoading] = useState(true);
  
  const [mainImage, setMainImage] = useState<string | null>();
  const apiBase = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${apiBase}/api/products/${id}`);
        
        const data = await response.json();
        setProduct(data.product);
        
        setMainImage(data.product.images[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
        
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
         <Breadcrumb />
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Image and Thumbnails */}
          <div>
            <div className="border border-gray-300 rounded-lg overflow-hidden p-2 mb-5">
              <Image
                src={`${mainImage}`}
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
            <h1 className="text-2xl font-semibold text-gray-800">{product?.name} {product?. productId} {product?.JSAsakashi} {product?.car.brand} {product?.car.model} {product?.car.year}</h1>
            <p className="text-gray-600">
              Tên sản phẩm: <strong>{product?.name}</strong>
            </p>
            <p className="text-gray-600">
              Mã sản phẩm: <strong>{product?.productId}</strong>
            </p>
            <p className="text-gray-600">
              Mã JS Asakashi: <strong>{product?.JSAsakashi}</strong>
            </p>
            <p className="text-gray-600">
              Loại phụ tùng: <strong>{product?.category.name}</strong>
            </p>
            <p className="text-gray-600">
              Thương hiệu: <strong>{product?.brand.name}</strong>
            </p>
            <p className="text-gray-600">
              Hãng xe: <strong>{product?.car.brand} {product?.car.model} {product?.car.year}</strong>
            </p>
            <p className="text-gray-600">
              Số lượng: <strong>{product?.stock}</strong>
            </p>
            <p className="text-lg text-red-600 font-bold">
              Giá: {product?.price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price) : 'N/A'}
            </p>
            
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white p-6 rounded shadow space-y-4">
          <h2 className="text-xl font-semibold mb-2">Thông tin sản phẩm</h2>
          <p className="text-gray-700 leading-relaxed">
            {product?.description || "Không có thông tin mô tả"}
          </p>

          {/* Optional large image */}
          <div className="mt-6">
            {product?.images?.map((image, index) => (
              <div key={index} className="mb-4">
                <Image
                  src={`${image}` || "/placeholder-image.png"}
                  alt={`Product Image ${index + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <GroupFixedButtons />
    </>
  );
};

export default ProductSlug;