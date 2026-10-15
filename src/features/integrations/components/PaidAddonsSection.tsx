"use client";

import React, { useState } from "react";
import {
  HardDrive,
  MessageSquare,
  Sparkles,
  Users,
  Check,
  TrendingUp,
  Settings2,
  Building2,
  Coins,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { PaidAddon } from "../types/integrations.types";
import { EditAddonPriceModal } from "./EditAddonPriceModal";

const initialAddons: PaidAddon[] = [
  {
    id: "extra-storage",
    title: "مساحة تخزين سحابية إضافية (100GB)",
    titleEn: "Extra Cloud Storage (100GB)",
    tagline: "مساحة سحابية آمنة ومخصصة لمستندات ودفاتر القضايا",
    taglineEn: "Secure dedicated storage for legal documents & cases",
    description:
      "تتيح لمكاتب المحاماة حفظ ملفات القضايا الكبيرة، التسجيلات الصوتية للجلسات، ودفاتر التحقيق مع سرعة تحميل فائقة وتشفير كامل.",
    descriptionEn:
      "Allows law firms to store large case files, audio hearing records, and investigation materials with high-speed access and encryption.",
    price: 150,
    currency: "ر.س",
    period: "monthly",
    enabled: true,
    activeFirmsCount: 148,
    quotaLabel: "+100 GB سحابي",
    iconName: "storage",
    features: [
      "تشفير بنكي كامل للمستندات (AES-256)",
      "نسخ احتياطي يومي تلقائي متعدد السيرفرات",
      "سرعة تصفح وتحميل دون أي قيود على حجم الملف",
      "إمكانية تصدير أرشيف القضايا بضغطة زر",
    ],
    featuresEn: [
      "Bank-grade document encryption (AES-256)",
      "Automated daily multi-server backups",
      "Unlimited file size download and upload speeds",
      "One-click complete case archive export",
    ],
  },
  {
    id: "whatsapp-reminders",
    title: "باقة رسائل الواتساب التلقائية للموكلين",
    titleEn: "Automated WhatsApp Reminders",
    tagline: "تنبيهات تلقائية لمواعيد الجلسات وتجديد التوكيلات",
    taglineEn: "Automated alerts for court hearings & power of attorney renewals",
    description:
      "إرسال رسائل WhatsApp رسمية تلقائية باسم مكتب المحاماة لتذكير الموكلين بمواعيد الجلسات القادمة، سداد الأتعاب، وتحديثات الأحكام القضائية.",
    descriptionEn:
      "Sends automated branded WhatsApp messages reminding clients of upcoming court hearings, fee dues, and case status updates.",
    price: 200,
    currency: "ر.س",
    period: "monthly",
    enabled: true,
    activeFirmsCount: 215,
    quotaLabel: "1,000 رسالة / شهر",
    iconName: "whatsapp",
    features: [
      "ربط مباشر مع WhatsApp Business API المعتمد",
      "إشعار الموكل تلقائياً قبل الجلسة بـ 24 و 48 ساعة",
      "قوالب رسائل رسمية جاهزة وقابلة للتخصيص الكامل",
      "تقارير تسليم فوري وقراءة الرسائل للمكتب",
    ],
    featuresEn: [
      "Direct verified WhatsApp Business API integration",
      "Auto client reminders 24h & 48h before court",
      "Pre-approved customizable official legal templates",
      "Real-time delivery & read receipts dashboard",
    ],
  },
  {
    id: "ai-legal-assistant",
    title: "المساعد القانوني الذكي (AI Assistant)",
    titleEn: "AI Legal Assistant & Drafting",
    tagline: "محرك ذكاء اصطناعي لصياغة العقود وتلخيص القضايا",
    taglineEn: "AI legal engine for drafting contracts & summarising judgments",
    description:
      "نموذج ذكاء اصطناعي متخصص ومدرب على الأنظمة القضائية واللوائح التنفيذية لصياغة اللوائح الاعتراضية، مراجعة العقود واستخراج الثغرات.",
    descriptionEn:
      "Domain-specific AI model trained on court regulations and laws to draft objection memos, review agreements, and spot legal loopholes.",
    price: 350,
    currency: "ر.س",
    period: "monthly",
    enabled: true,
    activeFirmsCount: 92,
    quotaLabel: "استعلامات غير محدودة",
    iconName: "ai",
    features: [
      "صياغة لوائح الدعاوى وصحائف الاستئناف فورياً",
      "تحليل وتلخيص صكوك الأحكام الطويلة في نقاط موجزة",
      "مقارنة العقود واقتراح التعديلات القانونية الحامية للموكل",
      "بحث ذكي ومباشر في السوابق القضائية والأنظمة",
    ],
    featuresEn: [
      "Instant drafting of claims and appeal memoranda",
      "Deep summarisation of lengthy court verdicts",
      "Contract clause comparison with protective clauses",
      "Direct semantic search across legal precedents",
    ],
  },
  {
    id: "client-portal",
    title: "بوابة خاصة للموكلين (Client Portal)",
    titleEn: "White-label Client Portal",
    tagline: "مساحة رقمية بيضاء الهوية لمتابعة الموكلين لقضاياهم",
    taglineEn: "Branded self-service portal for clients to track cases",
    description:
      "منح موكلي المكتب حساباً خاصاً للدخول والاطلاع على مستندات قضاياهم، مواعيد الجلسات، وسداد الفواتير إلكترونياً دون الحاجة للاتصال المتكرر.",
    descriptionEn:
      "Gives law firm clients a dedicated secure portal to view their active cases, upcoming dates, and pay legal fees online 24/7.",
    price: 250,
    currency: "ر.س",
    period: "monthly",
    enabled: true,
    activeFirmsCount: 110,
    quotaLabel: "عدد موكلين غير محدود",
    iconName: "portal",
    features: [
      "شعار وهوية خاصة بمكتب المحاماة (White-Label)",
      "إمكانية رفع الموكل للمستندات والوكالات بأمان",
      "نظام إشعارات فورية للموكل بكل تطور في القضية",
      "دفع إلكتروني فوري للأتعاب عبر بطاقات مدى وفيزا",
    ],
    featuresEn: [
      "Fully branded with law firm identity & colors",
      "Secure client document upload & e-signatures",
      "Push notifications on each legal stage progression",
      "Integrated online fee payments via Mada/Visa",
    ],
  },
];

export function PaidAddonsSection() {
  const [addons, setAddons] = useState<PaidAddon[]>(initialAddons);
  const [selectedAddon, setSelectedAddon] = useState<PaidAddon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalFirms = addons.reduce((sum, a) => sum + (a.enabled ? a.activeFirmsCount : 0), 0);
  const totalRevenue = addons.reduce(
    (sum, a) => sum + (a.enabled ? a.price * a.activeFirmsCount : 0),
    0
  );

  const handleToggle = (id: string) => {
    setAddons((prev) =>
      prev.map((addon) => {
        if (addon.id === id) {
          const nextState = !addon.enabled;
          toast.success(
            nextState
              ? `تم تفعيل "${addon.title}" وإتاحتها لجميع مكاتب المحاماة.`
              : `تم تعطيل وإخفاء "${addon.title}" من باقات الشراء.`
          );
          return { ...addon, enabled: nextState };
        }
        return addon;
      })
    );
  };

  const handleSaveAddon = (updated: PaidAddon) => {
    setAddons((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  const openEditModal = (addon: PaidAddon) => {
    setSelectedAddon(addon);
    setIsModalOpen(true);
  };

  const getAddonIcon = (iconName: string) => {
    switch (iconName) {
      case "storage":
        return <HardDrive className="w-6 h-6 text-[#c29547] dark:text-[#d4a759]" />;
      case "whatsapp":
        return <MessageSquare className="w-6 h-6 text-[#10b981]" />;
      case "ai":
        return <Sparkles className="w-6 h-6 text-[#c29547] dark:text-[#d4a759]" />;
      case "portal":
      default:
        return <Users className="w-6 h-6 text-[#3b82f6]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Super Admin KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-4 rounded-3xl bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] shadow-xs text-start">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#8c8279] dark:text-[#9e968a]">
              إجمالي باقات الإضافات
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#faf5eb] dark:bg-[#2b2014] border border-[#eeddbb] dark:border-[#523d1d] flex items-center justify-center text-[#c29547] dark:text-[#d4a759]">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#2c2825] dark:text-[#f5f4f0]">
            {addons.length} ميزات إضافية
          </div>
          <span className="text-[11px] font-semibold text-[#16a34a] flex items-center gap-1 mt-1">
            <span>جميعها متاحة للتأجير الشهري للمكاتب</span>
          </span>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-3xl bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] shadow-xs text-start">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#8c8279] dark:text-[#9e968a]">
              الإضافات النشطة المعروضة
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#f0fdf4] dark:bg-[#152e1d] border border-[#bbf7d0] dark:border-[#225832] flex items-center justify-center text-[#16a34a]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#16a34a]">
            {addons.filter((a) => a.enabled).length} ميزات نشطة
          </div>
          <span className="text-[11px] text-[#8c8279] dark:text-[#9e968a] block mt-1">
            جاهزة للشراء من المكاتب حالياً
          </span>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-3xl bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] shadow-xs text-start">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#8c8279] dark:text-[#9e968a]">
              إجمالي مكاتب المحاماة المشتركة
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#faf5eb] dark:bg-[#2b2014] border border-[#eeddbb] dark:border-[#523d1d] flex items-center justify-center text-[#c29547] dark:text-[#d4a759]">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#2c2825] dark:text-[#f5f4f0]">
            {totalFirms} اشتراك مكتب
          </div>
          <span className="text-[11px] font-semibold text-[#c29547] dark:text-[#d4a759] flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>نمو مستمر في ترقيات المكاتب</span>
          </span>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-3xl bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] shadow-xs text-start">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#8c8279] dark:text-[#9e968a]">
              العائد الشهري التراكمي (MRR)
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#faf5eb] dark:bg-[#2b2014] border border-[#eeddbb] dark:border-[#523d1d] flex items-center justify-center text-[#c29547] dark:text-[#d4a759]">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#c29547] dark:text-[#d4a759]">
            {totalRevenue.toLocaleString()} ر.س
          </div>
          <span className="text-[11px] text-[#8c8279] dark:text-[#9e968a] block mt-1">
            إيراد إضافي فوق الباقات الأساسية
          </span>
        </div>
      </div>

      {/* Add-on Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {addons.map((addon) => (
          <div
            key={addon.id}
            className={`rounded-3xl p-6 border transition-all duration-300 relative text-start flex flex-col justify-between ${
              addon.enabled
                ? "bg-white dark:bg-[#1a1714] border-[#ded5c6] dark:border-[#2f2a24] shadow-[0_4px_20px_rgba(80,65,45,0.04)] hover:border-[#c29547] dark:hover:border-[#d4a759]"
                : "bg-[#faf9f7] dark:bg-[#161412] border-dashed border-[#ded5c6] dark:border-[#2b251e] opacity-75"
            }`}
          >
            <div>
              {/* Card Top: Icon, Titles, and Status Pill */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-13 h-13 rounded-2xl bg-[#faf5eb] dark:bg-[#252019] border border-[#eeddbb] dark:border-[#42331f] flex items-center justify-center shrink-0 shadow-xs">
                    {getAddonIcon(addon.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#2c2825] dark:text-[#f5f4f0] leading-snug">
                      {addon.title}
                    </h3>
                    <p className="text-xs text-[#8c8279] dark:text-[#9e968a] mt-0.5">
                      {addon.tagline}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`text-[10px] font-extrabold px-3 py-1 rounded-full border shrink-0 ${
                    addon.enabled
                      ? "bg-[#f0fdf4] dark:bg-[#142e1d] text-[#16a34a] border-[#bbf7d0] dark:border-[#20502f]"
                      : "bg-[#faf5eb] dark:bg-[#201c18] text-[#8c8279] border-[#ded5c6] dark:border-[#382f23]"
                  }`}
                >
                  {addon.enabled ? "مفعل ومتاح" : "معطل ومخفي"}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#524b43] dark:text-[#c4bcb1] leading-relaxed mb-4">
                {addon.description}
              </p>

              {/* Price & Quota Strip */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#faf5eb] dark:bg-[#201c18] border border-[#eeddbb]/80 dark:border-[#382e20] mb-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-[#c29547] dark:text-[#d4a759]">
                    {addon.price} {addon.currency}
                  </span>
                  <span className="text-xs font-semibold text-[#8c8279] dark:text-[#9e968a]">
                    / {addon.period === "monthly" ? "شهرياً" : "سنوياً"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-white dark:bg-[#171513] text-[#2c2825] dark:text-[#f5f4f0] border border-[#eeddbb] dark:border-[#423420] shadow-2xs">
                    {addon.quotaLabel}
                  </span>
                  <span className="text-[11px] font-medium text-[#8c8279] dark:text-[#9e968a]">
                    ({addon.activeFirmsCount} مكتب مشترك)
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2 mb-6">
                <span className="text-xs font-extrabold text-[#2c2825] dark:text-[#e4ded5] block">
                  ما يتضمنه هذا الاشتراك للمكتب:
                </span>
                <ul className="space-y-1.5">
                  {addon.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs text-[#524b43] dark:text-[#aba295]"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#f4ebdc] dark:bg-[#2b2217] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#c29547] dark:text-[#d4a759]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Actions Bottom Strip */}
            <div className="pt-4 border-t border-[#ded5c6]/60 dark:border-[#2f2a24] flex items-center justify-between gap-3">
              {/* Toggle Switch */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleToggle(addon.id)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    addon.enabled
                      ? "bg-[#c29547] dark:bg-[#d4a759] justify-end"
                      : "bg-stone-300 dark:bg-stone-700 justify-start"
                  }`}
                  aria-label="تفعيل أو تعطيل الإضافة"
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
                <span className="text-xs font-bold text-[#524b43] dark:text-[#c4bcb1]">
                  {addon.enabled ? "إتاحة للمكاتب" : "إيقاف الإتاحة"}
                </span>
              </div>

              {/* Edit Price & Config Button */}
              <button
                type="button"
                onClick={() => openEditModal(addon)}
                className="px-4 py-2 rounded-full border border-[#ded5c6] dark:border-[#2f2a24] bg-white dark:bg-[#201d1a] hover:border-[#c29547] dark:hover:border-[#d4a759] text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0] hover:text-[#c29547] dark:hover:text-[#d4a759] flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
              >
                <Settings2 className="w-3.5 h-3.5 text-[#c29547] dark:text-[#d4a759]" />
                <span>تعديل السعر والخيارات</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <EditAddonPriceModal
        addon={selectedAddon}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAddon}
      />
    </div>
  );
}
