"use client";
import React, { useEffect, useState } from "react";
import Pagination from './Pagination';
import ProductCard from './ProductCard';
import Product  from "@/app/interfaces/IProduct";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ProductTitle from "./ProductTitle";


const ProductsList = ({API} : {API:string}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    const [totalItems, setTotalItems] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        const debounceTimeout = setTimeout(() => {            
            const fetchProducts = async () => {
                try {
                    const response = await fetch(`${API}page=${page}&limit=${itemsPerPage}`);
                    if (!response.ok) {
                        const errorMessage = response.status === 404 
                            ? "Không tìm thấy sản phẩm nào" 
                            : `Lỗi: ${response.statusText}`;
                        setError(errorMessage);
                        return;
                    }
                    
                    const data = await response.json();
                    setProducts(data.products);
                    setTotalPages(data.totalPages);
                    setTotalItems(data.totalItems);
                } catch (error) {                    
                    setError("Đã xảy ra lỗi khi tải sản phẩm");
                    console.error("Error fetching products:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProducts();
        }, 300); 

        return () => clearTimeout(debounceTimeout); 
    }, [API, page]);

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen px-4 md:px-8">
                <h1 className="text-2xl font-bold text-center">
                    <span lang="vi">{error}</span>
                </h1>
            </div>
        );
    }

    return (
        <>
            <ProductTitle title="Sản Phẩm" />
            <div className="px-4 py-8 bg-white">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {loading && (
                        Array.from({ length: 10 }).map((_, index: number) => (
                            <SkeletonTheme key={index} baseColor="#e0e0e0" highlightColor="#f5f5f5">
                                <div className="flex flex-col">
                                    <Skeleton height={200} width="100%" className="mb-4" />
                                    <Skeleton height={50} width="100%" className="mb-4" />
                                </div>
                            </SkeletonTheme>
                        ))
                    )}

                    {!loading && products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    totalItems={totalItems}
                />
            </div>
        </>
    );
};

export default ProductsList;