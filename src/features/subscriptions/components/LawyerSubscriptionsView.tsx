"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { DashboardTopNavbar } from "@/features/dashboard/components/DashboardTopNavbar";
import { LawyerSubscriptionsBanner } from "./LawyerSubscriptionsBanner";
import { LawyerSubscriptionsOverviewKpis } from "./LawyerSubscriptionsOverviewKpis";
import { LawyerSubscriptionsEarningCard } from "./LawyerSubscriptionsEarningCard";
import { LawyerSubscriptionsPlansSection } from "./LawyerSubscriptionsPlansSection";
import { LawyerSubscriptionsTables } from "./LawyerSubscriptionsTables";
import { ScalesOfJusticeWatermark } from "@/components/shared/ScalesOfJusticeWatermark";

export function LawyerSubscriptionsView() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#fcfbfa] dark:bg-[#121110] text-[#1c1917] dark:text-[#f5f4f0] transition-colors duration-200 relative">
      {/* 1. Main Navigation Sidebar (Right side in RTL) */}
      <DashboardSidebar />

      {/* 2. Main Application Body Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {/* Top Navigation Bar with breadcrumbs and actions */}
        <DashboardTopNavbar />

        {/* Scrollable Dashboard Workspace Content */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-5 space-y-5 overflow-y-auto scrollbar-thin w-full pb-10 relative">
          {/* Subtle Transparent Scales of Justice (ميزان) Watermark across workspace */}
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] sm:w-[650px] sm:h-[650px] lg:w-[780px] lg:h-[780px] opacity-[0.038] dark:opacity-[0.05] text-[#c29547] dark:text-[#d4a759] pointer-events-none select-none z-0"
            aria-hidden="true"
          >
            <ScalesOfJusticeWatermark className="w-full h-full" />
          </div>

          {/* Greeting Banner with Date Range Filters */}
          <LawyerSubscriptionsBanner
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
          />

          {/* Row 1: Top 4 Overview KPI Cards for Lawyers */}
          <LawyerSubscriptionsOverviewKpis />

          {/* Row 2: Main Middle 2-Column Grid (Earning Report + Licenses & Plans) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch relative z-10">
            {/* Wider Column: Earning Report Chart */}
            <div className="lg:col-span-8 flex flex-col h-full">
              <LawyerSubscriptionsEarningCard />
            </div>

            {/* Narrower Column: Total Lawyer Licenses, Covered Cases, and Best Selling Legal Plans */}
            <div className="lg:col-span-4 flex flex-col h-full">
              <LawyerSubscriptionsPlansSection />
            </div>
          </div>

          {/* Row 3: Bottom 2 Tables (Recent Lawyer Subscriptions + Top Law Firms) */}
          <LawyerSubscriptionsTables />
        </main>
      </div>
    </div>
  );
}
