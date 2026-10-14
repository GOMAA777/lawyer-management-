"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RotateCcw,
  Home,
  AlertTriangle,
  LogIn,
  ChevronDown,
  Terminal,
} from "lucide-react";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-[#fcfbfa] text-[#1c1917] font-sans antialiased selection:bg-[#f3e3c3] selection:text-[#78541c]">
        <main className="min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden select-none">
          {/* Ambient Luxury Gold Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#c29547]/8 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#c29547]/5 rounded-full blur-[120px] pointer-events-none" />

          {/* Top Header */}
          <header className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between py-3 border-b border-[#ded5c6]/60">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#faf5eb] border border-[#eeddbb] p-1.5 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.png"
                  alt="الجودي"
                  width={34}
                  height={34}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="text-start">
                <span className="text-base font-extrabold text-[#c29547] tracking-tight block">
                  الجودي للتسويق الإلكتروني
                </span>
                <span className="text-[10px] font-medium text-[#8c8279] block">
                  منصة إدارة محادثات وأعمال واتساب
                </span>
              </div>
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-[#ded5c6] bg-white text-[#4a443e] hover:border-[#c29547] hover:text-[#c29547] shadow-2xs transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>تسجيل الدخول</span>
            </Link>
          </header>

          {/* Center Error Section */}
          <div className="relative z-10 w-full max-w-3xl mx-auto my-auto py-10 text-center flex flex-col items-center">
            {/* Radar concentric rings */}
            <div className="relative mb-2 flex items-center justify-center">
              <div className="absolute w-72 sm:w-80 h-72 sm:h-80 rounded-full border border-[#c29547]/15 pointer-events-none" />
              <div className="absolute w-56 sm:w-64 h-56 sm:h-64 rounded-full border border-[#c29547]/20 pointer-events-none" />

              <h1 className="text-8xl sm:text-9xl md:text-[11rem] font-black bg-gradient-to-b from-[#e8bf72] via-[#c29547] to-[#8c6220] bg-clip-text text-transparent tracking-tighter leading-none drop-shadow-xs">
                500
              </h1>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#faf5eb] text-[#c29547] border border-[#eeddbb] shadow-2xs mb-4">
              <AlertTriangle className="w-3.5 h-3.5 text-[#c29547]" />
              <span>خطأ شامل في النظام - تعذر إتمام العملية</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1c1917] tracking-tight mb-3">
              حدث خطأ غير متوقع أثناء تحميل الصفحة!
            </h2>
            <p className="text-xs sm:text-sm text-[#7c7366] max-w-lg leading-relaxed mb-6">
              واجه النظام مشكلة مؤقتة أثناء تهيئة واجهة الموقع. يمكنك الضغط على زر &quot;إعادة المحاولة&quot; أدناه لتحديث الصفحة فوراً.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
              <button
                type="button"
                onClick={() => reset()}
                className="flex-1 min-w-[180px] h-12 rounded-full bg-gradient-to-r from-[#d4a759] via-[#c29547] to-[#b38032] hover:opacity-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(194,149,71,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة المحاولة</span>
              </button>

              <Link
                href="/"
                className="flex-1 min-w-[160px] h-12 rounded-full border border-[#ded5c6] bg-white text-[#2c2825] hover:border-[#c29547] hover:text-[#c29547] font-bold text-sm flex items-center justify-center gap-2 shadow-2xs hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>العودة للرئيسية</span>
              </Link>
            </div>

            {/* Error digest toggle */}
            {error?.digest && (
              <div className="mt-5 w-full max-w-md">
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#8c8279] hover:text-[#c29547] transition-colors cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>معرف الخطأ المرجعي (ID: {error.digest})</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showDetails ? "rotate-180" : ""}`} />
                </button>

                {showDetails && (
                  <div className="mt-2 p-3 rounded-xl bg-white border border-[#ded5c6] text-[11px] font-mono text-[#7c7366] text-start break-all shadow-2xs">
                    <div>Digest: {error.digest}</div>
                    {error.message && <div className="mt-1 text-red-500">Message: {error.message}</div>}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="relative z-10 w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 py-4 border-t border-[#ded5c6]/60 text-xs text-[#8c8279]">
            <span>© 2005-2026 شركة الجودي للتسويق الإلكتروني. جميع الحقوق محفوظة.</span>
            <div className="flex items-center gap-4 text-xs font-medium">
              <Link href="/" className="hover:text-[#c29547] transition-colors">
                الرئيسية
              </Link>
              <Link href="/login" className="hover:text-[#c29547] transition-colors">
                تسجيل الدخول
              </Link>
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}
