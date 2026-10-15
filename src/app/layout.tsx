import { Suspense } from "react";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "لوحة التحكم - الجودي لإدارة مكاتب وشركات المحاماة",
  description: "المنصة السحابية المتكاملة لإدارة مكاتب المحاماة، القضايا، الجلسات، والموكلين - الجودي",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cn(cairo.variable, "font-sans")}>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-[#f3e3c3] selection:text-[#78541c]">
        <Suspense fallback={null}>
          <NuqsAdapter>
            {children}
            <Toaster richColors position="top-left" />
          </NuqsAdapter>
        </Suspense>
      </body>
    </html>
  );
}
