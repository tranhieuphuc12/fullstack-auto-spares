import Image from 'next/image';
import React from 'react';
import BCT from '../../..//public/bct.webp';
import { Info, Link, CircleHelp } from 'lucide-react';
import Tiktok from '../../../public/icons8-tiktok.svg'
import Zalo from '../../../public/icons8-zalo.svg'
import Facebook from '../../../public/icons8-facebook.svg'
import Shopee from '../../../public/icons8-shopee.svg'
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-10">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Brand Section */}
                <aside className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            className="fill-current text-yellow-500">
                            <path
                                d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                        </svg>
                        <p className="text-lg font-bold">MVP Auto</p>
                    </div>
                    <p className="text-sm" spellCheck="false">
                        Phụ kiện ô tô chính hãng MVP Auto
                        <br />
                        Chuyên cung cấp phụ tùng ô tô chính hãng, đảm bảo chất lượng và uy tín.
                        <br />
                        Đối tác tin cậy của mọi tài xế.
                    </p>
                </aside>

                {/* Information Section */}
                <nav className="space-y-4">
                    <h6 className="text-lg font-semibold border-b border-gray-600 pb-2"><Info className='inline-block mx-1' />Thông Tin</h6>
                    <ul className="space-y-2 text-sm">
                        <li>Email: <a className="text-yellow-400 hover:underline cursor-pointer">mvpauto@gmail.com</a></li>
                        <li>Hotline: <a className="text-yellow-400 hover:underline cursor-pointer">0909 999 999</a></li>
                        <li>Địa chỉ: <a className="text-yellow-400 hover:underline cursor-pointer">123 Đường ABC, Quận 1, TP.HCM</a></li>
                        <li>Giờ làm việc: Thứ 2 - Thứ 7, 8h - 17h</li>
                        <li><Image
                            src={BCT}
                            alt="BCT"
                            width={100}
                            height={50}
                            className="object-contain"
                        /></li>
                    </ul>
                </nav>

                {/* Legal Section */}
                <nav className="space-y-4">
                    <h6 className="text-lg font-semibold border-b border-gray-600 pb-2"><CircleHelp className="inline-block mx-1" />Chính Sách</h6>
                    <ul className="space-y-2 text-sm list-disc">
                        <li><a className="text-yellow-400 hover:underline cursor-pointer">Chính sách bảo hành</a></li>
                        <li><a className="text-yellow-400 hover:underline cursor-pointer">Chính sách đổi trả</a></li>
                        <li><a className="text-yellow-400 hover:underline cursor-pointer">Chính sách vận chuyển</a></li>
                        <li><a className="text-yellow-400 hover:underline cursor-pointer">Chính sách bảo mật</a></li>
                        <li><a className="text-yellow-400 hover:underline cursor-pointer">Chính sách thanh toán</a></li>
                        <li><a className="text-yellow-400 hover:underline cursor-pointer">Dịch vụ Ship COD toàn quốc</a></li>

                    </ul>
                </nav>

                {/* Additional Legal Section */}
                <nav className="space-y-4">
                    <h6 className="text-lg font-semibold border-b border-gray-600 pb-2"><Link className='inline-block mx-1' />Liên Kết</h6>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Image
                                src={Facebook}
                                alt="Facebook"
                                width={20}
                                height={20}
                                className='text-yellow-50 hover:text-yellow-400 cursor-pointer inline-block mx-1' /><a className="text-yellow-400 hover:underline cursor-pointer">Facebook</a>
                        </li>

                        <li>
                            <Image
                                src={Zalo}
                                alt="Zalo"
                                width={20}
                                height={20}
                                className="object-contain inline-block mx-1 text-yellow-50 hover:text-yellow-400 cursor-pointer"
                            /><a className="text-yellow-400 hover:underline">Zalo</a></li>
                        <li>
                            <Image
                                src={Tiktok}
                                alt="Tiktok"
                                width={20}
                                height={20}
                                className="object-contain inline-block mx-1 text-yellow-50 hover:text-yellow-400 cursor-pointer"
                            /><a className="text-yellow-400 hover:underline">Tiktok</a></li>
                        <li>
                            <Image
                                src={Shopee}
                                alt="Shopee"
                                width={20}
                                height={20}
                                className="object-contain inline-block mx-1 text-yellow-50 hover:text-yellow-400 cursor-pointer"
                            /><a className="text-yellow-400 hover:underline">Shopee</a></li>
                    </ul>
                </nav>
            </div>
            <div className="mt-10 text-center text-sm text-gray-500">
                © 2025 MVP Auto. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;