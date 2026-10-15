import React from "react";
import type { Metadata } from "next";
import { PermissionsView } from "@/features/permissions/components/PermissionsView";

export const metadata: Metadata = {
  title: "القوائم والصلاحيات | الجودي لإدارة مكاتب وشركات المحاماة",
  description:
    "مصفوفة التحكم في ظهور القوائم وإدارة صلاحيات المشرفين والأدوار الوظيفية - منصة الجودي Super Admin",
};

export default function PermissionsPage() {
  return <PermissionsView />;
}
