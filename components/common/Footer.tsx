import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
    return (
        <footer className="bg-[#2c3342] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="font-extrabold tracking-tight text-lg md:text-xl">
                            <h2 className="text-2xl font-bold">
                                <span className="text-orange-500">OV</span>
                                <span>CAFE</span>
                            </h2>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Nền tảng giúp bạn tham gia - tạo phòng, kết nối bạn bè và chia sẻ những khoảnh khắc đáng nhớ
                        </p>

                        {/* Social Media Icons */}
                        <div className="flex gap-4 pt-2">
                            <Button variant="ghost" size="icon" className="bg-[#3d4452] hover:bg-[#4a5163] rounded w-9 h-9 p-0">
                                <FaXTwitter className="w-4 h-4 text-white" />
                            </Button>
                            <Button variant="ghost" size="icon" className="bg-[#3d4452] hover:bg-[#4a5163] rounded w-9 h-9 p-0">
                                <FaFacebookF className="w-4 h-4 text-white" />
                            </Button>
                            <Button variant="ghost" size="icon" className="bg-[#3d4452] hover:bg-[#4a5163] rounded w-9 h-9 p-0">
                                <FaInstagram className="w-4 h-4 text-white" />
                            </Button>
                            <Button variant="ghost" size="icon" className="bg-[#3d4452] hover:bg-[#4a5163] rounded w-9 h-9 p-0">
                                <FaTiktok className="w-4 h-4 text-white" />
                            </Button>
                        </div>
                    </div>

                    {/* Account Section */}
                    <div className="space-y-4">
                        <h3 className="text-base font-semibold mb-3">Tài khoản</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                                >
                                    Đăng nhập
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                                >
                                    Tạo phòng
                                </Link>
                            </li>
                            <li className="pt-2">
                                <Button variant="outline" className="bg-transparent border-gray-500 text-gray-400 hover:bg-[#3d4452] hover:text-white text-sm h-8 px-3">
                                    🇬🇧 English ▼
                                </Button>
                            </li>
                        </ul>
                    </div>

                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-base font-semibold mb-3">Về chúng tôi</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                                >
                                    Trợ giúp
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                                >
                                    Điều khoản
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                                >
                                    Bảo mật
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <Separator className="bg-gray-600" />
                <div className="pt-8">
                    <p className="text-center text-gray-400 text-sm">
                        © 2025 OVCAFE. All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}