import React from "react";
import type { Metadata } from "next";
import { LawyerSubscriptionsView } from "@/features/subscriptions/components/LawyerSubscriptionsView";

export const metadata: Metadata = {
  title: "لوحة الاشتراكات - الجودي لإدارة مكاتب وشركات المحاماة",
  description: "المنصة السحابية المتكاملة لإدارة اشتراكات مكاتب المحاماة، القضايا، الجلسات، والموكلين - الجودي",
};

export default function DashboardPage() {
  return <LawyerSubscriptionsView />;
}
