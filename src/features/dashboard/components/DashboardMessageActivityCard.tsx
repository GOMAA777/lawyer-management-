"use client";

import React from "react";
import { BarChart2, TrendingUp } from "lucide-react";

export function DashboardMessageActivityCard() {
  return (
    <div className="bg-white rounded-2xl border border-[#ded5c6] p-5 shadow-[0_4px_16px_-2px_rgba(80,65,45,0.06),0_1px_3px_rgba(0,0,0,0.03)] hover:border-[#c29547]/50 hover:shadow-[0_8px_24px_-4px_rgba(194,149,71,0.12)] transition-all flex flex-col justify-between">
      {/* Card Header & Subtitle */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#fbf6ec] border border-[#f5e7ce] flex items-center justify-center text-[#c29547]">
              <BarChart2 className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-[#1c1917]">
              نشاط الرسائل
            </h3>
          </div>
          <p className="text-[11px] text-[#8c8279] font-medium mt-1 ps-8">
            تتبع أداء رسائلك ومحادثاتك
          </p>
        </div>
      </div>

      {/* Empty Chart State Inner Container */}
      <div className="bg-[#faf8f4] border border-[#ded5c6] rounded-xl p-10 flex flex-col items-center justify-center text-center min-h-[220px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
        {/* Trend Line Icon */}
        <div className="w-10 h-10 rounded-xl bg-white border border-[#ded5c6] text-[#a89d8f] flex items-center justify-center mb-3 shadow-xs">
          <TrendingUp className="w-5 h-5 text-[#9a8f81]" />
        </div>

        <h4 className="text-xs md:text-sm font-bold text-[#2e2925] mb-1">
          لا توجد بيانات متاحة
        </h4>
        <p className="text-[11px] text-[#938a7e] font-medium">
          ابدأ المحادثات لعرض النشاط
        </p>
      </div>
    </div>
  );
}
