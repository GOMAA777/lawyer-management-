import React from "react";
import { Metadata } from "next";
import { PaymentGatewaysView } from "@/features/payment-gateways/components/PaymentGatewaysView";

export const metadata: Metadata = {
  title: "إعدادات بوابات الدفع الإلكتروني | منصة الجودي لإدارة مكاتب المحاماة",
  description:
    "إدارة بوابات التحصيل الإلكتروني (مدى، فيزا، ماستركارد، سداد، تابي، تمارا)، تبديل بيئات العمل (حي / تجريبي)، وتكوين مفاتيح الـ API والويب هوك.",
};

export default function PaymentGatewaysPage() {
  return <PaymentGatewaysView />;
}
