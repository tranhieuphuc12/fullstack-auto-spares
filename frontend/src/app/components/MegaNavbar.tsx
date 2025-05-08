"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../public/logo.png';
import { MapPinned, Phone } from 'lucide-react';
import { toast } from 'react-toastify';
import Category from '@/app/interfaces/ICategory';
import Brand from '@/app/interfaces/IBrand';

const MegaNavbar = () => {

    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [cars , setCars] = useState<Brand[]>([]);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const apiBase = process.env.NEXT_PUBLIC_API_BASE;
    const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER;
    const notify = () => toast.error(error || 'Ký tự không hợp lệ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const closeMobileMenu = () => {
        const overlayEl = document.querySelector('#hs-navbar-to-overlay');
        // Close with Preline's API if available
        if (window.HSOverlay && overlayEl) {
            const instance = window.HSOverlay.getInstance(overlayEl as HTMLElement);
            instance?.close();
        }
    }

    const handleSearch = () => {
        // Check for empty query
        const trimmedQuery = query.trim();

        // Check for invalid characters (e.g., special characters)
        const invalidCharacters = /[!@#$%^&*()?":{}|<>]/g;

        if (trimmedQuery === '') {
            setError('Hãy nhập từ khóa tìm kiếm');
            notify();

        } else if (invalidCharacters.test(trimmedQuery)) {
            setError('Ký tự không hợp lệ');
            notify();
        }
        else {
            // Save the search query to local storage
            const updatedHistory = [query, ...searchHistory.filter(q => q !== query)].slice(0, 5);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
            setSearchHistory(updatedHistory);

            // Navigate to the search results page
            window.location.href = `/search?query=${trimmedQuery}`;
            setError('');
            setQuery('');
        }
    };


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${apiBase}/api/categories`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategories(data);

            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        const fetchCarBrands = async () => {
            try {
                const response = await fetch(`${apiBase}/api/brands/car`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();                
                setCars(data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        }
        fetchCarBrands();
        fetchCategories();
    }, []);

    useEffect(() => {
        const history = localStorage.getItem('searchHistory') || '[]';
        if (history) {
            setSearchHistory(JSON.parse(history));
        }
    }, []);



    return (
        <>
            <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-3 sm:py-3  border-b border-gray-200  shadow-md">

                <nav className="max-w-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8">
                    <div className="relative sm:flex sm:items-center">
                        <div className="flex items-center justify-between">
                            <Link className="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80" href="/" aria-label="Brand">
                                <div className="w-16 sm:w-20 md:w-24 lg:w-25">

                                    <Image
                                        className="rounded-full"
                                        src={Logo}
                                        alt="Logo"
                                        layout="responsive"
                                        width={100}
                                        height={100}
                                    />
                                </div>

                            </Link>
                            <div className="sm:hidden">
                                <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none " id="hs-navbar-to-overlay-collapse" aria-haspopup="dialog" aria-expanded={'false'} aria-controls="hs-navbar-to-overlay" aria-label="Toggle navigation" data-hs-overlay="#hs-navbar-to-overlay" data-hs-overlay-options='{"moveOverlayToBody": 640}'
                                >
                                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                                </button>
                            </div>
                        </div>
                        {/* Menu */}
                        <div
                            id="hs-navbar-to-overlay" className={`hs-overlay hs-overlay-open:translate-x-0 [--auto-close:sm] -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full w-full z-60 bg-white border-e sm:static sm:block sm:h-auto sm:w-full sm:border-e-transparent sm:transition-none sm:transform-none sm:translate-x-0 sm:z-40 hidden`} role="dialog" tabIndex={-1} aria-label="Sidebar" data-hs-overlay-close-on-resize>
                            <div className="overflow-hidden overflow-y-auto h-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ">

                                <div className="flex flex-col gap-y-3 sm:gap-y-0 sm:flex-row sm:items-center sm:justify-center  p-2 sm:p-0 xl:justify-start md:mx-5">
                                    <div className="py-3 sm:hidden flex justify-between items-center border-b border-gray-200 ">
                                        <h3 className="font-semibold text-gray-800 ">
                                            Menu
                                        </h3>
                                        <button type="button" className="py-1.5 px-2 inline-flex justify-center items-center gap-x-1 rounded-full border border-gray-200 text-xs text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none " aria-label="Close" data-hs-overlay="#hs-navbar-to-overlay" aria-expanded="true">
                                            Close
                                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                                        </button>
                                    </div>

                                    <div className=" flex-col hidden xl:flex mx-10">
                                        <h1 className='capitalize text-green-400 font-bold xl:text-base'>
                                            chuyên cung cấp linh kiện xe hơi
                                        </h1>
                                        <h2 className="mt-2 text-gray-500 text-start xl:text-xs ">
                                            Đường 49, Hiệp Bình Chánh, Thủ Đức, TP.HCM
                                        </h2>
                                    </div>

                                    <Link className="sm:p-2 font-semibold text-sm text-gray-600 hover:text-gray-400 focus:outline-hidden focus:text-gray-400 " href="/" aria-current="page"
                                        onClick={closeMobileMenu}
                                    >Trang Chủ</Link>

                                    <Link className="sm:p-2 font-semibold text-sm text-gray-600 hover:text-gray-400 focus:outline-hidden focus:text-gray-400 " href="/about-us"
                                        onClick={closeMobileMenu}
                                    >Về Chúng Tôi</Link>

                                    <div className="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover] [--is-collapse:true] sm:[--is-collapse:false] ">
                                        <Link href="/products" id="hs-mega-menu" className="hs-dropdown-toggle sm:p-5 flex items-center w-full text-gray-600 font-semibold text-sm hover:text-gray-400 focus:outline-hidden focus:text-gray-400 " aria-haspopup="menu" aria-expanded="false" aria-label="Mega Menu"
                                            onClick={(e) => {
                                                if (window.innerWidth <= 768) {
                                                    e.preventDefault();
                                                }
                                            }}>

                                            Sản Phẩm
                                            <svg className="hs-dropdown-open:-rotate-180 sm:hs-dropdown-open:rotate-0 duration-300 ms-2 shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                        </Link>

                                        <div className="hs-dropdown-menu sm:transition-[opacity,margin] sm:ease-in-out sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-90 hidden z-10 sm:mt-1 top-2/3 end-1/3 min-w-60 bg-white sm:shadow-md rounded-lg py-2 sm:px-2  before:absolute" role="menu" aria-orientation="vertical" aria-labelledby="hs-mega-menu">
                                            <div className="sm:grid sm:grid-cols-2 border rounded-lg border-gray-200 gap-x-2
                                            md:border-none">
                                                <div className="flex flex-col">
                                                    {categories.map((category: Category) => (
                                                        <Link key={category._id} className="flex items-center py-2 px-3 font-semibold text-sm text-gray-600 hover:text-gray-400 
                                                        rounded-lg
                                                        hover:bg-gray-200
                                                        focus:outline-hidden focus:text-gray-400
                                                    "
                                                            href={`/products/categoryId/${category._id}`}>
                                                            {category.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                                <div className="flex flex-col">
                                                    {cars.map((car: Brand) => (
                                                    <Link key={car._id} className="flex items-center py-2 px-3 font-semibold text-sm text-gray-600 hover:text-gray-400 
                                                        rounded-lg
                                                        hover:bg-gray-200
                                                        focus:outline-hidden focus:text-gray-400"
                                                         href={`/products/brand/${car.name}`}>
                                                         {car.name}
                                                    </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative mt-3 lg:mt-0 lg:ms-10 flex items-center gap-4 sm:pb-2 lg:pb-0">
                                        <input
                                            type="text"
                                            value={query} onChange={(e) => setQuery(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSearch();
                                                }
                                            }}

                                            className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Tìm kiếm"
                                        />
                                        <button
                                            type="button"
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none sm:pb-2 lg:pb-0"
                                            aria-label="Search"
                                            onClick={handleSearch}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <circle cx="11" cy="11" r="8" />
                                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                            </svg>
                                        </button>

                                    </div>

                                    <div className="flex-col hidden md:flex lg:flex gap-2 ps-10 font-semibold sm:text-xs">
                                        <button className="btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-gray-300 rounded-lg hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700 group py-2 px-3 gap-2 cursor-pointer">
                                            <span className="w-56 h-48 rounded bg-green-600 absolute bottom-0 left-0 translate-x-full translate-y-full mb-9 ml-9 transition-all duration-500 ease-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                            <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white flex items-center gap-2 cursor-pointer" onClick={() => window.open('https://maps.app.goo.gl/AY72PH5oMAYKZj9v6', '_blank')}>
                                                <MapPinned className='text-red-600 group-hover:text-white' />
                                                <span className="font-bold text-red-600 text-sm group-hover:text-white">Show Room</span></span>
                                        </button>
                                        <button className="btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-gray-300 rounded-lg hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700 group py-2 px-3 gap-2 cursor-pointer">
                                            <span className="w-56 h-48 rounded bg-green-600 absolute bottom-0 left-0 translate-x-full translate-y-full mb-9 ml-9 transition-all duration-500 ease-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                            <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white flex items-center gap-2 cursor-pointer"
                                                onClick={() => window.location.assign(`tel:${PHONE_NUMBER}`)}>
                                                <Phone className="text-red-600 group-hover:text-white" />
                                                <span className="font-bold text-red-600 text-sm group-hover:text-white">{PHONE_NUMBER}</span>
                                            </span>
                                        </button>

                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};
export default MegaNavbar;