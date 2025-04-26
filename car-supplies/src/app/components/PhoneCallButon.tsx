
import React from 'react';
import Link from 'next/link';
import { PhoneCall } from 'lucide-react';

const PhoneCallButton = () => {
  return (
    <Link
      href="tel:+1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-50 right-4 sm:bottom-48 sm:right-6 md:bottom-75 md:right-6 z-50"
    >
      <div className="relative w-12 h-12 md:w-14">
        {/* Wave animation circle */}
        <span className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-75"></span>

        {/* Actual button */}
        <div className="relative z-10 bg-green-600 hover:bg-green-700 p-3 sm:p-4 rounded-full shadow-lg flex items-center justify-center">
        <PhoneCall color='#fff' width={24} height={24}/>
        </div>
      </div>
    </Link>
  );
};

export default PhoneCallButton;
