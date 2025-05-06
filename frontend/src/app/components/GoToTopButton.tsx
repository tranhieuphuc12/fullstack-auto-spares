"use client";
import React, { useState, useEffect } from "react";
import { CircleChevronUp } from "lucide-react";

const GoToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        isVisible && (
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-5 right-4 md:bottom-15 md:right-6 z-50 bg-yellow-400 hover:bg-yellow-700 text-white p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 cursor-pointer"
            >
                <CircleChevronUp />
            </button>
        )
    );
};
export default GoToTopButton;