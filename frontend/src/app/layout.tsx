
import Footer from "@/app/components/Footer";
import Map from "@/app/components/Map";
import PrelineScriptWrapper from '@/app/components/PrelineScriptWrapper';
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import 'react-loading-skeleton/dist/skeleton.css'
import { Inter } from "next/font/google";
import MegaNavbar from "@/app/components/MegaNavbar";


const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],

});

export const metadata: Metadata = {
  title: "MVP Auto",
  icons: {
    icon: "/favicon.ico",
  },

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>      
      <body className="antialiased">


        <MegaNavbar />
        {children}
        <Map />

        <Footer />
        <ToastContainer />


      </body>
      
      <PrelineScriptWrapper />
      
    </html>
  );
}