import React from "react";
import GroupFixedButtons from "../components/GroupFixedButtons";
import ProductsList from "../components/ProductsList";
import Breadcrumbs from "@/app/components/breadcrumb";
const ProductsPage = () => {
   const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
   const API_PRODUCTS = `${API_BASE}/api/products?`; // API endpoint for products must have the "?" at the end
   
   
   return (
      <>
         <Breadcrumbs className="ms-5"/>
         <ProductsList API={API_PRODUCTS}/>
         <GroupFixedButtons />
      </>
   );
};
export default ProductsPage;