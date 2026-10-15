import React from "react";
import type { Metadata } from "next";
import { MenusView } from "@/features/menus/components/MenusView";

export const metadata: Metadata = {
  title: "إدارة القوائم والتنقل | الجودي لإدارة مكاتب وشركات المحاماة",
  description:
    "لوحة التحكم في شجرة القوائم، تنظيم التابات والروابط الفرعية، وضبط شارات التنبيه - منصة الجودي Super Admin",
};

export default function MenusPage() {
  return <MenusView />;
}
