import React from "react";
import { Metadata } from "next";
import { TrialsView } from "@/features/trials/components/TrialsView";

export const metadata: Metadata = {
  title: "متابعة التجارب المجانية | منصة الجودي لإدارة مكاتب المحاماة",
  description:
    "لوحة مخصصة لفريق السيلز لمتابعة المكاتب التي بدأت تجربة مجانية، معرفة ميعاد الانتهاء، تسجيل محاضر التواصل، ومتابعة الاشتراكات.",
};

export default function TrialsPage() {
  return <TrialsView />;
}
