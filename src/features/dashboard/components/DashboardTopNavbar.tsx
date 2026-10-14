"use client";

import React from "react";
import {
  Home,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Moon,
  Sun,
  Languages,
  Bell,
} from "lucide-react";
import { useUIStore } from "@/stores/use-ui-store";
import { translations } from "@/lib/i18n";

export function DashboardTopNavbar() {
  const { language, toggleLanguage, theme, toggleTheme, direction, toggleDirection } =
    useUIStore();
  const t = translations[language].topbar;
  const isDark = theme === "dark";

  return (
    <header className="h-14 shrink-0 border-b border-[#ded5c6] dark:border-[#2f2a24] bg-white/90 dark:bg-[#171513]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20 shadow-[0_2px_12px_rgba(80,65,45,0.03)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] transition-colors duration-200">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb navigation" className="flex items-center gap-2 text-xs">
        <span
          className="p-1.5 rounded-lg text-[#8f8679] dark:text-[#a8a195] hover:text-[#c29547] dark:hover:text-[#d4a759] hover:bg-[#faf7f0] dark:hover:bg-[#201d1a] transition-colors cursor-pointer"
          title={t.home}
        >
          <Home className="w-3.5 h-3.5" />
        </span>
        {direction === "rtl" ? (
          <ChevronLeft className="w-3 h-3 text-[#c0b8ac] dark:text-[#524b43]" />
        ) : (
          <ChevronRight className="w-3 h-3 text-[#c0b8ac] dark:text-[#524b43]" />
        )}
        <span className="text-[#3a3530] dark:text-[#f5f4f0] font-semibold text-xs">
          {t.dashboard}
        </span>
      </nav>

      {/* Actions: Language, RTL/LTR Direction, Theme, Notifications & Profile */}
      <div className="flex items-center gap-2.5">
        {/* Language Switcher Pill */}
        <button
          type="button"
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#4a443e] dark:text-[#e4ded5] bg-white dark:bg-[#201d1a] hover:bg-[#faf7f0] dark:hover:bg-[#282420] transition-all border border-[#ded5c6] dark:border-[#383229] shadow-2xs hover:border-[#00a884]"
          title={t.languageToggle}
        >
          <ChevronDown className="w-3.5 h-3.5 text-[#8f8679] dark:text-[#a8a195]" />
          <span>{language === "ar" ? "Lang Arabic" : "Lang English"}</span>
          <Languages className="w-4 h-4 text-[#00a884]" />
        </button>

        {/* RTL / LTR Direction Toggle Button */}
        <div className="relative group">
          <button
            type="button"
            onClick={toggleDirection}
            className="w-8 h-8 rounded-full bg-white dark:bg-[#1a231f] border border-[#00a884] flex items-center justify-center text-[#00a884] hover:bg-[#e6f7f2] dark:hover:bg-[#122820] transition-all shadow-2xs active:scale-95"
            aria-label={direction === "rtl" ? "تبديل لليسار (LTR)" : "تبديل لليمين (RTL)"}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-[#00a884]"
            >
              {/* Pilcrow symbol */}
              <path d="M14 4v10" />
              <path d="M18 4v10" />
              <path d="M14 4H9a4 4 0 0 0 0 8h5" fill="currentColor" fillOpacity="0.15" />
              {/* Direction arrow */}
              {direction === "rtl" ? (
                <>
                  <path d="M6 18h12" />
                  <path d="m14 15 4 3-4 3" />
                </>
              ) : (
                <>
                  <path d="M18 18H6" />
                  <path d="m10 15-4 3 4 3" />
                </>
              )}
            </svg>
          </button>

          {/* Floating Tooltip */}
          <div className="absolute top-full mt-2 start-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-[#1f242d] dark:bg-[#252b36] text-white text-[11px] font-semibold whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
            {direction === "rtl" ? "تبديل لليسار (LTR)" : "تبديل لليمين (RTL)"}
            <div className="absolute -top-1 start-1/2 -translate-x-1/2 w-2 h-2 bg-[#1f242d] dark:bg-[#252b36] rotate-45" />
          </div>
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="w-8 h-8 rounded-full bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] flex items-center justify-center text-[#554e44] dark:text-[#c4bcb1] hover:text-[#b8863b] dark:hover:text-[#d4a759] hover:bg-[#faf7f0] dark:hover:bg-[#282420] transition-all shadow-2xs active:scale-95"
          title={t.themeToggle}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-[#eab308]" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>

        {/* Notification / Alert */}
        <button
          type="button"
          className="w-8 h-8 rounded-full bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] flex items-center justify-center text-[#7c7366] dark:text-[#a8a195] hover:text-[#b8863b] dark:hover:text-[#d4a759] hover:bg-[#faf7f0] dark:hover:bg-[#201d1a] transition-colors relative shadow-2xs"
          title={t.notifications}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 end-1 w-1.5 h-1.5 bg-[#c29547] rounded-full" />
        </button>

        {/* User Profile Avatar EP */}
        <button
          type="button"
          className="w-8 h-8 rounded-full bg-[#00a884] text-white flex items-center justify-center text-xs font-bold shadow-sm transition-transform active:scale-95 ring-2 ring-purple-300 dark:ring-purple-400 ring-offset-2 ring-offset-white dark:ring-offset-[#171513] ms-0.5"
          title={t.profile}
        >
          EP
        </button>
      </div>
    </header>
  );
}
