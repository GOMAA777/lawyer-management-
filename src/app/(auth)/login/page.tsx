import React from "react";
import type { Metadata } from "next";
import { AuthSideVisual } from "@/features/auth/components/AuthSideVisual";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "تسجيل الدخول | شركة الجودي للتسويق الإلكتروني",
  description: "تسجيل الدخول إلى لوحة التحكم - منصة الجودي لإدارة حملات الواتساب والأتمتة السحابية",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-[#0d0c0b] text-[#1c1917] dark:text-[#f5f4f0] flex items-center justify-center p-3 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Ambient Luxury Gold Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c29547]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#c29547]/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Split-Screen Auth Card */}
      <div className="relative z-10 w-full max-w-6xl min-h-[660px] lg:h-[730px] rounded-[36px] sm:rounded-[44px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-[0_30px_90px_rgba(0,0,0,0.85)] border border-[#2f2a24] bg-[#151311]">
        {/* Visual Brand Showcase Column */}
        <div className="lg:col-span-5 h-full hidden lg:block overflow-hidden">
          <AuthSideVisual />
        </div>

        {/* Interactive Sign In Form Column */}
        <div className="lg:col-span-7 h-full lg:rounded-s-[44px] overflow-hidden shadow-[-10px_0_30px_rgba(0,0,0,0.3)]">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
