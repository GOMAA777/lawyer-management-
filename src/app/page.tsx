import React from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { DashboardTopNavbar } from "@/features/dashboard/components/DashboardTopNavbar";
import { DashboardWelcomeBanner } from "@/features/dashboard/components/DashboardWelcomeBanner";
import { DashboardKpiStatCards } from "@/features/dashboard/components/DashboardKpiStatCards";
import { DashboardMessageActivityCard } from "@/features/dashboard/components/DashboardMessageActivityCard";
import { DashboardChatbotActivityCard } from "@/features/dashboard/components/DashboardChatbotActivityCard";
import { DashboardUnreadMessagesCard } from "@/features/dashboard/components/DashboardUnreadMessagesCard";
import { DashboardActiveChatbotsCard } from "@/features/dashboard/components/DashboardActiveChatbotsCard";
import { DashboardBulkCampaignsCard } from "@/features/dashboard/components/DashboardBulkCampaignsCard";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#fcfbfa] text-[#1c1917]">
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

          {/* Top 4 KPI Summary Cards */}
          <DashboardKpiStatCards />

          {/* Main 2-Column Analytics & Activity Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* Wider Column (Right in RTL): Message & Chatbot Activity Charts */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
              <DashboardMessageActivityCard />
              <DashboardChatbotActivityCard />
            </div>

            {/* Narrower Column (Left in RTL): Unread Messages, Active Bots & Campaigns */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
              <DashboardUnreadMessagesCard />
              <DashboardActiveChatbotsCard />
              <DashboardBulkCampaignsCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
