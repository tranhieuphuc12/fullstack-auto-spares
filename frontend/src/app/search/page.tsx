"use client";
import { useSearchParams } from "next/navigation";
import GroupFixedButtons from "../components/GroupFixedButtons";
import ProductsList from "../components/ProductsList";
import { Suspense } from "react";

const SearchContent = () => {
   const searchParams = useSearchParams();
   const query = searchParams.get("query");

   const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
   const API_SEARCH = `${API_BASE}/api/search?query=${query}&`; // API endpoint for search must have "&" at the end

   if (!query) {
      return (
         <div className="flex items-center justify-center h-screen px-4 md:px-8">
            <h1 className="text-2xl font-bold text-center">
               <span lang="vi">Vui lòng nhập từ khóa tìm kiếm</span>
            </h1>
         </div>
      );
   }

   return (
      <>
         <ProductsList API={API_SEARCH} />
         <GroupFixedButtons />
      </>
   );
};

const SearchPage = () => {
   return (
      <Suspense fallback={<div className="flex items-center justify-center h-screen px-4 md:px-8">Loading...</div>}>
         <SearchContent />
      </Suspense>
   );
};

export default SearchPage;