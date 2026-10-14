import React from "react";
import type { Metadata } from "next";
import { LoadingScreen } from "@/components/shared/LoadingScreen";

export const metadata: Metadata = {
  title: "جاري التحميل... | منصة الجودي",
  description: "صفحة التحميل والتهيئة السحابية لمنصة الجودي",
};

export default function LoadingDemoPage() {
  return <LoadingScreen statusText="توثيق مساحة العمل وتهيئة البيانات..." />;
}
