"use client";

import React from "react";
import { Bot, Plus } from "lucide-react";

interface DashboardActiveChatbotsCardProps {
  onCreateBot?: () => void;
}

export function DashboardActiveChatbotsCard({
  onCreateBot,
}: DashboardActiveChatbotsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#ece7de] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-md bg-[#fbf6ec] border border-[#f5e7ce] flex items-center justify-center text-[#c29547]">
          <Bot className="w-3.5 h-3.5" />
        </div>
        <h3 className="text-sm font-bold text-[#1c1917]">
          روبوتات المحادثة النشطة
        </h3>
      </div>

      {/* Empty State Inner Container */}
      <div className="bg-[#faf8f4] border border-[#f0ebdF] rounded-xl p-7 flex flex-col items-center justify-center text-center min-h-[175px]">
        {/* Robot Icon */}
        <div className="w-10 h-10 rounded-xl bg-white border border-[#eae4d8] text-[#a89d8f] flex items-center justify-center mb-3 shadow-xs">
          <Bot className="w-5 h-5 text-[#9a8f81]" />
        </div>

        <h4 className="text-xs md:text-sm font-bold text-[#2e2925] mb-1">
          لا توجد روبوتات محادثة نشطة
        </h4>
        <p className="text-[11px] text-[#938a7e] font-medium mb-3.5">
          أنشئ أول روبوت محادثة لك
        </p>

        {/* Action Button */}
        <button
          type="button"
          onClick={onCreateBot}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-[#b8863b] bg-white border border-[#e4cca3] hover:border-[#c29547] hover:bg-[#faf5ea] shadow-xs transition-all active:scale-98"
        >
          <Plus className="w-3.5 h-3.5 text-[#b8863b]" />
          <span>إنشاء روبوت محادثة</span>
        </button>
      </div>
    </div>
  );
}
