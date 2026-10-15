import React from "react";
import { Metadata } from "next";
import { NotificationsTemplatesView } from "@/features/notifications/components/NotificationsTemplatesView";

export const metadata: Metadata = {
  title: "قوالب الإشعارات والبريد الإلكتروني الآلي | منصة الجودي لإدارة مكاتب المحاماة",
  description:
    "تخصيص قوالب الإيميلات التلقائية لمكاتب المحاماة (الترحيب، التنبيهات، الفواتير، تأكيد السداد، والتعليق)، المتغيرات الديناميكية، وإرسال إيميلات تجريبية.",
};

export default function NotificationsPage() {
  return <NotificationsTemplatesView />;
}
