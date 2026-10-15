"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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

function SubmenuBranchConnector({
  isLast,
  isActive,
  direction,
}: {
  isLast: boolean;
  isActive: boolean;
  direction: "rtl" | "ltr";
}) {
  const isRtl = direction === "rtl";
  // Width of connector is 24px, row height is 38px
  // In RTL, trunk starts at x = 16 (aligned with parent icon center), curves left to x = 5
  // In LTR, trunk starts at x = 8 (aligned with parent icon center), curves right to x = 19
  const trunkX = isRtl ? 16 : 8;
  const targetX = isRtl ? 5 : 19;
  const circleX = isRtl ? 4 : 20;

  // Smooth Bézier curve from trunk (trunkX, 0) down to branch ending at (targetX, 19)
  const pathD = isRtl
    ? `M 16 0 V 10 Q 16 19 8 19 L 5 19`
    : `M 8 0 V 10 Q 8 19 16 19 L 19 19`;

  return (
    <div className="w-6 shrink-0 h-[38px] relative self-stretch flex items-center pointer-events-none select-none">
      <svg
        viewBox="0 0 24 38"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        {/* Continuous Trunk Continuing Downward if not last item */}
        {!isLast && (
          <line
            x1={trunkX}
            y1={10}
            x2={trunkX}
            y2={38}
            strokeWidth="1.8"
            className={cn(
              "transition-colors duration-200",
              isActive
                ? "stroke-[#c29547] dark:stroke-[#d4a759]"
                : "stroke-[#ded5c6] dark:stroke-[#383126] group-hover/sub:stroke-[#c29547]/60 dark:group-hover/sub:stroke-[#d4a759]/60"
            )}
            strokeLinecap="round"
          />
        )}

        {/* Curved Branch Path */}
        <path
          d={pathD}
          fill="none"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "transition-colors duration-200",
            isActive
              ? "stroke-[#c29547] dark:stroke-[#d4a759]"
              : "stroke-[#ded5c6] dark:stroke-[#383126] group-hover/sub:stroke-[#c29547] dark:group-hover/sub:stroke-[#d4a759]"
          )}
        />

        {/* Jewel Node Bullet at tip of curve */}
        {isActive ? (
          <g>
            {/* Outer golden halo glow */}
            <circle
              cx={circleX}
              cy={19}
              r={4.5}
              className="fill-[#c29547]/25 dark:fill-[#d4a759]/30"
            />
            {/* Solid gold jewel center */}
            <circle
              cx={circleX}
              cy={19}
              r={2.8}
              className="fill-[#c29547] dark:fill-[#d4a759]"
            />
          </g>
        ) : (
          <circle
            cx={circleX}
            cy={19}
            r={2.2}
            className="fill-white dark:fill-[#1a1714] stroke-[#c0b5a4] dark:stroke-[#544b3e] stroke-[1.5] group-hover/sub:stroke-[#c29547] group-hover/sub:fill-[#c29547] transition-all duration-150"
          />
        )}
      </svg>
    </div>
  );
}

export function DashboardSidebar() {
  const { language, direction } = useUIStore();
  const t = translations[language].nav;
  const brand = translations[language].brand;

  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(() => {
    if (pathname === "/subscriptions") return "subscription";
    return "dashboard";
  });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  // Sync active item when route changes
  React.useEffect(() => {
    if (pathname === "/subscriptions") {
      setActiveItem("subscription");
    } else if (pathname === "/") {
      setActiveItem("dashboard");
    }
  }, [pathname]);

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
      href: "/subscriptions",
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
        isCollapsed ? "w-20" : "w-[260px] xl:w-[275px]"
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
            <div className="w-10 h-10 rounded-full bg-[#faf5eb] dark:bg-[#201c17] border border-[#eeddbb] dark:border-[#382b18] p-1.5 flex items-center justify-center shadow-xs shrink-0 hover:scale-105 transition-transform">
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
            className="w-10 h-10 rounded-full bg-[#faf5eb] dark:bg-[#201c17] border border-[#eeddbb] dark:border-[#382b18] p-1.5 flex items-center justify-center shadow-xs mx-auto rtl:translate-x-1.5 ltr:-translate-x-1.5 hover:scale-105 transition-transform"
            title={brand.name}
          >
            <Image
              src="/logo.png"
              alt={brand.name}
              width={34}
              height={34}
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
                onClick={(e) => {
                  if (item.href === "#") {
                    e.preventDefault();
                  }
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
                <div className="ms-3 pe-2 relative flex flex-col my-1">
                  {/* Top vertical lead-in line from parent icon */}
                  <div className="w-6 h-2 relative pointer-events-none">
                    <svg viewBox="0 0 24 8" className="w-full h-full overflow-visible">
                      <line
                        x1={direction === "rtl" ? 16 : 8}
                        y1={0}
                        x2={direction === "rtl" ? 16 : 8}
                        y2={8}
                        strokeWidth="1.8"
                        className="stroke-[#ded5c6] dark:stroke-[#383126]"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {item.subItems.map((sub, index) => {
                    const isLast = index === (item.subItems?.length ?? 0) - 1;
                    const isSubActive = activeItem === sub.id;

                    return (
                      <div
                        key={sub.id}
                        className="relative flex items-center group/sub"
                      >
                        {/* 1. Flawless Vector Tree Connector & Jewel Node */}
                        <SubmenuBranchConnector
                          isLast={isLast}
                          isActive={isSubActive}
                          direction={direction}
                        />

                        {/* 2. Sub-item Link Pill (strictly outside connector gutter to prevent overlapping) */}
                        <Link
                          href={sub.href}
                          onClick={(e) => {
                            if (sub.href === "#") {
                              e.preventDefault();
                            }
                            setActiveItem(sub.id);
                          }}
                          className={cn(
                            "flex-1 flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all text-start relative",
                            direction === "rtl"
                              ? "group-hover/sub:-translate-x-0.5"
                              : "group-hover/sub:translate-x-0.5",
                            isSubActive
                              ? "bg-[#faf5eb] dark:bg-[#282117] text-[#b8863b] dark:text-[#d4a759] font-bold border border-[#eeddbb] dark:border-[#523e20] shadow-[0_2px_8px_-1px_rgba(194,149,71,0.18)]"
                              : "text-[#5a5247] dark:text-[#aba295] hover:text-[#b8863b] dark:hover:text-[#d4a759] hover:bg-[#faf7f0] dark:hover:bg-[#201d1a] border border-transparent"
                          )}
                        >
                          <span className="truncate">{sub.label}</span>
                          {isSubActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c29547] dark:bg-[#d4a759] shrink-0 ms-2" />
                          )}
                        </Link>
                      </div>
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
