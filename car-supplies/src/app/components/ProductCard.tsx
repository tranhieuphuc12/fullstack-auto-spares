import Image from 'next/image';
import React from 'react';
import Product from '@/app/interfaces/IProduct';
import Link from 'next/link';

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <>
            <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="relative group w-full h-48">
                    <Link href={`/products/${product.id}`} className="absolute inset-0">
                        <Image src={product.thumbnail} alt={product.name} className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105" width={100} height={100} />
                    </Link>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                        <Link href={`/products/${product.id}`} className="absolute inset-0">
                        </Link>
                    </div>
                </div>
                <div className="p-4">
                    <Link href={`/products/${product.id}`} >
                        <h3 className="text-sm text-center font-semibold mb-1
                        text-gray-800 hover:text-red-600">{product.name}</h3></Link>
                    <p className="text-green-600 text-center font-bold ">{product.price}</p>
                </div>
            </div>
        </>
    );
};
export default ProductCard;