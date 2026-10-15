import React from "react";
import type { Metadata } from "next";
import { AccountsView } from "@/features/accounts/components/AccountsView";

export const metadata: Metadata = {
  title: "الحسابات والمشرفين | الجودي لإدارة مكاتب وشركات المحاماة",
  description:
    "لوحة إدارة حسابات المشرفين، صلاحيات الوصول، وضبط مستويات الأمان - منصة الجودي Super Admin",
};

export default function AccountsPage() {
  return <AccountsView />;
}
