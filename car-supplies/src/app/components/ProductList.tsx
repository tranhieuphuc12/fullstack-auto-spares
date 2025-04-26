"use client";
import React, { useEffect, useState } from "react";
import Pagination from './Pagination';
import ProductCard from './ProductCard';
import Product  from "@/app/interfaces/IProduct";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ProductTitle from "./ProductTitle";

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    const [totalItems, setTotalItems] = useState(0);
    const apiBase = process.env.NEXT_PUBLIC_API_BASE;

    useEffect(() => {
        setLoading(true);
        const debounceTimeout = setTimeout(() => {            
            const fetchProducts = async () => {
                try {
                    const response = await fetch(`${apiBase}/api/products?page=${page}&limit=${itemsPerPage}`);
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    const data = await response.json();
                    setProducts(data.products);
                    setTotalPages(data.totalPages);
                    setTotalItems(data.totalItems);
                } catch (error) {
                    console.error("Error fetching products:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProducts();
        }, 300); 

        return () => clearTimeout(debounceTimeout); 
    }, [page]);

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    return (
        <>
            <ProductTitle title="Product Title" />
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
                        <ProductCard key={product.id} product={product} />
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

export default ProductList;