"use client";
import GroupFixedButtons from "@/app/components/GroupFixedButtons";
import ProductsList from "@/app/components/ProductsList";
import { use } from "react";




const ProductsPage = ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = use(params);
    
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
    const CATEGORY_ID = id;
    const API_PRODUCTS = `${API_BASE}/api/products/categoryId/${CATEGORY_ID}?`;



    return (
        <>
            <ProductsList API={API_PRODUCTS} />
            <GroupFixedButtons />
        </>
    );
};
export default ProductsPage;