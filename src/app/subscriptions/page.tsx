import React from "react";
import type { Metadata } from "next";
import { LawyerSubscriptionsView } from "@/features/subscriptions/components/LawyerSubscriptionsView";

export const metadata: Metadata = {
  title: "اشتراكات المحامين | الجودي لإدارة مكاتب وشركات المحاماة",
  description: "لوحة متابعة وإدارة اشتراكات المحامين ومكاتب المحاماة - منصة الجودي",
};

export default function SubscriptionsPage() {
  return <LawyerSubscriptionsView />;
}
