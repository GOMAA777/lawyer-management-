"use client";

import React, { useState } from "react";
import {
  Home,
  ChevronLeft,
  Moon,
  Sun,
  Globe,
  Bell,
} from "lucide-react";

export function DashboardTopNavbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  return (
    <header className="h-14 border-b border-[#ded5c6] bg-white/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20 shadow-[0_2px_12px_rgba(80,65,45,0.03)]">
      {/* Right Side (RTL): Breadcrumbs */}
      <nav aria-label="مسار التنقل" className="flex items-center gap-2 text-xs">
        <span className="p-1.5 rounded-lg text-[#8f8679] hover:text-[#c29547] hover:bg-[#faf7f0] transition-colors cursor-pointer">
          <Home className="w-3.5 h-3.5" />
        </span>
        <ChevronLeft className="w-3 h-3 text-[#c0b8ac]" />
        <span className="text-[#3a3530] font-semibold text-xs">
          لوحة التحكم
        </span>
      </nav>

      {/* Left Side (RTL): Actions, Language & Profile Avatar */}
      <div className="flex items-center gap-2.5">
        {/* Language Switcher */}
        <button
          type="button"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#4a443e] hover:bg-[#faf7f0] hover:text-[#b8863b] transition-colors border border-[#ded5c6] shadow-2xs hover:border-[#c29547]"
        >
          <Globe className="w-3.5 h-3.5 text-[#a89e90]" />
          <span>العربية</span>
        </button>

        {/* Notification / Alert */}
        <button
          type="button"
          className="p-1.5 rounded-lg text-[#7c7366] hover:text-[#b8863b] hover:bg-[#faf7f0] transition-colors relative"
          title="الإشعارات"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 end-1 w-1.5 h-1.5 bg-[#c29547] rounded-full" />
        </button>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleDarkMode}
          className="p-1.5 rounded-lg text-[#7c7366] hover:text-[#b8863b] hover:bg-[#faf7f0] transition-colors"
          title="تغيير المظهر"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-[#eab308]" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>

        {/* User Profile Avatar with Initials "ج" */}
        <button
          type="button"
          className="w-8 h-8 rounded-full bg-[#1c1917] hover:bg-[#2b2724] text-white flex items-center justify-center text-xs font-bold shadow-sm transition-transform active:scale-95 ms-1"
          title="حساب الجودي"
        >
          ج
        </button>
      </div>
    </header>
  );
}
