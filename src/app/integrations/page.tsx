import React from "react";
import type { Metadata } from "next";
import { IntegrationsView } from "@/features/integrations/components/IntegrationsView";

export const metadata: Metadata = {
  title: "الإضافات والتكاملات | الجودي لإدارة مكاتب وشركات المحاماة",
  description:
    "إدارة الميزات والإضافات المدفوعة لمكاتب المحاماة وضبط مفاتيح وبوابات الربط التقني - منصة الجودي Super Admin",
};

export default function IntegrationsPage() {
  return <IntegrationsView />;
}
