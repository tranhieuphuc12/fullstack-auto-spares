import React, { useEffect, useState } from 'react';
import Category from '@/app/interfaces/ICategory';
import ProductList from '@/app/components/ProductsList';

const HomeProductList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

    useEffect(() => {
        const fetchCategories = async () => {
            try {

                const response = await fetch(`${API_BASE}/api/categories`);
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);
    useEffect(() => {
       // remove categoies with subcategories 
        const filtered = categories.filter((category) => !category.subCategories || category.subCategories.length === 0);
        setFilteredCategories(filtered);
    }, [categories]);



    return (
        <div>
            <ProductList API={`${API_BASE}/api/products?`} />
            {filteredCategories.map((category) => (
                <ProductList key={category._id} API={`${API_BASE}/api/products/categoryId/${category._id}?`} title={category.name} />

            ))}

        </div>
    );
};

export default HomeProductList;
