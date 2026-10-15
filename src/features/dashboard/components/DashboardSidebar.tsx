"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  TrendingUp,
  Building2,
  CreditCard,
  Scale,
  Users,
  Headphones,
  Bell,
  Sparkles,
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Search,
} from "lucide-react";
import { toast } from "sonner";
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
  badge?: string;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  subItems?: SubNavItem[];
}

interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
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
  const trunkX = isRtl ? 16 : 8;
  const circleX = isRtl ? 4 : 20;

  // Smooth Bézier curve from trunk (trunkX, 0) down to branch ending at (circleX, 19)
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
            <circle
              cx={circleX}
              cy={19}
              r={4.5}
              className="fill-[#c29547]/25 dark:fill-[#d4a759]/30"
            />
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const activeItem =
    pathname === "/subscriptions"
      ? "sub-subscriptions"
      : pathname === "/integrations"
      ? "sub-integrations"
      : pathname === "/accounts"
      ? "sub-accounts"
      : pathname === "/menus"
      ? "sub-menus"
      : pathname === "/permissions"
      ? "sub-permissions"
      : pathname === "/"
      ? "dashboard"
      : (selectedId ?? "dashboard");

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(() => ({
    "sales-menu": false,
    "finance-menu": pathname === "/subscriptions",
    "legal-menu": false,
    "settings-menu":
      pathname === "/integrations" ||
      pathname === "/accounts" ||
      pathname === "/menus" ||
      pathname === "/permissions",
  }));

  // Structure the 6 requested SaaS Super Admin Sections
  const navSections: NavSection[] = [
    {
      id: "overview",
      title: t.sectionOverview,
      items: [
        {
          id: "dashboard",
          label: t.dashboard,
          href: "/",
          icon: DashboardGaugeIcon,
        },
        {
          id: "analytics",
          label: t.analytics,
          href: "#",
          icon: TrendingUp,
          badge: language === "ar" ? "جديد" : "New",
        },
      ],
    },
    {
      id: "sales",
      title: t.sectionSales,
      items: [
        {
          id: "sales-menu",
          label: t.sectionSales,
          href: "#",
          icon: Building2,
          subItems: [
            { id: "sub-law-firms", label: t.lawFirms, href: "#" },
            { id: "sub-leads", label: t.leads, href: "#" },
            { id: "sub-storage", label: t.storage, href: "#" },
          ],
        },
      ],
    },
    {
      id: "finance",
      title: t.sectionFinance,
      items: [
        {
          id: "finance-menu",
          label: t.sectionFinance,
          href: "/subscriptions",
          icon: CreditCard,
          subItems: [
            { id: "sub-subscriptions", label: t.subscriptions, href: "/subscriptions" },
            { id: "sub-pricing-plans", label: t.pricingPlans, href: "#" },
            { id: "sub-invoices", label: t.invoices, href: "#" },
            { id: "sub-coupons", label: t.coupons, href: "#" },
            { id: "sub-payment-gateways", label: t.paymentGateways, href: "#" },
          ],
        },
      ],
    },
    {
      id: "legal",
      title: t.sectionLegal,
      items: [
        {
          id: "legal-menu",
          label: t.sectionLegal,
          href: "#",
          icon: Scale,
          subItems: [
            { id: "sub-legal-templates", label: t.legalTemplates, href: "#" },
            { id: "sub-courts", label: t.courts, href: "#" },
          ],
        },
      ],
    },
    {
      id: "support",
      title: t.sectionSupport,
      items: [
        {
          id: "team-roles",
          label: t.teamRoles,
          href: "#",
          icon: Users,
        },
        {
          id: "support-tickets",
          label: t.supportTickets,
          href: "#",
          icon: Headphones,
          badge: "3",
        },
        {
          id: "notifications",
          label: t.notifications,
          href: "#",
          icon: Bell,
        },
        {
          id: "ai-assistant",
          label: t.aiAssistant,
          href: "#",
          icon: Sparkles,
          badge: "AI",
        },
      ],
    },
    {
      id: "settings",
      title: t.sectionSettings,
      items: [
        {
          id: "settings-menu",
          label: t.sectionSettings,
          href: "/integrations",
          icon: Settings,
          subItems: [
            { id: "sub-integrations", label: t.addonsIntegrations, href: "/integrations" },
            { id: "sub-accounts", label: t.accounts, href: "/accounts" },
            { id: "sub-menus", label: t.menus, href: "/menus" },
            { id: "sub-permissions", label: t.permissions, href: "/permissions" },
            { id: "sub-site-settings", label: t.siteSettings, href: "#" },
            { id: "sub-mail-settings", label: t.mailSettings, href: "#" },
            { id: "sub-system-backups", label: t.systemSettings, href: "#" },
            { id: "sub-audit-logs", label: t.auditLogs, href: "#" },
          ],
        },
      ],
    },
  ];

  // Filter sections and items based on search query
  const query = searchQuery.trim().toLowerCase();
  const filteredSections = navSections
    .map((section) => {
      if (!query) return section;

      const filteredItems = section.items
        .map((item) => {
          const itemMatches = item.label.toLowerCase().includes(query);
          const filteredSubItems = item.subItems?.filter((sub) =>
            sub.label.toLowerCase().includes(query)
          );

          if (itemMatches || (filteredSubItems && filteredSubItems.length > 0)) {
            return {
              ...item,
              subItems: itemMatches ? item.subItems : filteredSubItems,
            };
          }
          return null;
        })
        .filter(Boolean) as NavItem[];

      if (filteredItems.length > 0 || section.title.toLowerCase().includes(query)) {
        return {
          ...section,
          items: filteredItems.length > 0 ? filteredItems : section.items,
        };
      }
      return null;
    })
    .filter(Boolean) as NavSection[];

  const handleItemClick = (label: string, href: string, id: string) => {
    setSelectedId(id);
    if (href === "#") {
      toast.info(
        language === "ar"
          ? `قسم "${label}" قيد التجهيز في النسخة القادمة من لوحة التحكم`
          : `"${label}" section is in preparation for the upcoming release`
      );
    }
  };

  return (
    <aside
      aria-label="القائمة الجانبية الرئيسية"
      className={cn(
        "relative flex flex-col h-screen shrink-0 border-e border-[#ded5c6] dark:border-[#2f2a24] bg-[#faf8f4] dark:bg-[#1a1816] transition-all duration-300 z-30 select-none shadow-[2px_0_12px_rgba(80,65,45,0.03)] dark:shadow-[2px_0_12px_rgba(0,0,0,0.5)]",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Top Header with Brand Logo */}
      <div
        className={cn(
          "flex items-center border-b border-[#ded5c6] dark:border-[#2f2a24] shrink-0 transition-all",
          isCollapsed ? "h-16 justify-center px-2" : "px-5 py-4 justify-between"
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
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-extrabold text-[#c29547] dark:text-[#d4a759] leading-tight tracking-tight">
                  {brand.name}
                </h1>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-[#fff7e6] dark:bg-[#2b2014] text-[#c29547] dark:text-[#d4a759] border border-[#eeddbb] dark:border-[#604218]">
                  Super Admin
                </span>
              </div>
              <span className="text-[10px] font-medium text-[#8c8279] dark:text-[#9e968a] tracking-wide block mt-0.5">
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
          "absolute top-5 z-40 w-7 h-7 rounded-full bg-white dark:bg-[#1a1816] border border-stone-800 dark:border-stone-500 hover:border-[#c29547] dark:hover:border-[#d4a759] flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-[#c29547] dark:hover:text-[#d4a759] shadow-sm hover:shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer",
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
        ) : direction === "rtl" ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
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
              className="w-full bg-[#faf5eb] dark:bg-[#201d1a] text-[#2c2825] dark:text-[#f5f4f0] placeholder-[#b2a899] dark:placeholder-[#6e675c] text-xs font-medium rounded-full py-2.5 ps-9 pe-4 border border-[#ded5c6] dark:border-[#2f2a24] focus:border-[#c29547] dark:focus:border-[#d4a759] focus:bg-white dark:focus:bg-[#25221e] focus:outline-none shadow-2xs transition-all text-start"
            />
            <Search className="w-4 h-4 text-[#aba293] dark:text-[#787166] absolute start-3 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Navigation Sections & Items List */}
      <div
        className={cn(
          "flex-1 overflow-y-auto scrollbar-thin space-y-4",
          isCollapsed ? "px-2 py-3" : "px-3 py-2"
        )}
      >
        {filteredSections.map((section) => (
          <div key={section.id} className="space-y-1">
            {/* Section Category Header */}
            {!isCollapsed && (
              <div className="px-3 pt-2.5 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-[#9e9384] dark:text-[#756d62] text-start select-none flex items-center justify-between">
                <span>{section.title}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c29547]/40 dark:bg-[#d4a759]/40" />
              </div>
            )}

            {/* Section Items */}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isChildActive = Boolean(
                item.subItems?.some((sub) => sub.id === activeItem)
              );
              const isActive = activeItem === item.id || isChildActive;
              const hasDropdown = Boolean(
                item.subItems && item.subItems.length > 0
              );
              const isOpen = Boolean(
                openDropdowns[item.id] !== undefined
                  ? openDropdowns[item.id]
                  : isChildActive
              );

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
                      if (hasDropdown && !isCollapsed) {
                        e.preventDefault();
                        setOpenDropdowns((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id],
                        }));
                      } else {
                        handleItemClick(item.label, item.href, item.id);
                      }
                    }}
                    className={cn(
                      "flex items-center rounded-xl text-xs font-medium transition-all relative cursor-pointer",
                      isCollapsed
                        ? "w-10 h-10 justify-center p-0 mx-auto"
                        : "w-full gap-3 px-3 py-2.5",
                      isActive
                        ? "bg-[#faf5eb] dark:bg-[#2b2419] text-[#b8863b] dark:text-[#d4a759] font-semibold border border-[#eeddbb] dark:border-[#5a4321] shadow-[0_2px_8px_-1px_rgba(194,149,71,0.15)]"
                        : "text-[#524b43] dark:text-[#c4bcb1] hover:text-[#b8863b] dark:hover:text-[#d4a759] hover:bg-[#faf5eb] dark:hover:bg-[#201d1a] border border-transparent"
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
                      <span className="flex-1 text-start font-medium tracking-tight truncate">
                        {item.label}
                      </span>
                    )}

                    {/* Badge if present */}
                    {!isCollapsed && item.badge && !hasDropdown && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#f4ebdc] dark:bg-[#2c2217] text-[#c29547] dark:text-[#d4a759] border border-[#eeddbb]/80 dark:border-[#5a4321]/80">
                        {item.badge}
                      </span>
                    )}

                    {/* Dropdown Chevron */}
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

                  {/* Sub-menu Dropdown List (Collapsible with Vector Tree Connectors) */}
                  {!isCollapsed && hasDropdown && isOpen && item.subItems && (
                    <div className="ms-3 pe-2 relative flex flex-col my-1 animate-in fade-in slide-in-from-top-1 duration-200">
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
                            {/* Flawless Vector Tree Connector & Jewel Node */}
                            <SubmenuBranchConnector
                              isLast={isLast}
                              isActive={isSubActive}
                              direction={direction}
                            />

                            {/* Sub-item Link Pill */}
                            <Link
                              href={sub.href}
                              onClick={(e) => {
                                if (sub.href === "#") {
                                  e.preventDefault();
                                }
                                handleItemClick(sub.label, sub.href, sub.id);
                              }}
                              className={cn(
                                "flex-1 flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all text-start relative cursor-pointer",
                                direction === "rtl"
                                  ? "group-hover/sub:-translate-x-0.5"
                                  : "group-hover/sub:translate-x-0.5",
                                isSubActive
                                  ? "bg-[#faf5eb] dark:bg-[#282117] text-[#b8863b] dark:text-[#d4a759] font-bold border border-[#eeddbb] dark:border-[#523e20] shadow-[0_2px_8px_-1px_rgba(194,149,71,0.18)]"
                                  : "text-[#5a5247] dark:text-[#aba295] hover:text-[#b8863b] dark:hover:text-[#d4a759] hover:bg-[#faf5eb] dark:hover:bg-[#201d1a] border border-transparent"
                              )}
                            >
                              <span className="truncate">{sub.label}</span>
                              {isSubActive ? (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#c29547] dark:bg-[#d4a759] shrink-0 ms-2" />
                              ) : sub.badge ? (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[#eee6d8] dark:bg-[#2e261d] text-[#8c8273] dark:text-[#a89d8d]">
                                  {sub.badge}
                                </span>
                              ) : null}
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
        ))}
      </div>

      {/* Footer User Mini-Status Badge */}
      <div className="p-3 border-t border-[#ded5c6] dark:border-[#2f2a24] shrink-0">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/70 dark:bg-[#201d1a]/70 border border-[#ded5c6]/60 dark:border-[#2f2a24]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#c29547] to-[#d4a759] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
              EP
            </div>
            <div className="flex-1 min-w-0 text-start">
              <span className="text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0] truncate block">
                Eljudy Prog
              </span>
              <span className="text-[10px] text-[#8c8279] dark:text-[#9e968a] truncate block">
                Super Admin Active
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981]" />
          </div>
        ) : (
          <div
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#c29547] to-[#d4a759] text-white flex items-center justify-center font-bold text-xs shadow-xs mx-auto"
            title="Super Admin - Eljudy Prog"
          >
            EP
          </div>
        )}
      </div>
    </aside>
  );
}
