"use client";

import React, { useState } from "react";
import { Megaphone, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardBulkCampaignsCard() {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-[#ded5c6] p-5 shadow-[0_4px_16px_-2px_rgba(80,65,45,0.06),0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_-4px_rgba(194,149,71,0.12)] transition-all flex flex-col justify-between">
      {/* Top Header Row with Megaphone Icon & Title + ON Toggle Badge */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#fbf6ec] border border-[#f5e7ce] flex items-center justify-center text-[#c29547]">
            <Megaphone className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm font-bold text-[#1c1917]">
            حملات الرسائل الجماعية
          </h3>
        </div>

        {/* ON Toggle Status Badge */}
        <button
          type="button"
          onClick={() => setIsEnabled(!isEnabled)}
          className={cn(
            "px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase transition-all tracking-wider border shadow-2xs",
            isEnabled
              ? "bg-[#faf4e6] text-[#b8863b] border-[#d8c29d]"
              : "bg-[#f4f2ed] text-[#8e8578] border-[#ded5c6]"
          )}
        >
          {isEnabled ? "ON" : "OFF"}
        </button>
      </div>

      {/* Main Campaign Description */}
      <p className="text-xs text-[#6e665d] leading-relaxed mb-3">
        أرسل رسائل جماعية عبر واتساب مع الحماية من الحظر
      </p>

      {/* Sub Feature Row: Smart Random Intervals */}
      <div className="flex items-center gap-2 text-[11px] text-[#857b6f] font-medium pt-2.5 border-t border-[#ded5c6]">
        <Clock className="w-3.5 h-3.5 text-[#b8863b] shrink-0" />
        <span>فواصل زمنية عشوائية ذكية بين الرسائل</span>
      </div>
    </div>
  );
}
