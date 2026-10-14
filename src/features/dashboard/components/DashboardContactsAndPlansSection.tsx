"use client";

import React from "react";
import { BookUser, Users } from "lucide-react";
import { useUIStore } from "@/stores/use-ui-store";
import { translations } from "@/lib/i18n";

interface PlanItem {
  name: string;
  price: string;
  subscriptions: number;
}

export function DashboardContactsAndPlansSection() {
  const { language } = useUIStore();
  const t = translations[language].overview;

  const plans: PlanItem[] = [
    { name: "Advance Pro", price: "$300.00", subscriptions: 27 },
    { name: "basic", price: "$133.00", subscriptions: 5 },
    { name: "Pro", price: "$250.00", subscriptions: 2 },
    { name: "Enterprise Custom", price: "$599.00", subscriptions: 1 },
    { name: "Starter Tier", price: "$49.00", subscriptions: 1 },
  ];

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Top 2 Cards: Total Contact Lists & Total Contacts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
        {/* Card 1: Total Contact Lists */}
        <div className="bg-white dark:bg-[#1a1816] rounded-2xl border border-[#ded5c6] dark:border-[#2f2a24] p-4.5 flex flex-col justify-between shadow-[0_4px_16px_-2px_rgba(80,65,45,0.06),0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-[#faf5eb] dark:bg-[#201c17] border border-[#eeddbb] dark:border-[#382b18] flex items-center justify-center text-[#c29547] dark:text-[#d4a759] shrink-0">
              <BookUser className="w-5 h-5" />
            </div>
            {/* Wave curve */}
            <div className="w-20 h-9">
              <svg viewBox="0 0 80 32" fill="none" className="w-full h-full">
                <path
                  d="M0,28 C15,28 20,4 35,4 C 45,4 50,24 60,16 C 68,10 75,22 80,22"
                  stroke="#c29547"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="mt-3 text-start">
            <span className="text-[11px] font-medium text-[#7c7366] dark:text-[#9e968a] block">
              {t.totalContactLists}
            </span>
            <span className="text-2xl font-extrabold text-[#c29547] dark:text-[#d4a759] tracking-tight mt-0.5 block">
              157
            </span>
          </div>
        </div>

        {/* Card 2: Total Contacts */}
        <div className="bg-white dark:bg-[#1a1816] rounded-2xl border border-[#ded5c6] dark:border-[#2f2a24] p-4.5 flex flex-col justify-between shadow-[0_4px_16px_-2px_rgba(80,65,45,0.06),0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-[#fdf7ed] dark:bg-[#251e16] border border-[#f5dfbc] dark:border-[#44331e] flex items-center justify-center text-[#b87928] dark:text-[#e59a3c] shrink-0">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-start">
            <span className="text-[11px] font-medium text-[#7c7366] dark:text-[#9e968a] block">
              {t.totalContacts}
            </span>
            <span className="text-2xl font-extrabold text-[#b87928] dark:text-[#e59a3c] tracking-tight mt-0.5 block">
              135.11 K
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Card: Best Selling Plan */}
      <div className="bg-white dark:bg-[#1a1816] rounded-2xl border border-[#ded5c6] dark:border-[#2f2a24] p-5 shadow-[0_4px_16px_-2px_rgba(80,65,45,0.06),0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)] flex-1 flex flex-col justify-between">
        <div className="border-b border-[#ded5c6]/60 dark:border-[#2f2a24] pb-3 mb-3 shrink-0">
          <h2 className="text-sm font-bold text-[#1c1917] dark:text-[#f5f4f0] text-start">
            {t.bestSellingPlan}
          </h2>
        </div>

        <div className="overflow-x-auto flex-1 flex flex-col justify-between">
          <table className="w-full text-xs text-start flex-1 h-full">
            <thead className="shrink-0">
              <tr className="border-b border-[#ded5c6]/40 dark:border-[#2f2a24] text-[#8c8279] dark:text-[#787166]">
                <th className="pb-2.5 font-semibold text-start">{t.plan}</th>
                <th className="pb-2.5 font-semibold text-start">{t.price}</th>
                <th className="pb-2.5 font-semibold text-end">{t.subscriptions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ded5c6]/30 dark:divide-[#25201a] h-full">
              {plans.map((p, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#faf8f4] dark:hover:bg-[#201d1a] transition-colors"
                >
                  <td className="py-3 sm:py-3.5 font-semibold text-[#2c2825] dark:text-[#e4ded5] text-start align-middle">
                    {p.name}
                  </td>
                  <td className="py-3 sm:py-3.5 font-medium text-[#6c645b] dark:text-[#9e968a] text-start align-middle">
                    {p.price}
                  </td>
                  <td className="py-3 sm:py-3.5 font-bold text-[#1c1917] dark:text-[#f5f4f0] text-end align-middle">
                    {p.subscriptions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
