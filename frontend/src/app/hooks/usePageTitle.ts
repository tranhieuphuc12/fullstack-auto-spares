'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function usePageTitle() {
  const pathname = usePathname();
  const [title, setTitle] = useState<string>('');
  const baseApi = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);

    const getTitle = async () => {
      if (segments[0] === 'products') {
        // /products/brand/[brandName]
        if (segments[1] === 'brand' && segments[2]) {
          const brandName = decodeURIComponent(segments[2]);
          setTitle(brandName);
        }

        // /products/categoryId/[categoryId]
        else if (segments[1] === 'categoryId' && segments[2]) {
          const categoryId = segments[2];
          try {
            const res = await fetch(`${baseApi}/api/categories/${categoryId}`);
            const data = await res.json();
            setTitle(data.name);
          } catch (err) {
            console.error('Failed to fetch category name', err);
          }
        }

        // /products/[productId] → optional: set product name
        else if (segments[1] && !segments[2]) {
          try {
            const res = await fetch(`${baseApi}/api/products/${segments[1]}`);
            const data = await res.json();
            setTitle(data.product.name); // Optional
          } catch (err) {
            console.error('Failed to fetch product name', err);
          }
        }
      }
    };

    getTitle();
  }, [pathname, baseApi]);

  return title;
}
