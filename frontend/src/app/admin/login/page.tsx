'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
    const router = useRouter();

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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        console.log(API_BASE);

        //validate inputs
        if (!username || !password) {
            setError('Hãy nhập tên đăng nhập và mật khẩu');
            notify();
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/api/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });            


            if (!response.ok) {                
                setError('Tên đăng nhập hoặc mật khẩu không đúng');
                notify();
                return;
            } 
            router.push('/admin');


        } catch (error) {
            setError('Tên đăng nhập hoặc mật khẩu không đúng');
            console.error('Login error:', error);
        }
    };




    return (
        <>

            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">ADMIN</h2>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>


                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                            onClick={handleLogin}
                        >
                            Sign In
                        </button>
                    </form>


                </div>
            </div>
        </>
    );
};

export default LoginPage;