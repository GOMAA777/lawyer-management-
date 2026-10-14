"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { useUIStore } from "@/stores/use-ui-store";
import { translations } from "@/lib/i18n";

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
  const { language, direction } = useUIStore();
  const t = translations[language].nav;
  const brand = translations[language].brand;

  const [activeItem, setActiveItem] = useState("manage-client");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});


  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: t.dashboard,
      href: "/",
      icon: DashboardGaugeIcon,
    },
    {
      id: "manage-client",
      label: t.clientManagement,
      href: "#",
      icon: User,
    },
    {
      id: "subscription",
      label: t.subscriptions,
      href: "#",
      icon: CreditCard,
    },
    {
      id: "price-plans",
      label: t.pricingPlans,
      href: "#",
      icon: Banknote,
    },
    {
      id: "staff",
      label: t.team,
      href: "#",
      icon: Users,
      subItems: [
        { id: "staff-list", label: language === "ar" ? "قائمة الموظفين" : "Staff List", href: "#" },
        { id: "staff-roles", label: language === "ar" ? "الأدوار والصلاحيات" : "Roles & Permissions", href: "#" },
      ],
    },
    {
      id: "ai-assistant",
      label: t.aiAssistant,
      href: "#",
      icon: Bot,
      subItems: [
        { id: "ai-models", label: language === "ar" ? "نماذج الروبوت" : "AI Models", href: "#" },
        { id: "ai-kb", label: language === "ar" ? "قاعدة المعرفة" : "Knowledge Base", href: "#" },
      ],
    },
    {
      id: "payment-gateway",
      label: t.paymentGateways,
      href: "#",
      icon: CreditCard,
    },
    {
      id: "notification",
      label: t.notifications,
      href: "#",
      icon: Bell,
    },
    {
      id: "support",
      label: t.support,
      href: "#",
      icon: Headphones,
      subItems: [
        { id: "support-all", label: language === "ar" ? "جميع التذاكر" : "All Tickets", href: "#" },
        { id: "support-pending", label: language === "ar" ? "تذاكر قيد الانتظار" : "Pending Tickets", href: "#" },
      ],
    },
    {
      id: "website-settings",
      label: t.siteSettings,
      href: "#",
      icon: Settings,
      subItems: [
        { id: "web-general", label: language === "ar" ? "الإعدادات العامة" : "General Settings", href: "#" },
        { id: "web-seo", label: language === "ar" ? "الهوية ومحركات البحث" : "SEO & Identity", href: "#" },
      ],
    },
    {
      id: "email-settings",
      label: t.mailSettings,
      href: "#",
      icon: Mail,
      subItems: [
        { id: "email-smtp", label: language === "ar" ? "تهيئة SMTP" : "SMTP Config", href: "#" },
        { id: "email-templates", label: language === "ar" ? "قوالب الرسائل" : "Email Templates", href: "#" },
      ],
    },
    {
      id: "system-settings",
      label: t.systemSettings,
      href: "#",
      icon: Sliders,
      subItems: [
        { id: "sys-general", label: language === "ar" ? "الإعدادات العامة" : "General Settings", href: "#" },
        { id: "sys-backups", label: language === "ar" ? "النسخ الاحتياطي" : "Backups", href: "#" },
      ],
    },
    {
      id: "addon",
      label: t.plugins,
      href: "#",
      icon: Puzzle,
      subItems: [
        { id: "addon-installed", label: language === "ar" ? "الإضافات المثبتة" : "Installed Add-ons", href: "#" },
        { id: "addon-market", label: language === "ar" ? "متجر الإضافات" : "Add-on Marketplace", href: "#" },
      ],
    },
    {
      id: "utility",
      label: t.utilities,
      href: "#",
      icon: Boxes,
      subItems: [
        { id: "util-logs", label: language === "ar" ? "سجل النشاطات" : "Activity Logs", href: "#" },
        { id: "util-cache", label: language === "ar" ? "ذاكرة التخزين المؤقت" : "Cache Management", href: "#" },
      ],
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen shrink-0 flex flex-col border-e border-[#ded5c6] dark:border-[#2f2a24] bg-white dark:bg-[#171513] transition-all duration-300 z-30 select-none shadow-[-3px_0_15px_rgba(60,50,40,0.03)] dark:shadow-[-3px_0_15px_rgba(0,0,0,0.4)]",
        isCollapsed ? "w-16" : "w-[260px] xl:w-[275px]"
      )}
    >
      {/* Top Header with Brand Logo */}
      <div
        className={cn(
          "flex items-center border-b border-[#ded5c6] dark:border-[#2f2a24] shrink-0 transition-all",
          isCollapsed
            ? "h-16 justify-center px-2"
            : "px-5 py-4 justify-between"
        )}
      >
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            {/* Real Golden Brand Logo */}
            <div className="w-10 h-10 rounded-xl bg-[#faf5eb] dark:bg-[#201c17] border border-[#eeddbb] dark:border-[#382b18] p-1.5 flex items-center justify-center shadow-xs shrink-0 hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt={brand.name}
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            {/* Name */}
            <div className="text-start">
              <h1 className="text-base font-extrabold text-[#c29547] dark:text-[#d4a759] leading-tight tracking-tight">
                {brand.name}
              </h1>
              <span className="text-[10px] font-medium text-[#8c8279] dark:text-[#9e968a] tracking-wide block">
                {brand.tagline}
              </span>
            </div>
          </div>
        ) : (
          <div
            className="w-9 h-9 rounded-xl bg-[#faf5eb] dark:bg-[#201c17] border border-[#eeddbb] dark:border-[#382b18] p-1 flex items-center justify-center shadow-xs mx-auto hover:scale-105 transition-transform"
            title={brand.name}
          >
            <Image
              src="/logo.png"
              alt={brand.name}
              width={32}
              height={32}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        )}
      </div>

      {/* Floating Collapse / Expand Toggle Button on the Outside Border Line */}
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "absolute top-5 z-40 w-7 h-7 rounded-full bg-white dark:bg-[#1a1816] border border-stone-800 dark:border-stone-500 hover:border-[#c29547] dark:hover:border-[#d4a759] flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-[#c29547] dark:hover:text-[#d4a759] shadow-sm hover:shadow-md transition-all hover:scale-105 active:scale-95",
          direction === "rtl"
            ? "left-0 -translate-x-1/2"
            : "right-0 translate-x-1/2"
        )}
        title={isCollapsed ? t.expand : t.collapse}
      >
        {isCollapsed ? (
          direction === "rtl" ? (
            <ChevronLeft className="w-3.5 h-3.5" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5" />
          )
        ) : (
          direction === "rtl" ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )
        )}
      </button>

      {/* Search Input Bar */}
      {!isCollapsed && (
        <div className="px-4 pt-4 pb-2 shrink-0">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#faf8f4] dark:bg-[#201d1a] text-[#2c2825] dark:text-[#f5f4f0] placeholder-[#b2a899] dark:placeholder-[#6e675c] text-xs font-medium rounded-full py-2.5 ps-9 pe-4 border border-[#ded5c6] dark:border-[#2f2a24] focus:border-[#c29547] dark:focus:border-[#d4a759] focus:bg-white dark:focus:bg-[#25221e] focus:outline-none shadow-2xs transition-all text-start"
            />
            <Search className="w-4 h-4 text-[#aba293] dark:text-[#787166] absolute start-3 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Navigation Items List */}
      <div
        className={cn(
          "flex-1 overflow-y-auto scrollbar-thin",
          isCollapsed ? "px-2 py-3 space-y-2" : "px-3 py-2 space-y-1"
        )}
      >
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isChildActive = Boolean(item.subItems?.some((sub) => sub.id === activeItem));
          const isActive = activeItem === item.id || isChildActive;
          const hasDropdown = Boolean(item.subItems && item.subItems.length > 0);
          const isOpen = Boolean(openDropdowns[item.id] !== undefined ? openDropdowns[item.id] : isChildActive);

          return (
            <div
              key={item.id}
              className={cn(
                "relative group flex flex-col transition-all",
                isCollapsed ? "items-center justify-center" : "w-full"
              )}
            >
              <Link
                href={item.href}
                onClick={() => {
                  setActiveItem(item.id);
                  if (hasDropdown && !isCollapsed) {
                    setOpenDropdowns((prev) => ({
                      ...prev,
                      [item.id]: !prev[item.id],
                    }));
                  }
                }}
                className={cn(
                  "flex items-center rounded-xl text-xs font-medium transition-all relative",
                  isCollapsed
                    ? "w-10 h-10 justify-center p-0 mx-auto"
                    : "w-full gap-3 px-3 py-2.5",
                  isActive
                    ? "bg-[#faf5eb] dark:bg-[#2b2419] text-[#b8863b] dark:text-[#d4a759] font-semibold border border-[#eeddbb] dark:border-[#5a4321] shadow-[0_2px_8px_-1px_rgba(194,149,71,0.15)]"
                    : "text-[#524b43] dark:text-[#c4bcb1] hover:text-[#b8863b] dark:hover:text-[#d4a759] hover:bg-[#faf8f4] dark:hover:bg-[#201d1a] border border-transparent"
                )}
                title={item.label}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-colors",
                    isActive
                      ? "text-[#c29547] dark:text-[#d4a759]"
                      : "text-[#877e72] dark:text-[#8c8579] group-hover:text-[#c29547] dark:group-hover:text-[#d4a759]"
                  )}
                />

                {!isCollapsed && (
                  <span className="flex-1 text-start font-medium tracking-tight">
                    {item.label}
                  </span>
                )}

                {!isCollapsed && hasDropdown && (
                  <span className="p-1 rounded text-[#a89e90] dark:text-[#787166] group-hover:text-[#b8863b] dark:group-hover:text-[#d4a759] transition-colors">
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        isOpen && "rotate-180 text-[#b8863b] dark:text-[#d4a759]"
                      )}
                    />
                  </span>
                )}
              </Link>

              {/* Floating Tooltip when collapsed */}
              {isCollapsed && (
                <div className="absolute end-full top-1/2 -translate-y-1/2 me-2 px-2.5 py-1 rounded-md bg-[#1c1917] dark:bg-[#2e2923] text-white dark:text-[#f5f4f0] text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-md">
                  {item.label}
                </div>
              )}

              {/* Sub-menu Dropdown List (rendered directly below the item) */}
              {!isCollapsed && hasDropdown && isOpen && item.subItems && (
                <div className="ms-6 ps-2.5 border-s border-[#ded5c6] dark:border-[#2f2a24] my-1 space-y-0.5 flex flex-col">
                  {item.subItems.map((sub) => {
                    const isSubActive = activeItem === sub.id;
                    return (
                      <Link
                        key={sub.id}
                        href={sub.href}
                        onClick={() => setActiveItem(sub.id)}
                        className={cn(
                          "group/sub flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors text-start",
                          isSubActive
                            ? "bg-[#faf5eb] dark:bg-[#2b2419] text-[#b8863b] dark:text-[#d4a759] font-semibold"
                            : "text-[#6c645b] dark:text-[#9e968a] hover:text-[#b8863b] dark:hover:text-[#d4a759] hover:bg-[#faf8f4] dark:hover:bg-[#201d1a]"
                        )}
                      >
                        {/* Dot indicator showing child item relationship */}
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full shrink-0 transition-all",
                            isSubActive
                              ? "bg-[#c29547] dark:bg-[#d4a759] ring-2 ring-[#c29547]/30 scale-110"
                              : "bg-[#beb5a8] dark:bg-[#524b42] group-hover/sub:bg-[#c29547] dark:group-hover/sub:bg-[#d4a759]"
                          )}
                        />
                        <span className="truncate">{sub.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Footer Info */}
      {!isCollapsed && (
        <div className="px-5 py-3.5 border-t border-[#ded5c6] dark:border-[#2f2a24] text-[10px] text-[#aaa193] dark:text-[#787166] flex items-center justify-between shrink-0">
          <span>{brand.name} {brand.tagline}</span>
          <span className="font-mono text-[#b3aaa0] dark:text-[#524b43]">{brand.version}</span>
        </div>
      )}
    </aside>
  );
}
