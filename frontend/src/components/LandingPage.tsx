"use client";

import React, { useEffect } from 'react'
import {
    HiOutlineCalendar,
    HiOutlinePhone,
    HiOutlineBell,
    HiOutlineLightningBolt,
    HiOutlineClock
} from 'react-icons/hi';
import { FcGoogle } from "react-icons/fc";
import { SiGooglecalendar } from "react-icons/si";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export const LandingPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (user?._id) {
            router.replace(`/dashboard`);
        }
    }, [router, user])
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl mb-6 shadow-xl">
                        <HiOutlineBell className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Reminder</h1>
                    <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                        Never miss an important event again. Get automated phone call reminders
                        for your Google Calendar events.
                    </p>
                </div>

                {/* Auth Card */}
                <div className="max-w-md mx-auto mb-9">
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 backdrop-blur-sm">
                        <a
                            href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`}
                            className="w-full flex items-center justify-center gap-4 bg-white border-2 border-gray-200 rounded-2xl px-6 py-4 text-gray-700 font-semibold hover:border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 group mb-4"
                        >
                            <FcGoogle className="w-8 h-8" />
                            <span className="text-lg">Sign in With Google</span>
                            {/* <div className="w-6 h-6 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-full flex items-center justify-center">
                  <HiOutlineCalendar className="w-3 h-3 text-white" />
                </div>
                <span className="text-lg">Connect Google Calendar</span> */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <HiOutlineLightningBolt className="w-4 h-4 text-blue-500" />
                            </div>
                        </a>


                        <div className="flex items-center justify-center gap-3 text-gray-600">
                            <SiGooglecalendar className="w-4 h-4 text-green-500" />
                            <span className="text-sm">Connect With Google Calendar</span>
                        </div>

                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <HiOutlineCalendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Google Calendar Sync</h3>
                        <p className="text-gray-600">Automatically monitors your Google Calendar for upcoming events</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                            <HiOutlinePhone className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Call Alerts</h3>
                        <p className="text-gray-600">Receive phone call reminders via Twilio integration</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                            <HiOutlineClock className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">5-Minute Alerts</h3>
                        <p className="text-gray-600">Get notified exactly 5 minutes before your events start</p>
                    </div>
                </div>


            </div>
        </div>
    );
}
