import { usePageTitle } from "@/app/hooks/usePageTitle";
const ProductTitle = () => {
      const title = usePageTitle();
    return (
        <div className="flex justify-center items-center bg-gray-100 p-4 sm:p-6 md:p-8">            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center my-4 text-black">
                {title || "Sản phẩm"}
            </h1>
        </div>
    );
};  

export default ProductTitle;