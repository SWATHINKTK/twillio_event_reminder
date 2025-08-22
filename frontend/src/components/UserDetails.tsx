'use client'; // Enable client-side rendering (state, hooks)

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSave, FiPhone, FiCheck } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

export default function UserDetailsPage() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const { user, setUser } = useAuth();

    useEffect(() => {
        console.log("User Details Page Loaded", user)
        if (!user) {
            router.push('/');
        }
    }, [router, user])

    const handleSave = async () => {
        const indianPhoneRegex = /^[6-9]\d{9}$/; // Indian mobile number validation

        if (!phoneNumber.trim()) {
            alert("Phone number cannot be empty");
            return;
        }

        if (!indianPhoneRegex.test(phoneNumber)) {
            alert("Please enter a valid Indian mobile number");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/phone`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ phoneNumber }),
            });

            if (!res.ok) throw new Error("Failed to save phone number");

            const data = await res.json();
            if (data.success) {
                setUser((prev) => (prev ? { ...prev, phoneNumber } : prev));
            }

        } catch (error) {
            console.error("Error saving phone number:", error);
        }
    };

    const handleLogout = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (res.ok) {
            setUser(null);
            router.push('/');
        } else {
            console.error("Error logging out:", await res.text());
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">

            {/* Main Content */}
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* User Profile Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-black opacity-10"></div>
                        <div className="relative">

                            <h2 className="text-2xl font-bold text-white mb-2">{user?.name}</h2>
                            <p className="text-blue-100 text-lg">{user?.email}</p>

                            {/* Decorative Elements */}
                            <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white/20 rounded-full"></div>
                            <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white/20 rounded-full"></div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="p-8">
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                                <FiPhone className="w-6 h-6 text-blue-600" />
                                Contact Information
                            </h3>

                            {/* Phone Input */}
                            <div className="relative">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-3">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiPhone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={phoneNumber || user?.phoneNumber || ''}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        disabled={!!user?.phoneNumber}
                                        placeholder="7888 5556 45"
                                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg font-medium placeholder-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            disabled={!!user?.phoneNumber}
                            className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform ${user?.phoneNumber
                                ? 'bg-green-500 text-white'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:-translate-y-0.5 hover:shadow-lg'

                                }`}
                        >
                            <div className="flex items-center justify-center gap-3">
                                {user?.phoneNumber ? (
                                    <>
                                        <FiCheck className="w-6 h-6" />
                                        <span>Saved !</span>
                                    </>
                                ) : (
                                    <>
                                        <FiSave className="w-6 h-6" />
                                        <span>Save Details</span>
                                    </>
                                )}
                            </div>
                        </button>
                        <button onClick={handleLogout} className="mt-4 text-red-600 hover:underline w-full py-4 px-6 rounded-2xl font-semibold">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
