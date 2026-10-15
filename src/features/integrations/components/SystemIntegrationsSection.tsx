"use client";

import React, { useState } from "react";
import {
  Calendar,
  CreditCard,
  Cloud,
  MessageSquare,
  CheckCircle2,
  RefreshCw,
  KeyRound,
  Sliders,
} from "lucide-react";
import { toast } from "sonner";
import { SystemIntegration } from "../types/integrations.types";
import { ConfigureIntegrationModal } from "./ConfigureIntegrationModal";

const initialIntegrations: SystemIntegration[] = [
  {
    id: "google-calendar",
    name: "الربط مع تقويم جوجل (Google Calendar API)",
    nameEn: "Google Calendar Sync",
    provider: "Google Cloud Platform",
    category: "calendar",
    description:
      "مزامنة أوتوماتيكية ثنائية الاتجاه لجميع مواعيد الجلسات القضائية، لقاءات الموكلين، والمواعيد النهائية مع تقويم Google ومساعد Google على هواتف المحامين.",
    descriptionEn:
      "Two-way synchronization for hearing schedules, client consultations, and statutory deadlines with Google Calendar across lawyers' devices.",
    iconName: "calendar",
    enabled: true,
    status: "connected",
    lastSync: "منذ 3 دقائق",
    isSandbox: false,
    fields: [
      { key: "clientId", label: "Client ID (Google OAuth 2.0)", value: "81942183921-prod.apps.googleusercontent.com" },
      { key: "clientSecret", label: "Client Secret", value: "GOCSPX-LawPlatformSecretKey998", isSecret: true },
      { key: "syncInterval", label: "فترة التحديث التلقائي (بالدقائق)", value: "15" },
      { key: "redirectUri", label: "Redirect URI", value: "https://lawyer.eljudy.com/api/auth/callback/google" },
    ],
  },
  {
    id: "payment-gateways",
    name: "بوابات الدفع الإلكتروني المعتمدة",
    nameEn: "Online Payment Gateways",
    provider: "Stripe, Paymob, Fawry, Moyasar",
    category: "payment",
    description:
      "تحصيل أتعاب المحاماة والاشتراكات السحابية فورياً عبر بوابات الدفع الإقليمية والعالمية (بطاقات مدى، فيزا، ماستركارد، سداد، وApple Pay).",
    descriptionEn:
      "Collect legal fees and subscription renewals instantly through regional & global gateways (Mada, Visa, MC, Sadad, Apple Pay).",
    iconName: "payment",
    enabled: true,
    status: "connected",
    lastSync: "منذ دقيقة واحدة",
    isSandbox: false,
    supportedGateways: ["Stripe", "Paymob", "Fawry", "Moyasar", "Mada", "Apple Pay"],
    fields: [
      { key: "stripePublishable", label: "Stripe Publishable Key", value: "pk_live_51M0...92bV" },
      { key: "stripeSecret", label: "Stripe Secret Key", value: "sk_live_51M0...92bVSecretPass", isSecret: true },
      { key: "moyasarApiKey", label: "Moyasar Live Secret Key", value: "sk_live_moya_9182310239", isSecret: true },
      { key: "paymobApiKey", label: "Paymob API Key", value: "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJ...", isSecret: true },
      { key: "webhookSecret", label: "Webhook Signing Secret", value: "whsec_89218302194820", isSecret: true },
    ],
  },
  {
    id: "cloud-storage",
    name: "خدمات التخزين السحابي (AWS S3 & Google Drive)",
    nameEn: "Cloud Storage Integration (AWS S3 / Google Drive)",
    provider: "Amazon Web Services & Google Cloud",
    category: "storage",
    description:
      "حفظ وتشفير ملفات القضايا الضخمة والنسخ الاحتياطية الدورية في مستودعات AWS S3 Bucket أو Google Drive الخاصة بمكاتب المحاماة بأمان فائق.",
    descriptionEn:
      "Store and encrypt massive case archives and routine system backups on isolated AWS S3 Buckets or firm-owned Google Drive stores.",
    iconName: "storage",
    enabled: true,
    status: "connected",
    lastSync: "منذ 10 دقائق",
    isSandbox: false,
    fields: [
      { key: "awsBucket", label: "AWS S3 Bucket Name", value: "eljudy-law-saas-documents-prod" },
      { key: "awsRegion", label: "AWS Region", value: "me-central-1 (Riyadh)" },
      { key: "awsAccessKey", label: "AWS Access Key ID", value: "AKIA9812401829304" },
      { key: "awsSecretKey", label: "AWS Secret Access Key", value: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY", isSecret: true },
      { key: "encryptionAlgorithm", label: "معيار التشفير", value: "aws:kms (SSE-KMS AES-256)" },
    ],
  },
  {
    id: "messaging-api",
    name: "خدمات الرسائل النصية والواتساب (Twilio / WhatsApp Business)",
    nameEn: "Messaging & WhatsApp Cloud API",
    provider: "Meta WhatsApp Cloud API & Twilio",
    category: "messaging",
    description:
      "تزويد النظام بقنوات الاتصال المباشرة لإرسال كود التحقق OTP، تنبيهات الجلسات للمحامين والموكلين، وفواتير السداد تلقائياً عبر WhatsApp و SMS.",
    descriptionEn:
      "Powers real-time OTP authentication, hearing alerts to attorneys and clients, and auto invoices over official WhatsApp and SMS.",
    iconName: "messaging",
    enabled: true,
    status: "connected",
    lastSync: "الآن (متصل)",
    isSandbox: false,
    fields: [
      { key: "waPhoneNumberId", label: "WhatsApp Phone Number ID", value: "109284102948210" },
      { key: "waBusinessAccountId", label: "WhatsApp Business Account (WABA ID)", value: "291840192830192" },
      { key: "waSystemToken", label: "Meta System User Permanent Token", value: "EAAK91204...PermanentTokenMeta", isSecret: true },
      { key: "twilioAccountSid", label: "Twilio Account SID", value: "AC918401928401928401928" },
      { key: "twilioAuthToken", label: "Twilio Auth Token", value: "39b1840294820194820192840", isSecret: true },
    ],
  },
];

export function SystemIntegrationsSection() {
  const [integrations, setIntegrations] = useState<SystemIntegration[]>(initialIntegrations);
  const [selectedIntegration, setSelectedIntegration] = useState<SystemIntegration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testingId, setTestingId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.enabled;
          toast.success(
            nextState
              ? `تم تفعيل الربط مع ${item.name} بنجاح.`
              : `تم إيقاف الربط مع ${item.name}.`
          );
          return {
            ...item,
            enabled: nextState,
            status: nextState ? "connected" : "disconnected",
          };
        }
        return item;
      })
    );
  };

  const handleSaveIntegration = (updated: SystemIntegration) => {
    setIntegrations((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
  };

  const openConfigModal = (integration: SystemIntegration) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
  };

  const handleTestConnection = (id: string, name: string) => {
    setTestingId(id);
    setTimeout(() => {
      setTestingId(null);
      toast.success(`اختبار اتصال ناجح! استجابة الـ API لخدمة "${name}" تعمل بكفاءة 100%.`);
    }, 1100);
  };

  const getIntegrationIcon = (category: string) => {
    switch (category) {
      case "calendar":
        return <Calendar className="w-6 h-6 text-[#3b82f6]" />;
      case "payment":
        return <CreditCard className="w-6 h-6 text-[#c29547] dark:text-[#d4a759]" />;
      case "storage":
        return <Cloud className="w-6 h-6 text-[#8b5cf6]" />;
      case "messaging":
      default:
        return <MessageSquare className="w-6 h-6 text-[#10b981]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* System Health Top Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-[#faf5eb] via-white to-[#f5eedf] dark:from-[#201c17] dark:via-[#1a1714] dark:to-[#221c15] border border-[#eeddbb] dark:border-[#382b18] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 text-start">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#f0fdf4] dark:bg-[#142e1d] border border-[#bbf7d0] dark:border-[#225832] flex items-center justify-center text-[#16a34a] shrink-0 shadow-xs">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-[#2c2825] dark:text-[#f5f4f0]">
                حالة الربط البرمجي العام (System Health)
              </h3>
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            </div>
            <p className="text-xs text-[#8c8279] dark:text-[#9e968a] mt-0.5">
              جميع بوابات الـ Webhooks والـ API Keys تعمل بسلام وبمعدل استجابة 99.98%
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs shrink-0">
          <div className="text-center px-4 py-1.5 rounded-2xl bg-white/80 dark:bg-[#171513]/80 border border-[#ded5c6]/60 dark:border-[#2f2a24]">
            <span className="text-[10px] text-[#8c8279] dark:text-[#9e968a] block">
              الخدمات الموصولة
            </span>
            <span className="text-sm font-black text-[#16a34a]">
              {integrations.filter((i) => i.enabled).length} من أصل {integrations.length}
            </span>
          </div>
          <div className="text-center px-4 py-1.5 rounded-2xl bg-white/80 dark:bg-[#171513]/80 border border-[#ded5c6]/60 dark:border-[#2f2a24]">
            <span className="text-[10px] text-[#8c8279] dark:text-[#9e968a] block">
              زمن الاستجابة
            </span>
            <span className="text-sm font-black text-[#c29547] dark:text-[#d4a759]">
              ~180ms
            </span>
          </div>
        </div>
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations.map((item) => (
          <div
            key={item.id}
            className={`rounded-3xl p-6 border transition-all duration-300 text-start flex flex-col justify-between ${
              item.enabled
                ? "bg-white dark:bg-[#1a1714] border-[#ded5c6] dark:border-[#2f2a24] shadow-[0_4px_20px_rgba(80,65,45,0.04)] hover:border-[#c29547] dark:hover:border-[#d4a759]"
                : "bg-[#faf9f7] dark:bg-[#161412] border-dashed border-[#ded5c6] dark:border-[#2b251e] opacity-75"
            }`}
          >
            <div>
              {/* Header: Icon, Name & Status Badge */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-13 h-13 rounded-2xl bg-[#faf5eb] dark:bg-[#252019] border border-[#eeddbb] dark:border-[#42331f] flex items-center justify-center shrink-0 shadow-xs">
                    {getIntegrationIcon(item.category)}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#2c2825] dark:text-[#f5f4f0] leading-snug">
                      {item.name}
                    </h3>
                    <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#faf5eb] dark:bg-[#2b2014] text-[#c29547] dark:text-[#d4a759] border border-[#eeddbb] dark:border-[#5a3f1d] mt-1">
                      {item.provider}
                    </span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex flex-col items-end shrink-0 gap-1">
                  <span
                    className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${
                      item.enabled
                        ? "bg-[#f0fdf4] dark:bg-[#142e1d] text-[#16a34a] border-[#bbf7d0] dark:border-[#20502f]"
                        : "bg-[#faf5eb] dark:bg-[#201c18] text-[#8c8279] border-[#ded5c6] dark:border-[#382f23]"
                    }`}
                  >
                    {item.enabled ? "متصل ونشط" : "غير مفعل"}
                  </span>
                  <span className="text-[10px] text-[#8c8279] dark:text-[#9e968a]">
                    آخر فحص: {item.lastSync}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#524b43] dark:text-[#c4bcb1] leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Supported Badges / Scope */}
              {item.supportedGateways && (
                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                  <span className="text-[11px] font-bold text-[#8c8279] dark:text-[#9e968a] me-1">
                    الوسائل المدعومة:
                  </span>
                  {item.supportedGateways.map((g) => (
                    <span
                      key={g}
                      className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#faf5eb] dark:bg-[#201d19] border border-[#eeddbb]/70 dark:border-[#3d2f1b] text-[#2c2825] dark:text-[#e4ded5]"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              )}

              {/* Configured Keys Preview Box */}
              <div className="p-3.5 rounded-2xl bg-[#faf5eb]/80 dark:bg-[#201c18] border border-[#eeddbb]/80 dark:border-[#382e20] space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#2c2825] dark:text-[#f5f4f0] flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-[#c29547]" />
                    <span>مفاتيح الـ API المضبوطة:</span>
                  </span>
                  <span className="text-[10px] font-semibold text-[#16a34a]">
                    {item.isSandbox ? "بيئة تجريبية (Sandbox)" : "بيئة حقيقية (Live)"}
                  </span>
                </div>

                <div className="space-y-1">
                  {item.fields.slice(0, 2).map((field) => (
                    <div
                      key={field.key}
                      className="flex items-center justify-between text-[11px] font-mono text-[#786e63] dark:text-[#aba295] bg-white/70 dark:bg-[#171513]/70 px-2.5 py-1.5 rounded-xl border border-[#ded5c6]/50 dark:border-[#2f2a24]"
                    >
                      <span className="font-bold font-sans text-[#2c2825] dark:text-[#ded5c6]">
                        {field.label}:
                      </span>
                      <span>
                        {field.isSecret
                          ? "••••••••••••••••••••"
                          : field.value.length > 28
                          ? `${field.value.slice(0, 28)}...`
                          : field.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#ded5c6]/60 dark:border-[#2f2a24] flex items-center justify-between gap-3">
              {/* Toggle Switch */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    item.enabled
                      ? "bg-[#c29547] dark:bg-[#d4a759] justify-end"
                      : "bg-stone-300 dark:bg-stone-700 justify-start"
                  }`}
                  aria-label="تفعيل أو إيقاف التكامل"
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
                <span className="text-xs font-bold text-[#524b43] dark:text-[#c4bcb1]">
                  {item.enabled ? "الربط مفعّل" : "الربط معطّل"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleTestConnection(item.id, item.name)}
                  disabled={testingId === item.id || !item.enabled}
                  className="px-3 py-2 rounded-full border border-[#ded5c6] dark:border-[#2f2a24] bg-white dark:bg-[#201d1a] hover:border-[#c29547] dark:hover:border-[#d4a759] text-xs font-bold text-[#524b43] dark:text-[#c4bcb1] hover:text-[#c29547] dark:hover:text-[#d4a759] flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  title="اختبار الاتصال السريع"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${testingId === item.id ? "animate-spin text-[#c29547]" : ""}`}
                  />
                  <span className="hidden sm:inline">اختبار</span>
                </button>

                <button
                  type="button"
                  onClick={() => openConfigModal(item)}
                  className="px-4 py-2 rounded-full border border-[#ded5c6] dark:border-[#2f2a24] bg-white dark:bg-[#201d1a] hover:border-[#c29547] dark:hover:border-[#d4a759] text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0] hover:text-[#c29547] dark:hover:text-[#d4a759] flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#c29547] dark:text-[#d4a759]" />
                  <span>ضبط المفاتيح والربط</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Configure Modal */}
      <ConfigureIntegrationModal
        integration={selectedIntegration}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveIntegration}
      />
    </div>
  );
}
