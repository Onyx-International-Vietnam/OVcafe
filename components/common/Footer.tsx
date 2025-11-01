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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="font-extrabold tracking-tight text-lg md:text-xl">
                            <h2 className="text-2xl sm:text-3xl font-bold">
                                <span className="text-orange-500">OV</span>
                                <span>CAFE</span>
                            </h2>
                        </Link>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-sm">
                            Nền tảng giúp bạn tham gia - tạo phòng, kết nối bạn bè và chia sẻ những khoảnh khắc đáng nhớ
                        </p>

                        {/* Social Media Icons */}
                        <div className="flex gap-6 pt-2">
                            <Button variant="ghost" size="icon" className="bg-[#3d4452] hover:bg-[#4a5163] rounded-full w-10 h-10 p-0">
                                <FaXTwitter className="w-5 h-5 text-[#bdbdbd] hover:text-white transition-colors duration-200" />
                            </Button>
                            <Button variant="ghost" size="icon" className="bg-[#3d4452] hover:bg-[#4a5163] rounded-full w-10 h-10 p-0">
                                <FaFacebookF className="w-5 h-5 text-[#bdbdbd] hover:text-white transition-colors duration-200" />
                            </Button>
                            <Button variant="ghost" size="icon" className="bg-[#3d4452] hover:bg-[#4a5163] rounded-full w-10 h-10 p-0">
                                <FaInstagram className="w-5 h-5 text-[#bdbdbd] hover:text-white transition-colors duration-200" />
                            </Button>
                            <Button variant="ghost" size="icon" className="bg-[#3d4452] hover:bg-[#4a5163] rounded-full w-10 h-10 p-0">
                                <FaTiktok className="w-5 h-5 text-[#bdbdbd] hover:text-white transition-colors duration-200" />
                            </Button>
                        </div>
                    </div>

                    {/* Account Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">Tài khoản</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors duration-200"
                                >
                                    Đăng nhập
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors duration-200"
                                >
                                    Tạo phòng
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">Về chúng tôi</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors duration-200"
                                >
                                    Trợ giúp
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors duration-200"
                                >
                                    Điều khoản
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors duration-200"
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