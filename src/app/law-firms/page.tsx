import React from "react";
import { Metadata } from "next";
import { LawFirmsView } from "@/features/law-firms/components/LawFirmsView";

export const metadata: Metadata = {
  title: "دليل مكاتب المحاماة | منصة الجودي لإدارة مكاتب المحاماة",
  description:
    "إدارة مكاتب المحاماة المشتركة في المنصة، تفعيل وتعطيل الحسابات، الاطلاع على ملف المكتب الشامل، الباقات والفواتير وتذاكر الدعم وملاحظات الفريق.",
};

export default function LawFirmsPage() {
  return <LawFirmsView />;
}
