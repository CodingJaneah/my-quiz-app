"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface MenuItem {
    label: string;
    href: string;
    icon: string;
    subItems?: { label: string; href: string }[];
}

export default function DashboardSidebar() {
    const pathname = usePathname();
    const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

    const menuItems: MenuItem[] = [
        { label: "Dashboard", href: "/dashboard", icon: "📊" },
        { label: "Profile", href: "/profile", icon: "👤" },
        { label: "Quizzes", href: "/quiz", icon: "📝", subItems: [
            { label: "HTML Quizzes", href: "/quiz/html_quizzes" },
            { label: "CSS Quizzes", href: "/quiz/css_quizzes" },
            { label: "JavaScript Quizzes", href: "/quiz/js_quizzes" }
        ]},
        { label: "Lessons", href: "/topics", icon: "📚", subItems: [
            { label: "HTML Lessons", href: "/topics/html_lessons" },
            { label: "CSS Lessons", href: "/topics/css_lessons" },
            { label: "JavaScript Lessons", href: "/topics/js_lessons" }
        ]}
    ];

    const toggleMenu = (menuLabel: string) => {
        setExpandedMenus(prev => 
            prev.includes(menuLabel) 
                ? prev.filter(item => item !== menuLabel)
                : [...prev, menuLabel]
        );
    };

    const isActive = (href: string): boolean => pathname === href;

    const hasActiveSubItem = (subItems?: { label: string; href: string }[]): boolean => {
        if (!subItems) return false;
        return subItems.some(item => pathname.startsWith(item.href));
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-[100px] pt-6 pb-20 overflow-y-auto">
            <nav className="px-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.label}>
                            {item.subItems ? (
                                <div>
                                    <button
                                        onClick={() => toggleMenu(item.label.toLowerCase())}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                                            hasActiveSubItem(item.subItems)
                                                ? 'bg-(--primary-color) text-(--secondary-color) font-semibold'
                                                : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <span className="text-xl">{item.icon}</span>
                                            <span>{item.label}</span>
                                        </span>
                                        <span className={`transition-transform ${
                                            expandedMenus.includes(item.label.toLowerCase()) ? 'rotate-180' : ''
                                        }`}>
                                            ▼
                                        </span>
                                    </button>
                                    {expandedMenus.includes(item.label.toLowerCase()) && (
                                        <ul className="mt-1 ml-8 space-y-1">
                                            {item.subItems.map((subItem) => (
                                                <li key={subItem.href}>
                                                    <Link
                                                        href={subItem.href}
                                                        className={`block px-4 py-2 rounded-lg transition-all text-sm ${
                                                            isActive(subItem.href) || pathname.startsWith(subItem.href)
                                                                ? 'bg-(--secondary-color) text-white font-semibold'
                                                                : 'hover:bg-gray-100 text-gray-600'
                                                        }`}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                        isActive(item.href)
                                            ? 'bg-(--secondary-color) text-white font-semibold'
                                            : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="px-4 mt-8">
                <div className="bg-(--primary-color) rounded-lg p-4">
                    <h4 className="font-semibold text-(--secondary-color) mb-2">Need Help?</h4>
                    <p className="text-sm text-gray-600 mb-3">Check out our learning resources to improve your skills.</p>
                    <Link 
                        href="/topics" 
                        className="block text-center bg-(--secondary-color) text-white py-2 px-4 rounded-lg text-sm hover:opacity-90 transition-opacity"
                    >
                        Start Learning
                    </Link>
                </div>
            </div>
        </aside>
    );
}
