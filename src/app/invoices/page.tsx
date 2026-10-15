import React from "react";
import { Metadata } from "next";
import { InvoicesView } from "@/features/invoices/components/InvoicesView";

export const metadata: Metadata = {
  title: "الفواتير والمعاملات المالية والمتأخرات | منصة الجودي لإدارة مكاتب المحاماة",
  description:
    "متابعة الفواتير الضريبية المعتمدة (ZATCA)، فواتير الاشتراكات المتأخرة، إرسال تذكيرات السداد بالواتساب والإيميل، وإجراءات تعليق الحسابات.",
};

export default function InvoicesPage() {
  return <InvoicesView />;
}
