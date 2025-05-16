import React, { useEffect, useState } from 'react';
import Category from '@/app/interfaces/ICategory'; 
import ProductList from '@/app/components/ProductsList';

const HomeProductList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
	const fetchCategories = async () => {
	  try {
		// Replace the URL below with your actual categories API endpoint
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

  return (
	<div>
        <ProductList API={`${API_BASE}/api/products?`}/>
		{categories.map((category) => (            
		  <ProductList key={category._id} API={`${API_BASE}/api/products/categoryId/${category._id}?`} title={category.name}/>
		))}
	 
	</div>
  );
};

export default HomeProductList;
