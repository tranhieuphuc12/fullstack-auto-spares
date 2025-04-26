
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import ZaloIcon from '../../../public/Icon_of_Zalo.svg.png'

const ZaloButton = () => {
    return (
        <Link
            href="https://zalo.me/0338867216"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-20 right-4 sm:bottom-16 sm:right-6 md:bottom-35 md:right-6 z-50"
        >
            <div className="relative w-12 h-12 md:w-14">
                {/* Wave animation circle */}
                <span className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-75"></span>

                {/* Actual button */}
                <div className="relative z-10 bg-blue-600 hover:bg-blue-700 p-3 sm:p-4 rounded-full shadow-lg flex items-center justify-center">
                    <Image src={ZaloIcon} alt="messenger-icon" width={24} height={24} />
                </div>
            </div>
        </Link>
    );
};

export default ZaloButton;
