"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../public/logo_2.jpg';
import { MapPinned, Phone } from 'lucide-react';
import { toast } from 'react-toastify';

const MegaNavbar = () => {
    const notify = () => toast('Wow so easy !');

    const [search, setSearch] = React.useState<string>('');
    // const [error, setError] = React.useState<string>('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Allow only letters, numbers, spaces, and basic punctuation
        const regex = /^[a-zA-Z0-9\s\-_,.]*$/;

        if (!regex.test(value)) {
            // setError('Invalid characters detected.');
            // console.log(error);
            
            notify();
        } else {
            // setError('');
            setSearch(value);
        }
    };
    const handleSearch = () => {
        if (search.trim() === '') {
            // setError('Please enter a search term.');
            notify();
        } else {
            // Perform search action here
            console.log('Searching for:', search);
            setSearch('');
        }
    };

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
                                <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none " id="hs-navbar-to-overlay-collapse" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-navbar-to-overlay" aria-label="Toggle navigation" data-hs-overlay="#hs-navbar-to-overlay" data-hs-overlay-options='{"moveOverlayToBody": 640}'>
                                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                                </button>
                            </div>
                        </div>

                        <div id="hs-navbar-to-overlay" className="hs-overlay hs-overlay-open:translate-x-0 [--auto-close:sm] -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full w-full z-60 bg-white border-e sm:static sm:block sm:h-auto sm:w-full sm:border-e-transparent sm:transition-none sm:transform-none sm:translate-x-0 sm:z-40 hidden" role="dialog" tabIndex={-1} aria-label="Sidebar" data-hs-overlay-close-on-resize>
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

                                    <Link className="sm:p-2 font-semibold text-sm text-gray-600 hover:text-gray-400 focus:outline-hidden focus:text-gray-400 " href="/" aria-current="page">Trang Chủ</Link>

                                    <Link className="sm:p-2 font-semibold text-sm text-gray-600 hover:text-gray-400 focus:outline-hidden focus:text-gray-400 " href="/about-us">Về Chúng Tôi</Link>

                                    <div className="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover] [--is-collapse:true] sm:[--is-collapse:false] ">
                                        <Link href="/products" id="hs-mega-menu" className="hs-dropdown-toggle sm:p-5 flex items-center w-full text-gray-600 font-semibold text-sm hover:text-gray-400 focus:outline-hidden focus:text-gray-400 " aria-haspopup="menu" aria-expanded="false" aria-label="Mega Menu">

                                            Sản Phẩm
                                            <svg className="hs-dropdown-open:-rotate-180 sm:hs-dropdown-open:rotate-0 duration-300 ms-2 shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                        </Link>

                                        <div className="hs-dropdown-menu sm:transition-[opacity,margin] sm:ease-in-out sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-50 hidden z-10 sm:mt-1 top-full end-1/3 min-w-60 bg-white sm:shadow-md rounded-lg py-2 sm:px-2  before:absolute" role="menu" aria-orientation="vertical" aria-labelledby="hs-mega-menu">
                                            <div className="sm:grid sm:grid-cols-1">
                                                <div className="flex flex-col">
                                                    <Link className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 " href="#">
                                                        About
                                                    </Link>
                                                    <Link className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100" href="#">
                                                        Services
                                                    </Link>
                                                    <Link className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 " href="#">
                                                        Customer Story
                                                    </Link>
                                                </div>                              </div>
                                        </div>
                                    </div>

                                    <div className="relative mt-3 lg:mt-0 lg:ms-10 flex items-center gap-4 sm:pb-2 lg:pb-0">
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={handleInputChange}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSearch();
                                                }
                                            }}
                                            className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Search for products..."
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

                                    <div className="flex-col hidden md:flex lg:flex gap-2 ps-10 font-semibold">
                                        <div className="flex items-center gap-2">
                                            <Phone color='#606060'/>
                                            <span className="text-red-500 pt-2">01 234 567 89</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPinned color='#606060'/>
                                            <span className="text-red-500 pt-2">Show Room</span>
                                        </div>
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

