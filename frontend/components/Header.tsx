'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  // Avatar should be loaded from user context only
  const avatarPreview = user?.avatar_url || null;

  return (
    <header className="text-black flex justify-between items-center cursor-pointer fixed top-0 right-0 left-0 z-1000" style={{ backgroundColor: '#E0B0FF' }}>
      
      <h2 className="pl-5 text-black">
        <Link href="/" className="text-black flex items-center">
          <Image 
          src="/QUIZ.png" 
          alt="QuizTayo"
          width={100}
          height={100}
          />
        </Link>
      </h2> 
      <nav className="flex gap-5 py-[30px]" style={{ paddingRight: '20px' }}>
        <li className="list-none text-lg transition-all duration-300 relative ">
          <Link 
            href="/" 
            className={`font-semibold pb-1.5 border-b-[3px] border-transparent transition-[color,border-color] duration-200 ${pathname === '/' ? 'border-b-secondary' : ''}`}
            style={pathname === '/' ? { color: '#4B0082' } : {}}
          >
            Home
          </Link>
        </li>
        <li className="list-none text-lg transition-all duration-300 relative">
          <Link 
            href="/quiz" 
            className={`font-semibold pb-1.5 border-b-[3px] border-transparent transition-[color,border-color] duration-200 ${pathname === '/quiz' ? 'border-b-secondary' : ''}`}
            style={pathname === '/quiz' ? { color: '#4B0082' } : {}}
          >
            Quiz
          </Link>
        </li>
        <li className="list-none text-lg transition-all duration-300 relative">
          <Link 
            href="/topics" 
            className={`font-semibold pb-1.5 border-b-[3px] border-transparent transition-[color,border-color] duration-200 ${pathname === '/topics' ? 'border-b-secondary' : ''}`}
            style={pathname === '/topics' ? { color: '#4B0082' } : {}}
          >
            Topics
          </Link>
        </li>
        {isAuthenticated && (
          <>
            <li className="list-none text-lg transition-all duration-300 relative group" style={{ paddingRight: '30px' }}>
              <span className="cursor-pointer text-black flex items-center">
                <span className="user-initial flex items-center justify-center h-8 w-8 rounded-full bg-gray-300 text-black font-bold overflow-hidden">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    user?.username ? user.username.charAt(0).toUpperCase() : <i className="fa-solid fa-user"></i>
                  )}
                </span>
              </span>
              <ul className="hidden group-hover:block absolute top-full p-2.5 border border-[#ccc] min-w-[150px] mt-0 z-1000" style={{ backgroundColor: '#4B0082', right: '0' }}>
                <li className="text-center last:mb-0">
                  <Link 
                    href="/dashboard" 
                    className="block py-1.5 hover:text-[#ffe4ff]"
                    style={pathname === '/dashboard' ? { color: '#ffe4ff', fontWeight: 'bold' } : { color: 'white' }}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="text-center last:mb-0">
                  <Link 
                    href="/profile" 
                    className="block py-1.5 hover:text-[#ffe4ff]"
                    style={pathname === '/profile' ? { color: '#ffe4ff', fontWeight: 'bold' } : { color: 'white' }}
                  >
                    View Profile
                  </Link>
                </li>
                <li className="mb-3 text-center last:mb-0">
                  <button 
                    onClick={logout} 
                    className="bg-transparent border-none cursor-pointer p-0 w-full hover:opacity-80"
                    style={{ color: 'white' }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </>
        )}
      </nav>
    </header>
  );
}
