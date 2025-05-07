import Image from 'next/image';
import React from 'react';
import BCT from '../../..//public/bct.webp';
import { Info, Link, CircleHelp } from 'lucide-react';
import Tiktok from '../../../public/icons8-tiktok.svg'
import Zalo from '../../../public/icons8-zalo.svg'
import Facebook from '../../../public/icons8-facebook.svg'
import Shopee from '../../../public/icons8-shopee.svg'
const Footer = () => {
    const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER;
    const ADDRESS = process.env.NEXT_PUBLIC_ADDRESS;
    const EMAIL = process.env.NEXT_PUBLIC_EMAIL;    
    const FACEBOOK_LINK = process.env.NEXT_PUBLIC_FACEBOOK;
    return (
        <footer className="bg-gray-800 text-white p-10">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Brand Section */}
                <aside className="space-y-4">
                    <div className="flex items-center space-x-2">
                       
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
                        <li>Email: <a href={`mailto:${EMAIL}`} className="text-yellow-400 hover:underline cursor-pointer">{EMAIL}</a></li>
                        <li>Hotline: <a href={`tel:${PHONE_NUMBER}`} className="text-yellow-400 hover:underline cursor-pointer">{PHONE_NUMBER}</a></li>
                        <li>Địa chỉ: <a href='https://maps.app.goo.gl/AY72PH5oMAYKZj9v6' className="text-yellow-400 hover:underline cursor-pointer"> {ADDRESS}</a></li>
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
                                className='text-yellow-50 hover:text-yellow-400 cursor-pointer inline-block mx-1' /><a 
                                href={FACEBOOK_LINK}className="text-yellow-400 hover:underline cursor-pointer">Facebook</a>
                        </li>

                        <li>
                            <Image
                                src={Zalo}
                                alt="Zalo"
                                width={20}
                                height={20}
                                className="object-contain inline-block mx-1 text-yellow-50 hover:text-yellow-400 cursor-pointer"
                            /><a   href={`https://zalo.me/${PHONE_NUMBER}`} className="text-yellow-400 hover:underline cursor-pointer">Zalo</a></li>
                        <li>
                            <Image
                                src={Tiktok}
                                alt="Tiktok"
                                width={20}
                                height={20}
                                className="object-contain inline-block mx-1 text-yellow-50 hover:text-yellow-400 cursor-pointer"
                            /><a className="text-yellow-400 hover:underline cursor-pointer">Tiktok</a></li>
                        <li>
                            <Image
                                src={Shopee}
                                alt="Shopee"
                                width={20}
                                height={20}
                                className="object-contain inline-block mx-1 text-yellow-50 hover:text-yellow-400 cursor-pointer"
                            /><a className="text-yellow-400 hover:underline cursor-pointer">Shopee</a></li>
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