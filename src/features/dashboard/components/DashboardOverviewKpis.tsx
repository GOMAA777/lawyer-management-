"use client";

import React from "react";
import { useUIStore } from "@/stores/use-ui-store";
import { translations } from "@/lib/i18n";

interface OverviewKpiItem {
  id: string;
  titleKey: "activeSubscription" | "totalEarning" | "totalClient" | "totalCampaign";
  value: string;
  badgeValue: string;
  gradientId: string;
  pathD: string;
  areaD: string;
  strokeColor: string;
  fillColor: string;
}

export function DashboardOverviewKpis() {
  const { language } = useUIStore();
  const t = translations[language].overview;

  const kpis: OverviewKpiItem[] = [
    {
      id: "active-sub",
      titleKey: "activeSubscription",
      value: "3",
      badgeValue: "0",
      gradientId: "grad-active-sub",
      pathD: "M 0,38 C 25,38 35,38 42,38 C 48,10 58,10 64,38 C 72,38 95,38 120,38",
      areaD: "M 0,38 C 25,38 35,38 42,38 C 48,10 58,10 64,38 C 72,38 95,38 120,38 L 120,48 L 0,48 Z",
      strokeColor: "#10b981",
      fillColor: "#10b981",
    },
    {
      id: "total-earning",
      titleKey: "totalEarning",
      value: "$10,976.00",
      badgeValue: "$0.00",
      gradientId: "grad-total-earning",
      pathD: "M 0,40 C 35,40 45,40 52,40 C 58,12 68,12 74,40 C 85,40 105,40 120,40",
      areaD: "M 0,40 C 35,40 45,40 52,40 C 58,12 68,12 74,40 C 85,40 105,40 120,40 L 120,48 L 0,48 Z",
      strokeColor: "#c29547",
      fillColor: "#c29547",
    },
    {
      id: "total-client",
      titleKey: "totalClient",
      value: "9",
      badgeValue: "2",
      gradientId: "grad-total-client",
      pathD: "M 0,40 C 20,40 32,38 40,28 C 46,20 50,38 56,12 C 62,38 68,26 76,28 C 84,30 100,40 120,40",
      areaD: "M 0,40 C 20,40 32,38 40,28 C 46,20 50,38 56,12 C 62,38 68,26 76,28 C 84,30 100,40 120,40 L 120,48 L 0,48 Z",
      strokeColor: "#f97316",
      fillColor: "#f97316",
    },
    {
      id: "total-campaign",
      titleKey: "totalCampaign",
      value: "422",
      badgeValue: "26",
      gradientId: "grad-total-campaign",
      pathD: "M 0,40 C 25,40 35,38 42,26 C 48,18 54,34 60,34 C 68,20 76,12 86,18 C 96,24 108,40 120,40",
      areaD: "M 0,40 C 25,40 35,38 42,26 C 48,18 54,34 60,34 C 68,20 76,12 86,18 C 96,24 108,40 120,40 L 120,48 L 0,48 Z",
      strokeColor: "#6366f1",
      fillColor: "#6366f1",
    },
  ];

  return (
    <section
      aria-label="Overview KPI Statistics"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      {kpis.map((kpi) => (
        <div
          key={kpi.id}
          className="bg-white dark:bg-[#1a1816] rounded-2xl border border-[#ded5c6] dark:border-[#2f2a24] p-4.5 flex items-center justify-between shadow-[0_4px_16px_-2px_rgba(80,65,45,0.06),0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)] hover:border-[#c29547]/60 dark:hover:border-[#d4a759]/60 hover:shadow-[0_8px_24px_-4px_rgba(194,149,71,0.18)] hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden"
        >
          {/* Left Details (Title, Number, Badge) */}
          <div className="flex flex-col text-start">
            <span className="text-xs font-semibold text-[#665e54] dark:text-[#a8a195]">
              {t[kpi.titleKey]}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#1c1917] dark:text-[#f5f4f0] tracking-tight my-1.5">
              {kpi.value}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#faf5eb] dark:bg-[#252018] text-[#b8863b] dark:text-[#d4a759] border border-[#eeddbb] dark:border-[#3d3222]">
                {kpi.badgeValue}
              </span>
              <span className="text-[11px] font-medium text-[#8f8578] dark:text-[#787166]">
                {t.sinceLastMonth}
              </span>
            </div>
          </div>

          {/* Right Sparkline Wave Chart */}
          <div className="w-24 sm:w-28 h-12 shrink-0">
            <svg
              viewBox="0 0 120 48"
              fill="none"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={kpi.gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={kpi.fillColor} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={kpi.fillColor} stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Shaded Area under curve */}
              <path d={kpi.areaD} fill={`url(#${kpi.gradientId})`} />
              {/* Curve Stroke */}
              <path
                d={kpi.pathD}
                fill="none"
                stroke={kpi.strokeColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      ))}
    </section>
  );
}
