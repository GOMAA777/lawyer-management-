"use client";

import React from "react";
import {
  Home,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Globe,
  Bell,
} from "lucide-react";
import { useUIStore } from "@/stores/use-ui-store";
import { translations } from "@/lib/i18n";

export function DashboardTopNavbar() {
  const { language, toggleLanguage, theme, toggleTheme } = useUIStore();
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
        {language === "ar" ? (
          <ChevronLeft className="w-3 h-3 text-[#c0b8ac] dark:text-[#524b43]" />
        ) : (
          <ChevronRight className="w-3 h-3 text-[#c0b8ac] dark:text-[#524b43]" />
        )}
        <span className="text-[#3a3530] dark:text-[#f5f4f0] font-semibold text-xs">
          {t.dashboard}
        </span>
      </nav>

      {/* Actions: Language, Notifications, Theme & Profile */}
      <div className="flex items-center gap-2.5">
        {/* Language Switcher */}
        <button
          type="button"
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#4a443e] dark:text-[#e4ded5] bg-white dark:bg-[#201d1a] hover:bg-[#faf7f0] dark:hover:bg-[#282420] hover:text-[#b8863b] dark:hover:text-[#d4a759] transition-all border border-[#ded5c6] dark:border-[#383229] shadow-2xs hover:border-[#c29547]"
          title={t.languageToggle}
        >
          <Globe className="w-3.5 h-3.5 text-[#a89e90] dark:text-[#d4a759]" />
          <span>{t.switchLanguageLabel}</span>
        </button>

        {/* Notification / Alert */}
        <button
          type="button"
          className="p-1.5 rounded-lg text-[#7c7366] dark:text-[#a8a195] hover:text-[#b8863b] dark:hover:text-[#d4a759] hover:bg-[#faf7f0] dark:hover:bg-[#201d1a] transition-colors relative"
          title={t.notifications}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 end-1 w-1.5 h-1.5 bg-[#c29547] rounded-full" />
        </button>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-1.5 rounded-lg text-[#7c7366] dark:text-[#a8a195] hover:text-[#b8863b] dark:hover:text-[#d4a759] hover:bg-[#faf7f0] dark:hover:bg-[#201d1a] transition-colors"
          title={t.themeToggle}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-[#eab308]" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>

        {/* User Profile Avatar with Initials "ج" / "J" */}
        <button
          type="button"
          className="w-8 h-8 rounded-full bg-[#1c1917] dark:bg-[#d4a759] hover:bg-[#2b2724] text-white dark:text-[#1c1917] flex items-center justify-center text-xs font-bold shadow-sm transition-transform active:scale-95 ms-1"
          title={t.profile}
        >
          {t.userInitial}
        </button>
      </div>
    </header>
  );
}
