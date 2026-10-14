"use client";

import React, { useState } from "react";
import { RefreshCw, Calendar, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardWelcomeBannerProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function DashboardWelcomeBanner({
  onRefresh,
  isRefreshing = false,
}: DashboardWelcomeBannerProps) {
  const [selectedRange, setSelectedRange] = useState<"7d" | "30d">("7d");

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 pb-5">
      {/* Right Side (RTL): Greeting & Last Update Time */}
      <div className="flex items-start gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-[#1c1917] tracking-tight">
              مرحباً بعودتك، الجودي
            </h2>
            <BarChart3 className="w-5 h-5 text-[#c29547] shrink-0" />
          </div>
          <p className="text-xs text-[#8c827a] mt-1 font-medium">
            آخر تحديث: ١٤ أكتوبر ٢٠٢٦، الساعة ١:٢٤ صباحاً
          </p>
        </div>
      </div>

      {/* Left Side (RTL): Refresh Button & Date Range Filter Pills */}
      <div className="flex items-center gap-2.5">
        {/* Refresh Button */}
        <button
          type="button"
          onClick={onRefresh}
          className="p-2 rounded-xl border border-[#ded5c6] bg-white text-[#7d7467] hover:text-[#c29547] hover:border-[#c29547] hover:bg-[#faf7f0] shadow-xs hover:shadow-sm transition-all"
          title="تحديث البيانات"
        >
          <RefreshCw
            className={cn("w-4 h-4", isRefreshing && "animate-spin text-[#c29547]")}
          />
        </button>

        {/* 7 Days Filter Pill */}
        <button
          type="button"
          onClick={() => setSelectedRange("7d")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border shadow-xs",
            selectedRange === "7d"
              ? "bg-[#faf5eb] text-[#b8863b] border-[#d8c29d] shadow-sm"
              : "bg-white text-[#6b6359] border-[#ded5c6] hover:bg-[#faf7f0] hover:border-[#c29547]"
          )}
        >
          <Calendar className="w-3.5 h-3.5 text-[#b8863b]" />
          <span>٧ أيام</span>
        </button>

        {/* 30 Days Filter Pill */}
        <button
          type="button"
          onClick={() => setSelectedRange("30d")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border shadow-xs",
            selectedRange === "30d"
              ? "bg-[#faf5eb] text-[#b8863b] border-[#d8c29d] shadow-sm"
              : "bg-white text-[#6b6359] border-[#ded5c6] hover:bg-[#faf7f0] hover:border-[#c29547]"
          )}
        >
          <Calendar className="w-3.5 h-3.5 text-[#a89e90]" />
          <span>٣٠ يوماً</span>
        </button>
      </div>
    </div>
  );
}
