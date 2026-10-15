import React from "react";
import { Metadata } from "next";
import { TicketsView } from "@/features/tickets/components/TicketsView";

export const metadata: Metadata = {
  title: "الدعم الفني وتذاكر المكاتب ومؤشر التأخير | منصة الجودي لإدارة مكاتب المحاماة",
  description:
    "متابعة تذاكر الدعم الفني لمكاتب المحاماة، محادثة الدعم المباشرة، مؤشر التذاكر المتأخرة لأكثر من 24 ساعة، وتحديث الأولويات وحالات البلاغات.",
};

export default function TicketsPage() {
  return <TicketsView />;
}
