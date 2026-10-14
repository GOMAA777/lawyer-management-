import React from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { DashboardTopNavbar } from "@/features/dashboard/components/DashboardTopNavbar";
import { DashboardWelcomeBanner } from "@/features/dashboard/components/DashboardWelcomeBanner";
import { DashboardOverviewKpis } from "@/features/dashboard/components/DashboardOverviewKpis";
import { DashboardEarningReportCard } from "@/features/dashboard/components/DashboardEarningReportCard";
import { DashboardContactsAndPlansSection } from "@/features/dashboard/components/DashboardContactsAndPlansSection";
import { DashboardSubscriptionsAndClientsTables } from "@/features/dashboard/components/DashboardSubscriptionsAndClientsTables";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#fcfbfa] dark:bg-[#121110] text-[#1c1917] dark:text-[#f5f4f0] transition-colors duration-200">
      {/* 1. Main Navigation Sidebar (Right side in RTL) */}
      <DashboardSidebar />

      {/* 2. Main Application Body Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navigation Bar with breadcrumbs and actions */}
        <DashboardTopNavbar />

        {/* Scrollable Dashboard Workspace Content */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-5 space-y-5 overflow-y-auto scrollbar-thin w-full pb-10">
          {/* Greeting Banner with Date Range Filters */}
          <DashboardWelcomeBanner />

          {/* Row 1: Top 4 Overview KPI Cards with Sparklines */}
          <DashboardOverviewKpis />

          {/* Row 2: Main Middle 2-Column Grid (Earning Report + Contacts & Plans) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Wider Column: Earning Report Chart */}
            <div className="lg:col-span-8 flex flex-col h-full">
              <DashboardEarningReportCard />
            </div>

            {/* Narrower Column: Total Contact Lists, Total Contacts, and Best Selling Plan */}
            <div className="lg:col-span-4 flex flex-col h-full">
              <DashboardContactsAndPlansSection />
            </div>
          </div>

          {/* Row 3: Bottom 2 Tables (Recent Subscription + Best Client) */}
          <DashboardSubscriptionsAndClientsTables />
        </main>
      </div>
    </div>
  );
}
