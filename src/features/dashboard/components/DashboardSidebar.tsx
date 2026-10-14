"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  CreditCard,
  Banknote,
  Users,
  Bot,
  Bell,
  Headphones,
  Settings,
  Mail,
  Sliders,
  Puzzle,
  Boxes,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

function DashboardGaugeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 12l4-4" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}

interface SubNavItem {
  id: string;
  label: string;
  href: string;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: SubNavItem[];
}

export function DashboardSidebar() {
  const [activeItem, setActiveItem] = useState("manage-client");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: "لوحة التحكم",
      href: "/",
      icon: DashboardGaugeIcon,
    },
    {
      id: "manage-client",
      label: "إدارة العملاء",
      href: "#",
      icon: User,
    },
    {
      id: "subscription",
      label: "الاشتراكات",
      href: "#",
      icon: CreditCard,
    },
    {
      id: "price-plans",
      label: "خطط الأسعار",
      href: "#",
      icon: Banknote,
    },
    {
      id: "staff",
      label: "فريق العمل",
      href: "#",
      icon: Users,
      subItems: [
        { id: "staff-list", label: "قائمة الموظفين", href: "#" },
        { id: "staff-roles", label: "الأدوار والصلاحيات", href: "#" },
      ],
    },
    {
      id: "ai-assistant",
      label: "المساعد الذكي",
      href: "#",
      icon: Bot,
      subItems: [
        { id: "ai-models", label: "نماذج الروبوت", href: "#" },
        { id: "ai-kb", label: "قاعدة المعرفة", href: "#" },
      ],
    },
    {
      id: "payment-gateway",
      label: "بوابات الدفع",
      href: "#",
      icon: CreditCard,
    },
    {
      id: "notification",
      label: "الإشعارات",
      href: "#",
      icon: Bell,
    },
    {
      id: "support",
      label: "الدعم الفني",
      href: "#",
      icon: Headphones,
      subItems: [
        { id: "support-all", label: "جميع التذاكر", href: "#" },
        { id: "support-pending", label: "تذاكر قيد الانتظار", href: "#" },
      ],
    },
    {
      id: "website-settings",
      label: "إعدادات الموقع",
      href: "#",
      icon: Settings,
      subItems: [
        { id: "web-general", label: "الإعدادات العامة", href: "#" },
        { id: "web-seo", label: "الهوية ومحركات البحث", href: "#" },
      ],
    },
    {
      id: "email-settings",
      label: "إعدادات البريد",
      href: "#",
      icon: Mail,
      subItems: [
        { id: "email-smtp", label: "تهيئة SMTP", href: "#" },
        { id: "email-templates", label: "قوالب الرسائل", href: "#" },
      ],
    },
    {
      id: "system-settings",
      label: "إعدادات النظام",
      href: "#",
      icon: Sliders,
      subItems: [
        { id: "sys-general", label: "الإعدادات العامة", href: "#" },
        { id: "sys-backups", label: "النسخ الاحتياطي", href: "#" },
      ],
    },
    {
      id: "addon",
      label: "الإضافات",
      href: "#",
      icon: Puzzle,
      subItems: [
        { id: "addon-installed", label: "الإضافات المثبتة", href: "#" },
        { id: "addon-market", label: "متجر الإضافات", href: "#" },
      ],
    },
    {
      id: "utility",
      label: "الأدوات المساعدة",
      href: "#",
      icon: Boxes,
      subItems: [
        { id: "util-logs", label: "سجل النشاطات", href: "#" },
        { id: "util-cache", label: "ذاكرة التخزين المؤقت", href: "#" },
      ],
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen shrink-0 flex flex-col border-e border-[#ded5c6] bg-white transition-all duration-300 z-30 select-none shadow-[-3px_0_15px_rgba(60,50,40,0.03)]",
        isCollapsed ? "w-20" : "w-[260px] xl:w-[275px]"
      )}
    >
      {/* Top Header with Brand Logo & Collapse Toggle: Icon -> Name -> Arrow */}
      <div className="flex items-center justify-between px-4 pt-5 pb-4 border-b border-[#ded5c6] shrink-0">
        {!isCollapsed ? (
          <>
            {/* 1. Icon & 2. Name */}
            <div className="flex items-center gap-3">
              {/* Geometric Gold Logo Icon with 'G' */}
              <div className="w-9 h-9 rounded-xl bg-[#c29547] flex items-center justify-center text-white font-bold text-lg shadow-xs shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-white"
                >
                  <path d="M19 7V4H5v16h14v-8h-7" />
                </svg>
              </div>

              {/* Name */}
              <div className="text-start">
                <h1 className="text-lg font-extrabold text-[#c29547] leading-tight tracking-tight">
                  الجودي
                </h1>
                <span className="text-[10px] font-medium text-[#8c8279] tracking-wide block">
                  للتسويق الرقمي
                </span>
              </div>
            </div>

            {/* 3. Arrow Collapse Toggle Button (Circle with chevron) */}
            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              className="w-7 h-7 rounded-full border border-stone-800 hover:border-[#c29547] hover:bg-[#faf7f0] flex items-center justify-center text-stone-600 hover:text-[#c29547] transition-all shrink-0"
              title="طي القائمة"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <div className="w-full flex flex-col items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#c29547] flex items-center justify-center text-white font-bold text-lg shadow-xs">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-white"
              >
                <path d="M19 7V4H5v16h14v-8h-7" />
              </svg>
            </div>
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              className="w-7 h-7 rounded-full border border-stone-800 hover:border-[#c29547] hover:bg-[#faf7f0] flex items-center justify-center text-stone-600 hover:text-[#c29547] transition-all"
              title="توسيع القائمة"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Search Input Bar */}
      {!isCollapsed && (
        <div className="px-4 pt-4 pb-2 shrink-0">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="...ابحث في القائمة"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#faf8f4] text-[#2c2825] placeholder-[#b2a899] text-xs font-medium rounded-full py-2.5 ps-9 pe-4 border border-[#ded5c6] focus:border-[#c29547] focus:bg-white focus:outline-none shadow-2xs transition-all text-start"
            />
            <Search className="w-4 h-4 text-[#aba293] absolute start-3 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Navigation Items List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          const hasDropdown = Boolean(item.subItems && item.subItems.length > 0);
          const isOpen = Boolean(openDropdowns[item.id]);

          return (
            <div key={item.id} className="space-y-0.5">
              <Link
                href={item.href}
                onClick={() => {
                  setActiveItem(item.id);
                  if (hasDropdown) {
                    setOpenDropdowns((prev) => ({
                      ...prev,
                      [item.id]: !prev[item.id],
                    }));
                  }
                }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative",
                  isActive
                    ? "bg-[#faf5eb] text-[#b8863b] font-semibold border border-[#eeddbb]/60 shadow-[0_1px_2px_rgba(194,149,71,0.06)]"
                    : "text-[#4a443e] hover:text-[#b8863b] hover:bg-[#faf8f4]"
                )}
                title={item.label}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-colors",
                    isActive
                      ? "text-[#c29547]"
                      : "text-[#877e72] group-hover:text-[#c29547]"
                  )}
                />

                {!isCollapsed && (
                  <span className="flex-1 text-start font-medium tracking-tight">
                    {item.label}
                  </span>
                )}

                {!isCollapsed && hasDropdown && (
                  <button
                    type="button"
                    onClick={(e) => toggleDropdown(item.id, e)}
                    className="p-1 rounded text-[#a89e90] hover:text-[#b8863b] transition-colors"
                  >
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        isOpen && "rotate-180 text-[#b8863b]"
                      )}
                    />
                  </button>
                )}
              </Link>

              {/* Sub-menu Dropdown List */}
              {!isCollapsed && hasDropdown && isOpen && item.subItems && (
                <div className="ps-8 pe-2 py-1 space-y-1">
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.id}
                      href={sub.href}
                      onClick={() => setActiveItem(sub.id)}
                      className={cn(
                        "block px-2.5 py-1.5 rounded-lg text-[11px] transition-colors text-start",
                        activeItem === sub.id
                          ? "bg-[#faf5eb] text-[#b8863b] font-semibold"
                          : "text-[#6c645b] hover:text-[#b8863b] hover:bg-[#faf8f4]"
                      )}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Footer Info */}
      {!isCollapsed && (
        <div className="px-5 py-3.5 border-t border-[#ded5c6] text-[10px] text-[#aaa193] flex items-center justify-between shrink-0">
          <span>الجودي للتسويق الرقمي</span>
          <span className="font-mono text-[#b3aaa0]">v1.5</span>
        </div>
      )}
    </aside>
  );
}
