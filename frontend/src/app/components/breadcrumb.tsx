'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  className?: string;
}

export default function Breadcrumbs({ className }: BreadcrumbsProps) {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const baseApi = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [{ label: 'Trang chủ', href: '/' }];

    const buildBreadcrumbs = async () => {
      if (segments[0] === 'products') {
        items.push({ label: 'Sản phẩm', href: '/products' });

        // /products/categoryId/[categoryId]
        if (segments[1] === 'categoryId' && segments[2]) {
          const categoryId = segments[2];

          try {
            const res = await fetch(`${baseApi}/api/categories/${categoryId}`);
            const data = await res.json();

            items.push({
              label: data.name,
              href: pathname,
            });
          } catch (err) {
            console.error('Failed to fetch category info', err);
          }
        }

        // /products/brand/[brandName]
        else if (segments[1] === 'brand' && segments[2]) {
          const brandName = decodeURIComponent(segments[2]);

          items.push({
            label: brandName,
            href: pathname,
          });
        }

        // /products/[productId]
        else if (segments[1] && !segments[2]) {
          const productId = segments[1];

          try {
            const res = await fetch(`${baseApi}/api/products/${productId}`);
            const data = await res.json();

            if (data.category) {
              items.push({
                label: data.category.name,
                href: `/products/categoryId/${data.category.id}`,
              });
            }

            items.push({
              label: data.product.name,
            });
          } catch (err) {
            console.error('Failed to fetch product info', err);
          }
        }
      }

      setBreadcrumbs(items);
    };

    buildBreadcrumbs();
  }, [pathname, baseApi]);

  if (breadcrumbs.length === 0) return null;

  return (
    <ol className={`flex items-center whitespace-nowrap my-5 ${className ? ` ${className}` : ''}`}>
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <li key={index} className="inline-flex items-center">
            {!isLast ? (
              <>
                <Link
                  href={item.href || '#'}
                  className="flex items-center text-sm md:text-base text-gray-500 hover:text-red-600 focus:outline-none focus:text-red-600"
                >
                  {item.label}
                </Link>
                <svg
                  className="shrink-0 size-5 text-gray-400 mx-2"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round" />
                </svg>
              </>
            ) : (
              <span
                className="inline-flex items-center text-sm md:text-base font-semibold text-gray-800 truncate"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
