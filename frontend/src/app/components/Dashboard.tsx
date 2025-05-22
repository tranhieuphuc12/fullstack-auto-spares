'use client';
import { useEffect, useState } from "react";
import Product from "@/app/interfaces/IProduct";
import Image from "next/image";
import AddProductModal from "@/app/components/AddProductModal";
import EditProductModal from "@/app/components/EditProductModal";
const DashboardClient = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 100;
    const [totalItems, setTotalItems] = useState(0);
    const [error, setError] = useState<string | null>(null);


    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/api/products?page=${page}&limit=${itemsPerPage}`);;
            if (!response.ok) {
                const errorMessage = response.status === 404
                    ? "Không tìm thấy sản phẩm nào"
                    : `Lỗi: ${response.statusText}`;
                setError(errorMessage);
                return;
            }

            const data = await response.json();
            // console.log("Fetched products:", data);
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
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            fetchProducts();
        }, 300);
        return () => clearTimeout(debounceTimeout);
    }, []);

    const onDeleteProduct = async (productId: string | undefined) => {
        if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
            try {
                const response = await fetch(`${API_BASE}/api/products/${productId}`, {
                    method: "DELETE",
                });
                if (!response.ok) {
                    const errorMessage = response.status === 404
                        ? "Không tìm thấy sản phẩm nào"
                        : `Lỗi: ${response.statusText}`;
                    setError(errorMessage);
                    return;
                }
                const data = await response.json();
                if (data.error) {
                    setError(data.error);
                    return;
                }
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product._id !== productId)
                );

            } catch (error) {
                setError("Đã xảy ra lỗi khi xóa sản phẩm");
                console.error("Error deleting product:", error);
            }
        }
    }


    return (
        <>
            <div>
                {error && <div className="text-red-600 mb-4">{error}</div>}
                {loading ? (
                    <>
                        <div className="animate-pulse space-y-4">
                            {[...Array(itemsPerPage)].map((_, idx) => (
                                <div key={idx} className="h-10 bg-gray-200 rounded w-full"></div>
                            ))}
                        </div>
                    </>
                ) : (<>

                    <AddProductModal onProductAdded={fetchProducts}/>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
                        <button
                            onClick={() => {
                                setLoading(true);
                                setError(null);
                                // re-fetch products for current page
                                const fetchProducts = async () => {
                                    try {
                                        const response = await fetch(`${API_BASE}/api/products?page=${page}&limit=${itemsPerPage}`);
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
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Tải lại
                        </button>
                    </div>

                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Loại xe</th>
                                <th className="border border-gray-300 p-2">Năm</th>
                                <th className="border border-gray-300 p-2">Tên sản phẩm</th>
                                <th className="border border-gray-300 p-2">Danh mục</th>
                                <th className="border border-gray-300 p-2">Mã phụ tùng</th>
                                <th className="border border-gray-300 p-2">Mã JS Asakashi</th>
                                <th className="border border-gray-300 p-2">Thương hiệu</th>
                                <th className="border border-gray-300 p-2">Giá bán</th>
                                <th className="border border-gray-300 p-2">Số lượng</th>
                                <th className="border border-gray-300 p-2">Mô tả</th>
                                <th className="border border-gray-300 p-2">Hình ảnh</th>
                                <th className="border border-gray-300 p-2">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center p-4">
                                        No products found.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product._id}>
                                        <td className="border border-gray-300 p-2">{product.car.brand} {product.car.model}</td>
                                        <td className="border border-gray-300 p-2"> {product.car.year}</td>
                                        <td className="border border-gray-300 p-2">{product.name}</td>
                                        <td className="border border-gray-300 p-2">{product.category.name}</td>
                                        <td className="border border-gray-300 p-2">
                                            {product.productId.map((id, idx) => (
                                                <span key={idx} className="block">
                                                    {id}{idx < product.productId.length - 1 ? ',' : ''}
                                                </span>
                                            ))}
                                        </td>
                                        <td className="border border-gray-300 p-2">{product.JSAsakashi}</td>
                                        <td className="border border-gray-300 p-2">{product.brand.name}</td>
                                        <td className="border border-gray-300 p-2">
                                            {product.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </td>
                                        <td className="border border-gray-300 p-2">{product.stock}</td>
                                        <td className="border border-gray-300 p-2">
                                            <textarea
                                                className="w-full p-1 border rounded"
                                                value={product.description || ""}
                                                readOnly
                                            />
                                        </td>

                                        <td className="border border-gray-300 p-2">
                                            {product.images && product.images.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {product.images.map((img: string, idx: number) => (
                                                        <Image
                                                            key={idx}
                                                            src={`${img}`}
                                                            alt={product.name}
                                                            width={64}
                                                            height={64}
                                                            className="w-16 h-16 object-cover"
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <span>No Image</span>
                                            )}
                                        </td>
                                        <td className="border border-gray-300 p-2 justify-center flex flex-col items-center">
                                            <EditProductModal product={product} onProductEdited={fetchProducts}/>


                                            <button
                                                type="button"
                                                className="py-3 px-9 m-5 inline-flex cursor-pointer items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-hidden focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
                                                onClick={() => onDeleteProduct(product._id)}
                                            >

                                                <span>Xóa</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Previous Page
                        </button>
                        <span>
                            Page {page} / {totalPages} ({totalItems} products)
                        </span>
                        <button
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages || totalPages === 0}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next Page
                        </button>
                    </div>
                </>
                )}

            </div>

        </>
    );
};
export default DashboardClient;
