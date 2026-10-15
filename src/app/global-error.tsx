"use client";

import React from "react";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-[#fcfbfa] text-[#1c1917] font-sans antialiased selection:bg-[#f3e3c3] selection:text-[#78541c]">
        <main className="min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden select-none">
          {/* Ambient Luxury Gold Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#c29547]/8 rounded-full blur-[140px] pointer-events-none" />

          {/* Top Header */}
          <header className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between py-3 border-b border-[#ded5c6]/60">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#faf5eb] border border-[#eeddbb] p-1.5 flex items-center justify-center shadow-xs">
                <img
                  src="/logo.png"
                  alt="الجودي"
                  width={34}
                  height={34}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-start">
                <span className="text-base font-extrabold text-[#c29547] tracking-tight block">
                  الجودي
                </span>
                <span className="text-[10px] font-medium text-[#8c8279] block">
                  منظومة إدارة المحاماة والاستشارات القانونية
                </span>
              </div>
            </a>
          </header>

          {/* Center Error Section */}
          <div className="relative z-10 w-full max-w-3xl mx-auto my-auto py-10 text-center flex flex-col items-center">
            <h1 className="text-8xl sm:text-9xl font-black bg-gradient-to-b from-[#e8bf72] via-[#c29547] to-[#8c6220] bg-clip-text text-transparent tracking-tighter leading-none mb-4">
              500
            </h1>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1917] tracking-tight mb-3">
              حدث خطأ غير متوقع أثناء تحميل الصفحة
            </h2>
            <p className="text-xs sm:text-sm text-[#7c7366] max-w-lg leading-relaxed mb-6">
              واجه النظام مشكلة مؤقتة أثناء تهيئة واجهة الموقع. يمكنك الضغط على زر إعادة المحاولة أدناه لتحديث الصفحة فوراً.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
              <button
                type="button"
                onClick={() => reset()}
                className="flex-1 min-w-[160px] h-12 rounded-full bg-gradient-to-r from-[#d4a759] via-[#c29547] to-[#b38032] hover:opacity-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(194,149,71,0.35)] cursor-pointer"
              >
                <span>إعادة المحاولة</span>
              </button>
              <a
                href="/"
                className="flex-1 min-w-[160px] h-12 rounded-full border border-[#ded5c6] bg-white text-[#2c2825] hover:border-[#c29547] hover:text-[#c29547] font-bold text-sm flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
              >
                <span>العودة للرئيسية</span>
              </a>
            </div>

            {error?.digest && (
              <div className="mt-5 p-3 rounded-xl bg-white border border-[#ded5c6] text-[11px] font-mono text-[#7c7366] text-start break-all shadow-2xs w-full max-w-md">
                Digest: {error.digest}
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between py-4 border-t border-[#ded5c6]/60 text-xs text-[#8c8279]">
            <span>© 2005-2026 شركة الجودي للحلول القانونية. جميع الحقوق محفوظة.</span>
            <a href="/" className="hover:text-[#c29547] transition-colors">
              الرئيسية
            </a>
          </footer>
        </main>
      </body>
    </html>
  );
}
