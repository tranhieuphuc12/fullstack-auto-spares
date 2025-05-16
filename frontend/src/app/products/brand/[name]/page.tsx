"use client";
import GroupFixedButtons from "@/app/components/GroupFixedButtons";
import ProductsList from "@/app/components/ProductsList";
import { use } from "react";
import Breadcrumbs from "@/app/components/breadcrumb";



const ProductsPage = ({ params }: { params: Promise<{ name: string }> }) => {

    const { name } = use(params);
    
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
    const brandName = name;
    const API_PRODUCTS = `${API_BASE}/api/products/brand/${brandName}?`;



    return (
        <>
            <Breadcrumbs className="ms-5"/>
            <ProductsList API={API_PRODUCTS} />
            <GroupFixedButtons />
        </>
    );
};
export default ProductsPage;