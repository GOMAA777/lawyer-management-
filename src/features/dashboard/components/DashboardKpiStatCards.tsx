"use client";

import React from "react";
import { Bot, MessageSquare, CheckCircle, TrendingUp } from "lucide-react";

interface KpiCardData {
  id: string;
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  bars: number[]; // Percentage heights for the 7 mini sparkline bars
}

export function DashboardKpiStatCards() {
  const kpiCards: KpiCardData[] = [
    {
      id: "ai-agents",
      title: "وكلاء الذكاء الاصطناعي",
      value: 0,
      icon: Bot,
      bars: [45, 60, 30, 40, 20, 35, 10],
    },
    {
      id: "active-chats",
      title: "المحادثات النشطة",
      value: 0,
      icon: MessageSquare,
      bars: [30, 45, 65, 50, 25, 40, 10],
    },
    {
      id: "completed-tasks",
      title: "المهام المكتملة",
      value: 0,
      icon: CheckCircle,
      bars: [50, 30, 45, 60, 40, 55, 10],
    },
    {
      id: "whatsapp-accounts",
      title: "حسابات واتساب",
      value: 0,
      icon: TrendingUp,
      bars: [35, 55, 70, 45, 50, 60, 10],
    },
  ];

  return (
    <section aria-label="المؤشرات الرئيسية" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiCards.map((kpi) => {
        const Icon = kpi.icon;

        return (
          <div
            key={kpi.id}
            className="bg-white rounded-2xl border border-[#ece7de] p-4 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#dfd7ca] hover:shadow-sm transition-all relative overflow-hidden"
          >
            {/* Top row: Title on right (RTL), Icon on left (RTL) */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#5c544b]">
                {kpi.title}
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#fbf6ec] border border-[#f5e7ce] flex items-center justify-center text-[#c29547]">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Middle row: Large Metric Value */}
            <div className="my-2">
              <span className="text-3xl font-extrabold text-[#1c1917] tracking-tight">
                {kpi.value}
              </span>
            </div>

            {/* Bottom row: Mini Bar Sparkline Chart */}
            <div className="h-9 flex items-end justify-between gap-1 pt-2">
              {kpi.bars.map((heightPercent, idx) => (
                <div
                  key={idx}
                  className="flex-1 rounded-sm bg-[#e8dcce]/80 hover:bg-[#d9c7b0] transition-colors"
                  style={{ height: `${heightPercent}%` }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
