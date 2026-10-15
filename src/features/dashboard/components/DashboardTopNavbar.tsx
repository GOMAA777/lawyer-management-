"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Bell,
} from "lucide-react";
import { useUIStore } from "@/stores/use-ui-store";
import { translations } from "@/lib/i18n";

export function DashboardTopNavbar() {
  const { language, toggleLanguage, theme, toggleTheme, direction, toggleDirection } =
    useUIStore();
  const t = translations[language].topbar;
  const navT = translations[language].nav;
  const pathname = usePathname();
  const isDark = theme === "dark";

  const currentBreadcrumb =
    pathname === "/subscriptions"
      ? navT.subscriptions
      : pathname === "/integrations"
      ? navT.addonsIntegrations
      : pathname === "/accounts"
      ? navT.accounts
      : pathname === "/menus"
      ? navT.menus
      : pathname === "/permissions"
      ? navT.permissions
      : t.dashboard;

  return (
    <header className="h-14 shrink-0 border-b border-[#ded5c6] dark:border-[#2f2a24] bg-white/90 dark:bg-[#171513]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20 shadow-[0_2px_12px_rgba(80,65,45,0.03)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] transition-colors duration-200">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb navigation" className="flex items-center gap-2 text-xs">
        <Link
          href="/"
          className="p-1.5 rounded-lg text-[#8f8679] dark:text-[#a8a195] hover:text-[#c29547] dark:hover:text-[#d4a759] hover:bg-[#faf7f0] dark:hover:bg-[#201d1a] transition-colors cursor-pointer"
          title={t.home}
        >
          <Home className="w-3.5 h-3.5" />
        </Link>
        {direction === "rtl" ? (
          <ChevronLeft className="w-3 h-3 text-[#c0b8ac] dark:text-[#524b43]" />
        ) : (
          <ChevronRight className="w-3 h-3 text-[#c0b8ac] dark:text-[#524b43]" />
        )}
        <span className="text-[#3a3530] dark:text-[#f5f4f0] font-semibold text-xs">
          {currentBreadcrumb}
        </span>
      </nav>

      {/* Actions: Language, RTL/LTR Direction, Theme, Notifications & Profile */}
      <div className="flex items-center gap-2.5">
        {/* Language Switcher Circle Toggle (AR / EN) */}
        <div className="relative group">
          <button
            type="button"
            onClick={toggleLanguage}
            className="w-8 h-8 rounded-full bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] hover:border-[#c29547] dark:hover:border-[#d4a759] flex items-center justify-center text-[#c29547] dark:text-[#d4a759] hover:bg-[#faf5eb] dark:hover:bg-[#2b2419] transition-all shadow-2xs active:scale-95 cursor-pointer"
            aria-label={language === "ar" ? "التبديل إلى English (EN)" : "Switch to العربية (AR)"}
          >
            <span className="text-[11px] font-extrabold tracking-wider uppercase select-none transition-transform group-hover:scale-105">
              {language === "ar" ? "AR" : "EN"}
            </span>
          </button>

          {/* Floating Tooltip */}
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg bg-[#1f242d] dark:bg-[#252b36] text-white text-[11px] font-semibold whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
            {language === "ar" ? "التبديل إلى English (EN)" : "Switch to العربية (AR)"}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1f242d] dark:bg-[#252b36] rotate-45" />
          </div>
        </div>

        {/* RTL / LTR Direction Toggle Button */}
        <div className="relative group">
          <button
            type="button"
            onClick={toggleDirection}
            className="w-8 h-8 rounded-full bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] hover:border-[#c29547] dark:hover:border-[#d4a759] flex items-center justify-center text-[#c29547] dark:text-[#d4a759] hover:bg-[#faf5eb] dark:hover:bg-[#2b2419] transition-all shadow-2xs active:scale-95 cursor-pointer"
            aria-label={direction === "rtl" ? "تبديل لليسار (LTR)" : "تبديل لليمين (RTL)"}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-[#c29547] dark:text-[#d4a759]"
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
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-[#1f242d] dark:bg-[#252b36] text-white text-[11px] font-semibold whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
            {direction === "rtl" ? "تبديل لليسار (LTR)" : "تبديل لليمين (RTL)"}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1f242d] dark:bg-[#252b36] rotate-45" />
          </div>
        </div>

        {/* Theme Toggle Button */}
        <div className="relative group">
          <button
            type="button"
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] flex items-center justify-center text-[#554e44] dark:text-[#c4bcb1] hover:text-[#b8863b] dark:hover:text-[#d4a759] hover:bg-[#faf7f0] dark:hover:bg-[#282420] transition-all shadow-2xs active:scale-95 cursor-pointer"
            aria-label={t.themeToggle}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#eab308]" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg bg-[#1f242d] dark:bg-[#252b36] text-white text-[11px] font-semibold whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
            {t.themeToggle}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1f242d] dark:bg-[#252b36] rotate-45" />
          </div>
        </div>

        {/* Notification / Alert */}
        <div className="relative group">
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] flex items-center justify-center text-[#7c7366] dark:text-[#a8a195] hover:text-[#b8863b] dark:hover:text-[#d4a759] hover:bg-[#faf7f0] dark:hover:bg-[#201d1a] transition-colors relative shadow-2xs cursor-pointer"
            aria-label={t.notifications}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 end-1 w-1.5 h-1.5 bg-[#c29547] rounded-full" />
          </button>
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg bg-[#1f242d] dark:bg-[#252b36] text-white text-[11px] font-semibold whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
            {t.notifications}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1f242d] dark:bg-[#252b36] rotate-45" />
          </div>
        </div>
      </div>
    </header>
  );
}
