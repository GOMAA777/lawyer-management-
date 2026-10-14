"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Inbox,
  Kanban,
  FileText,
  MessageSquare,
  MessageCircle,
  Bot,
  Search,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

function InstagramIcon({ className }: { className?: string }) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function MessengerIcon({ className }: { className?: string }) {
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
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  );
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isNew?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

export function DashboardSidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigationSections: NavSection[] = [
    {
      items: [
        {
          id: "dashboard",
          label: "لوحة التحكم",
          href: "/",
          icon: LayoutDashboard,
        },
        {
          id: "inbox",
          label: "صندوق الوارد",
          href: "#",
          icon: Inbox,
        },
        {
          id: "tasks",
          label: "لوحة المهام",
          href: "#",
          icon: Kanban,
        },
        {
          id: "templates",
          label: "نماذج واتساب",
          href: "#",
          icon: FileText,
        },
      ],
    },
    {
      title: "إنستغرام",
      items: [
        {
          id: "instagram-connect",
          label: "ربط إنستغرام",
          href: "#",
          icon: InstagramIcon,
          isNew: true,
        },
        {
          id: "instagram-bot",
          label: "روبوت رسائل إنستغرام",
          href: "#",
          icon: MessageSquare,
          isNew: true,
        },
        {
          id: "instagram-comments",
          label: "الرد على التعليقات",
          href: "#",
          icon: MessageCircle,
          isNew: true,
        },
      ],
    },
    {
      title: "ماسنجر",
      items: [
        {
          id: "messenger-accounts",
          label: "حسابات ماسنجر",
          href: "#",
          icon: MessengerIcon,
          isNew: true,
        },
        {
          id: "messenger-bot",
          label: "روبوت محادثة ماسنجر",
          href: "#",
          icon: Bot,
          isNew: true,
        },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen border-s border-[#eeeae2] bg-white transition-all duration-300 z-30 select-none",
        isCollapsed ? "w-20" : "w-[260px] xl:w-[275px]"
      )}
    >
      {/* Top Header with Brand Logo & Collapse Toggle */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#f4f1ea]/80">
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-[#a89f91] hover:text-[#c29547] hover:bg-[#faf7f0] p-1.5 rounded-lg transition-colors"
          title={isCollapsed ? "توسيع القائمة" : "طي القائمة"}
        >
          {isCollapsed ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="text-end">
              <h1 className="text-xl font-extrabold text-[#c29547] leading-tight tracking-tight">
                الجودي
              </h1>
              <span className="text-[10px] font-medium text-[#9c9384] tracking-wide block">
                للتسويق الرقمي
              </span>
            </div>
            {/* Geometric Gold Logo Icon */}
            <div className="w-9 h-9 rounded-lg bg-[#c29547] flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-[#c29547]/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="w-5 h-5 text-white"
              >
                <path d="M19 7V4H5v16h14v-8h-7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Search Input Bar */}
      {!isCollapsed && (
        <div className="px-4 pt-4 pb-2">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="...ابحث في التطبيق"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#faf8f4] text-[#2c2825] placeholder-[#b2a899] text-xs font-medium rounded-full py-2.5 ps-9 pe-4 border border-[#eeeae1] focus:border-[#c29547] focus:bg-white focus:outline-none transition-all text-start"
            />
            <Search className="w-4 h-4 text-[#aba293] absolute start-3 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-5 scrollbar-thin">
        {navigationSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {section.title && !isCollapsed && (
              <div className="px-3 pt-2 pb-1 text-[11px] font-semibold text-[#a89e90]">
                {section.title}
              </div>
            )}

            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveItem(item.id)}
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
                    <span className="flex-1 text-start">{item.label}</span>
                  )}

                  {!isCollapsed && item.isNew && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-[#fdf5e6] text-[#b8863b] border border-[#f3dfba]">
                      جديد
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Footer Info */}
      {!isCollapsed && (
        <div className="px-5 py-4 border-t border-[#f4f1ea] text-[10px] text-[#aaa193] flex items-center justify-between">
          <span>الجودي للتسويق الرقمي</span>
          <span className="font-mono text-[#b3aaa0]">v1.5</span>
        </div>
      )}
    </aside>
  );
}
