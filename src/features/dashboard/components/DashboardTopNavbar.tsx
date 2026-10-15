"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Bell,
  User,
  DollarSign,
  LogOut,
  Award,
} from "lucide-react";
import { useUIStore } from "@/stores/use-ui-store";
import { translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

        {/* User Profile Avatar with Dropdown */}
        <div className="relative" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-8 h-8 rounded-full bg-[#c29547] dark:bg-[#d4a759] text-white dark:text-[#171513] flex items-center justify-center text-xs font-bold shadow-sm transition-transform active:scale-95 ring-2 ring-[#eeddbb] dark:ring-[#5a4321] hover:ring-[#c29547] dark:hover:ring-[#d4a759] ring-offset-2 ring-offset-white dark:ring-offset-[#171513] ms-0.5 cursor-pointer"
            title={t.profile}
            aria-expanded={isProfileOpen}
          >
            EP
          </button>

          {/* Profile Dropdown Card */}
          {isProfileOpen && (
            <div
              className={cn(
                "absolute top-full mt-3 w-[290px] rounded-3xl bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150",
                "end-0 sm:-end-1"
              )}
            >
              {/* Pointer notch */}
              <div className="absolute -top-1.5 end-3.5 w-3 h-3 bg-[#faf5eb] dark:bg-[#201c17] rotate-45 border-t border-s border-[#eeddbb] dark:border-[#332a1e]" />

              {/* Card Header with Warm Gold Tint */}
              <div className="bg-[#faf5eb] dark:bg-[#201c17] p-4 rounded-t-3xl border-b border-[#eeddbb] dark:border-[#332a1e] flex items-center justify-between gap-3 relative z-10">
                {/* User Info (Text) */}
                <div className="flex flex-col text-start">
                  <div className="flex items-center gap-1.5">
                    {/* Pro Badge */}
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#fff7e6] dark:bg-[#2e2315] border border-[#eeddbb] dark:border-[#744210] text-[#c29547] dark:text-[#d4a759] text-[10px] font-extrabold tracking-wide">
                      <span>{t.userPlan}</span>
                      <Award className="w-2.5 h-2.5 text-[#c29547] dark:text-[#d4a759]" />
                    </span>
                    <span className="text-sm font-bold text-[#2c2825] dark:text-[#f5f4f0]">
                      {t.userName}
                    </span>
                  </div>
                  <span className="text-xs text-[#8c8279] dark:text-[#9e968a] font-normal truncate mt-1">
                    {t.userEmail}
                  </span>
                </div>

                {/* EP Avatar with Gold Ring and Online Status */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#c29547] dark:bg-[#d4a759] text-white dark:text-[#171513] flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-[#eeddbb]/80 dark:ring-[#5a4321]/60 ring-offset-2 ring-offset-white dark:ring-offset-[#201c17]">
                    EP
                  </div>
                  {/* Online indicator */}
                  <span className="absolute -bottom-0.5 -end-0.5 w-4 h-4 rounded-full bg-[#c29547] dark:bg-[#d4a759] border-2 border-white dark:border-[#201c17] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-[#171513]" />
                  </span>
                </div>
              </div>

              {/* Menu Items List */}
              <div className="p-3 space-y-1 bg-white dark:bg-[#1a1714]">
                {/* Profile Link */}
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#faf8f4] dark:hover:bg-[#221f1b] transition-colors group cursor-pointer text-start"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#faf5eb] dark:bg-[#2b2419] border border-[#eeddbb]/70 dark:border-[#4d3a1f] flex items-center justify-center text-[#c29547] dark:text-[#d4a759] shrink-0 transition-transform group-hover:scale-105">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#2c2825] dark:text-[#e4ded5] group-hover:text-[#c29547] dark:group-hover:text-[#d4a759] transition-colors">
                      {t.menuProfile}
                    </span>
                  </div>
                  {direction === "rtl" ? (
                    <ChevronLeft className="w-3.5 h-3.5 text-[#a89e90] dark:text-[#787166] group-hover:text-[#c29547] dark:group-hover:text-[#d4a759] transition-colors" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#a89e90] dark:text-[#787166] group-hover:text-[#c29547] dark:group-hover:text-[#d4a759] transition-colors" />
                  )}
                </button>

                {/* Subscription Link */}
                <Link
                  href="/subscriptions"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#faf8f4] dark:hover:bg-[#221f1b] transition-colors group cursor-pointer text-start"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#faf5eb] dark:bg-[#2b2419] border border-[#eeddbb]/70 dark:border-[#4d3a1f] flex items-center justify-center text-[#c29547] dark:text-[#d4a759] shrink-0 transition-transform group-hover:scale-105">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#2c2825] dark:text-[#e4ded5] group-hover:text-[#c29547] dark:group-hover:text-[#d4a759] transition-colors">
                      {t.menuSubscription}
                    </span>
                  </div>
                  {direction === "rtl" ? (
                    <ChevronLeft className="w-3.5 h-3.5 text-[#a89e90] dark:text-[#787166] group-hover:text-[#c29547] dark:group-hover:text-[#d4a759] transition-colors" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#a89e90] dark:text-[#787166] group-hover:text-[#c29547] dark:group-hover:text-[#d4a759] transition-colors" />
                  )}
                </Link>

                {/* Logout Link */}
                <Link
                  href="/login"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#fff5f5] dark:hover:bg-[#2e1919] transition-colors group cursor-pointer text-start mt-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#fdeeee] dark:bg-[#341b1b] border border-[#fbd0d0] dark:border-[#522525] flex items-center justify-center text-[#d9383a] dark:text-[#f87171] shrink-0 transition-transform group-hover:scale-105">
                      <LogOut className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#d9383a] dark:text-[#f87171] transition-colors">
                      {t.menuLogout}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
