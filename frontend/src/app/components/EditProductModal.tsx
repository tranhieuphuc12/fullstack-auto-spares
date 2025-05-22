'use client';

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Category from "@/app/interfaces/ICategory";
import Car from "@/app/interfaces/ICar";
import Brand from "@/app/interfaces/IBrand";
import Product from "../interfaces/IProduct";

interface EditProductModalProps {
    onProductEdited: () => void;
    product: Product;
}


const EditProductModal = ({ product, onProductEdited }: EditProductModalProps) => {
    const [showAddCar, setShowAddCar] = useState(false);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showAddBrand, setShowAddBrand] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const [categories, setCategories] = useState<Category[]>([]);
    const [cars, setCars] = useState<Car[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

    const [newCarBrand, setNewCarBrand] = useState("");
    const [newCarModel, setNewCarModel] = useState("");
    const [newCarYear, setNewCarYear] = useState(0);

    const [newCategoryName, setNewCategoryName] = useState("");

    const [newBrandName, setNewBrandName] = useState("");


    const [selectedCategory, setSelectedCategory] = useState<Category>();
    const [selectedCar, setSelectedCar] = useState<Car>();
    const [selectedBrand, setSelectedBrand] = useState<Brand>();
    const [productName, setProductName] = useState("");
    const [productId, setProductId] = useState<string>("");
    const [productDescription, setProductDescription] = useState<string>("");
    const [JSAsakashi, setJSAsakashi] = useState<string>("");
    const [productPrice, setProductPrice] = useState<number>(0);
    const [productStock, setProductStock] = useState<number>(0);
    const [existingImages, setExistingImages] = useState<string[]>(product.images || []);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [removedImages, setRemovedImages] = useState<string[]>([]);




    useEffect(() => {
        // Lock scroll when modal is open
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        // Clean up on unmount
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        if (product) {
            setProductName(product.name);
            setProductId(product.productId.join(","));
            setJSAsakashi(product.JSAsakashi);
            setProductPrice(product.price);
            setProductStock(product.stock);
            setProductDescription(product.description);
            setSelectedCategory(categories.find((category) => category._id === product.category._id));
            setSelectedCar(cars.find((car) => car._id === product.car._id));
            setSelectedBrand(brands.find((brand) => brand._id === product.brand._id));
            setExistingImages(product.images);
            setRemovedImages([]);
            setNewImages([]);

        }
    }, [product, categories, cars, brands]);

    //fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/categories`);
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    //fetch cars 
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/cars`);
                if (!response.ok) {
                    throw new Error("Failed to fetch cars");
                }
                const data = await response.json();
                setCars(data);
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        };

        fetchCars();
    }, []);

    //fetch brands
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/brands`);
                if (!response.ok) {
                    throw new Error("Failed to fetch brands");
                }
                const data = await response.json();
                setBrands(data);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };

        fetchBrands();
    }, []);

    const handleAddCar = async (car: Car) => {
        if (!car.brand || !car.model || !car.year) {
            alert("Vui lòng nhập đầy đủ thông tin xe");
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/api/cars`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(car),
            });

            if (!response.ok) {
                throw new Error("Failed to edit car");
            }

            const newCar = await response.json();
            setCars((prevCars) => [...prevCars, newCar]);
            setShowAddCar(false);
            alert("Sửa xe thành công");
        } catch (error) {
            console.error("Error editing car:", error);
        }
    }
    const handleAddCategory = async (categoryName: string) => {
        if (!categoryName) {
            alert("Vui lòng nhập tên danh mục");
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/api/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: categoryName }),
            });


            const newCategory = await response.json();
            setCategories((prevCategories) => [...prevCategories, newCategory]);
            setShowAddCategory(false);
            alert("Thêm danh mục thành công");
        } catch (error) {
            console.error("Error adding category:", error);

        }
    }

    const handleAddBrand = async (brandName: string) => {
        if (!brandName) {
            alert("Vui lòng nhập tên thương hiệu");
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/api/brands`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: brandName }),
            });

            if (!response.ok) {
                throw new Error("Failed to add brand");
            }

            const newBrand = await response.json();
            setBrands((prevBrands) => [...prevBrands, newBrand]);
            setShowAddBrand(false);
            alert("Thêm thương hiệu thành công");
        } catch (error) {
            console.error("Error adding brand:", error);
        }
    };

    const uploadNewImages = async (): Promise<string[]> => {
        const formData = new FormData();
        newImages.forEach((file) => formData.append("images", file));

        const res = await fetch(`${API_BASE}/api/upload`, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to upload images: ${res.status} ${errorText}`);
        }

        const data = await res.json();
        return data.urls;
    };




    const handleEditProduct = async () => {
        if (
            !productName ||
            !productId ||
            !JSAsakashi ||
            !productPrice ||
            !productStock ||
            !productDescription ||
            !selectedCategory ||
            !selectedCar ||
            !selectedBrand
        ) {
            alert("Vui lòng nhập đầy đủ thông tin sản phẩm");
            return;
        }

        const uploadedImageUrls = await uploadNewImages();

        const finalImageUrls = [
            ...existingImages.filter((url) => !removedImages.includes(url)),
            ...uploadedImageUrls
        ];



        const productIdArray = productId.split(",").map((id) => id.trim());

        const productData = {
            name: productName,
            productId: productIdArray,
            JSAsakashi,
            price: productPrice,
            stock: productStock,
            description: productDescription,
            category: selectedCategory,
            car: selectedCar,
            brand: selectedBrand,
            images: finalImageUrls, // ✅ Now has the public image URLs
        };

        try {
            const response = await fetch(`${API_BASE}/api/products/${product._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`${errorMessage} Failed to add product`);
            }

            alert("Sửa sản phẩm thành công!");
            onProductEdited();
            setProductName("");
            setProductId("");
            setJSAsakashi("");
            setProductPrice(0);
            setProductStock(0);
            setProductDescription("");
            setSelectedCategory(undefined);
            setSelectedCar(undefined);
            setSelectedBrand(undefined);
            setExistingImages(product.images);
            setRemovedImages([]);
            setNewImages([]);
            setIsOpen(false);

        } catch (error) {
            alert("Đã xảy ra lỗi khi sửa sản phẩm");
            console.error("Error adding product:", error);
        }
    };



    return (
        <>
            <button
                type="button"
                className="py-3 px-4 m-5 inline-flex cursor-pointer items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => setIsOpen(true)}
            >

                <span>Chỉnh sửa</span>
            </button>


            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50">
                    <div className="bg-white dark:bg-neutral-800 rounded-xl w-full max-w-3xl mx-3 max-h-[90vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-700">
                            <h3 className="font-bold text-gray-800 dark:text-white">Sản Phẩm</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="size-8 inline-flex justify-center items-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                            >
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-4 overflow-y-auto flex-1">
                            <select
                                className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                value={selectedCar?._id}
                                onChange={(e) => {
                                    const selected = cars.find((car) => car._id === e.target.value);
                                    setSelectedCar(selected);
                                }}

                            >
                                <option value="">Chọn loại xe</option>
                                {cars.map((car) => (
                                    <option key={car._id} value={car._id}>
                                        {car.brand} {car.model} {car.year}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => setShowAddCar((prev) => !prev)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all mb-2 block"
                            >
                                Thêm xe mới
                            </button>
                            {showAddCar && (
                                <div className="mb-3  ms-5">
                                    <span className="px-4 py-2">Thêm hãng xe mới</span>
                                    <div className="flex gap-2 mt-2">
                                        <input
                                            type="text"
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="Nhập tên hãng xe mới"
                                            onChange={(e) => setNewCarBrand(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="Nhập model xe mới"
                                            onChange={(e) => setNewCarModel(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="Nhập năm sản xuất xe mới"
                                            onChange={(e) => setNewCarYear(Number(e.target.value))}
                                        />
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                                            onClick={() => handleAddCar({ brand: newCarBrand, model: newCarModel, year: newCarYear })}
                                        >
                                            Thêm
                                        </button>
                                    </div>
                                </div>
                            )}

                            <span className="px-4 py-2 ">Danh Mục</span>
                            <select className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                value={selectedCategory?._id}
                                onChange={(e) => {
                                    const selected = categories.find((category) => category._id === e.target.value);
                                    setSelectedCategory(selected);
                                }}>
                                <option value="">Chọn danh mục</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="button"
                                onClick={() => setShowAddCategory((prev) => !prev)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all mb-2 block"
                            >
                                Thêm danh mục mới
                            </button>
                            {showAddCategory && (
                                <div className="mb-3 ms-5">
                                    <span className="px-4 py-2">Thêm danh mục mới</span>
                                    <div className="flex gap-2 mt-2">
                                        <input
                                            type="text"
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="Nhập tên danh mục mới"
                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                                            onClick={() => handleAddCategory(newCategoryName)}
                                        >
                                            Thêm
                                        </button>
                                    </div>
                                </div>
                            )}

                            <span className="px-4 py-2 ">Thương hiệu</span>
                            <select className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                value={selectedBrand?._id}
                                onChange={(e) => {
                                    const selected = brands.find((brand) => brand._id === e.target.value);
                                    setSelectedBrand(selected);
                                }}
                            >
                                <option value="">Chọn thương hiệu</option>
                                {brands.map((brand) => (
                                    <option key={brand._id} value={brand._id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => setShowAddBrand((prev) => !prev)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all mb-2 block"
                            >
                                Thêm thương hiệu mới
                            </button>
                            {showAddBrand && (
                                <div className="mb-3 ms-5">
                                    <span className="px-4 py-2">Thêm thương hiệu mới</span>
                                    <div className="flex gap-2 mt-2">
                                        <input
                                            type="text"
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="Nhập tên thương hiệu mới"
                                            onChange={(e) => setNewBrandName(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                                            onClick={() => handleAddBrand(newBrandName)}
                                        >
                                            Thêm
                                        </button>
                                    </div>
                                </div>
                            )}



                            <span className="px-4 py-2 ">Tên Sản phẩm</span>
                            <input type="text" className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="Tên sản phẩm"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />


                            <span className="px-4 py-2 ">Mã phụ tùng</span>
                            <input type="text" className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="Mã phụ tùng"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />


                            <span className="px-4 py-2 ">Mã JS Asakashi</span>
                            <input type="text" className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="Mã JS Asakashi"
                                value={JSAsakashi}
                                onChange={(e) => setJSAsakashi(e.target.value)}
                            />



                            <span className="px-4 py-2 ">Giá</span>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="Giá sản phẩm"
                                value={productPrice.toLocaleString("vi-VN")}
                                onChange={(e) => {
                                    const raw = e.target.value.replace(/[^\d]/g, "");
                                    const value = Number(raw);
                                    setProductPrice(isNaN(value) ? 0 : value);
                                }}
                                inputMode="numeric"
                            />
                            <span className="px-4 py-2 ">Số lượng</span>
                            <input
                                type="number"
                                min={0}
                                className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="Số lượng sản phẩm"
                                value={productStock}
                                onChange={(e) => {
                                    const value = Math.max(0, Number(e.target.value));
                                    setProductStock(isNaN(value) ? 0 : value);
                                }}
                            />

                            <span className="px-4 py-2 ">Mô tả</span>
                            <textarea className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="Mô tả sản phẩm"
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                            />

                            <label className="px-4 py-2 block" htmlFor="product-images">Hình ảnh</label>
                            <input
                                id="product-images"
                                type="file"
                                multiple
                                accept="image/*"
                                className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                onChange={(e) => {
                                    if (e.target.files) {
                                        setNewImages([...newImages, ...Array.from(e.target.files)]);
                                    }
                                }}
                            />

                            <div className="flex flex-wrap gap-2 mb-3">
                                {/* Existing Images (from server) */}
                                {existingImages
                                    .filter(url => !removedImages.includes(url))
                                    .map((url, idx) => (
                                        <div key={`existing-${idx}`} className="relative">
                                            <Image
                                                src={url}
                                                alt={`existing-preview-${idx}`}
                                                width={80}
                                                height={80}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                                onClick={() => setRemovedImages([...removedImages, url])}
                                                aria-label="Remove image"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}

                                {/* New Image Previews */}
                                {newImages.map((file, idx) => (
                                    <div key={`new-${idx}`} className="relative">
                                        <Image
                                            src={URL.createObjectURL(file)}
                                            alt={`new-preview-${idx}`}
                                            width={80}
                                            height={80}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                            onClick={() => setNewImages(newImages.filter((_, i) => i !== idx))}
                                            aria-label="Remove image"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>




                        </div>

                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200 dark:border-neutral-700">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="py-2 px-3 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                            >
                                Đóng
                            </button>
                            <button
                                type="button"
                                onClick={handleEditProduct}
                                className="py-2 px-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProductModal;
