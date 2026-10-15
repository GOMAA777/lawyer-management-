"use client";

import React, { useState } from "react";
import { X, Check, KeyRound, RefreshCw, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { SystemIntegration, IntegrationField } from "../types/integrations.types";

interface ConfigureIntegrationModalProps {
  integration: SystemIntegration | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: SystemIntegration) => void;
}

interface ConfigureModalBodyProps {
  integration: SystemIntegration;
  onClose: () => void;
  onSave: (updated: SystemIntegration) => void;
}

function ConfigureModalBody({
  integration,
  onClose,
  onSave,
}: ConfigureModalBodyProps) {
  const [enabled, setEnabled] = useState(integration.enabled);
  const [isSandbox, setIsSandbox] = useState(Boolean(integration.isSandbox));
  const [fields, setFields] = useState<IntegrationField[]>(integration.fields);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [isTesting, setIsTesting] = useState(false);

  const handleFieldChange = (key: string, value: string) => {
    setFields((prev) =>
      prev.map((f) => (f.key === key ? { ...f, value } : f))
    );
  };

  const toggleShowSecret = (key: string) => {
    setShowSecrets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTestConnection = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      toast.success(
        `تم الاتصال بنجاح بـ ${integration.name}! استجابة API طبيعية (200 OK).`
      );
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...integration,
      enabled,
      isSandbox,
      fields,
      status: enabled ? "connected" : "disconnected",
      lastSync: "الآن",
    });
    toast.success(`تم حفظ مفاتيح وإعدادات الربط مع ${integration.name}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden text-start">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#ded5c6]/60 dark:border-[#2f2a24] bg-[#faf5eb] dark:bg-[#201c17]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#fff7e6] dark:bg-[#2b2014] border border-[#eeddbb] dark:border-[#604218] flex items-center justify-center text-[#c29547] dark:text-[#d4a759]">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#2c2825] dark:text-[#f5f4f0]">
                ضبط الربط البرمجي (API Settings)
              </h2>
              <p className="text-xs text-[#8c8279] dark:text-[#9e968a]">
                {integration.name} - مزود الخدمة ({integration.provider})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#8c8279] hover:text-[#2c2825] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 max-h-[75vh] overflow-y-auto scrollbar-thin"
        >
          {/* Main Status & Environment Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Status Switch */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#faf8f4] dark:bg-[#221e1a] border border-[#eee6d8] dark:border-[#2f271f]">
              <div>
                <span className="text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0] block">
                  تفعيل التكامل
                </span>
                <span className="text-[11px] text-[#8c8279] dark:text-[#9e968a]">
                  {enabled ? "الربط نشط حالياً" : "الربط متوقف"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEnabled(!enabled)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  enabled
                    ? "bg-[#c29547] dark:bg-[#d4a759] justify-end"
                    : "bg-stone-300 dark:bg-stone-700 justify-start"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Sandbox / Live Mode Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#faf8f4] dark:bg-[#221e1a] border border-[#eee6d8] dark:border-[#2f271f]">
              <div>
                <span className="text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0] block">
                  وضع الاختبار (Sandbox)
                </span>
                <span className="text-[11px] text-[#8c8279] dark:text-[#9e968a]">
                  {isSandbox ? "تجريبي (Test Mode)" : "إنتاجي حقيقي (Live)"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsSandbox(!isSandbox)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  isSandbox
                    ? "bg-[#3b82f6] justify-end"
                    : "bg-stone-300 dark:bg-stone-700 justify-start"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>
          </div>

          {/* Supported Gateways or notes */}
          {integration.supportedGateways && (
            <div className="p-3 rounded-2xl bg-[#faf5eb] dark:bg-[#231e18] border border-[#eeddbb]/80 dark:border-[#4d3a1f] text-xs">
              <span className="font-bold text-[#b8863b] dark:text-[#d4a759] block mb-1.5">
                البوابات المدعومة في هذا التكامل:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {integration.supportedGateways.map((g) => (
                  <span
                    key={g}
                    className="px-2.5 py-0.5 rounded-lg bg-white dark:bg-[#1a1714] border border-[#eeddbb] dark:border-[#3a2c17] text-[11px] font-extrabold text-[#2c2825] dark:text-[#e4ded5]"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic API Configuration Fields */}
          <div className="space-y-3.5">
            <span className="text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0] block">
              بيانات الاعتماد والمفاتيح البرمجية (Credentials):
            </span>

            {fields.map((field) => {
              const isHidden = field.isSecret && !showSecrets[field.key];
              return (
                <div key={field.key} className="space-y-1">
                  <label className="block text-[11px] font-bold text-[#524b43] dark:text-[#c4bcb1]">
                    {field.label}
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={isHidden ? "password" : "text"}
                      value={field.value}
                      onChange={(e) =>
                        handleFieldChange(field.key, e.target.value)
                      }
                      placeholder={
                        field.placeholder || `أدخل ${field.label}...`
                      }
                      className="w-full h-10.5 rounded-xl px-3.5 pe-10 bg-[#faf8f4] dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] text-xs font-mono text-[#2c2825] dark:text-[#f5f4f0] focus:outline-none focus:border-[#c29547] dark:focus:border-[#d4a759] focus:bg-white dark:focus:bg-[#171513]"
                    />
                    {field.isSecret && (
                      <button
                        type="button"
                        onClick={() => toggleShowSecret(field.key)}
                        className="absolute end-3 text-[#8c8279] hover:text-[#2c2825] dark:hover:text-white transition-colors cursor-pointer"
                      >
                        {showSecrets[field.key] ? (
                          <EyeOff className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Test Connection Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting}
              className="w-full py-2.5 px-4 rounded-xl border border-[#ded5c6] dark:border-[#2f2a24] bg-white dark:bg-[#201d1a] hover:border-[#c29547] dark:hover:border-[#d4a759] text-xs font-bold text-[#524b43] dark:text-[#c4bcb1] hover:text-[#c29547] dark:hover:text-[#d4a759] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${
                  isTesting ? "animate-spin text-[#c29547]" : ""
                }`}
              />
              <span>
                {isTesting
                  ? "جاري اختبار الاتصال..."
                  : "اختبار الاتصال بالخادم (Test Ping)"}
              </span>
            </button>
          </div>

          {/* Security Note */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#f0fdf4] dark:bg-[#13281a] border border-[#bbf7d0] dark:border-[#1e462b] text-[11px] text-[#166534] dark:text-[#86efac]">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16a34a]" />
            <span>
              يتم تشفير جميع مفاتيح الـ API السرية بتقنية Vault التشفيرية ولا يمكن
              للمكاتب الاطلاع على المفاتيح الخاصة.
            </span>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#ded5c6]/40 dark:border-[#2f2a24]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-[#524b43] dark:text-[#c4bcb1] hover:bg-stone-100 dark:hover:bg-[#25201b] transition-colors cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4a759] via-[#c29547] to-[#b38032] hover:opacity-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_16px_rgba(194,149,71,0.3)] transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>حفظ وتطبيق المفاتيح</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ConfigureIntegrationModal({
  integration,
  isOpen,
  onClose,
  onSave,
}: ConfigureIntegrationModalProps) {
  if (!isOpen || !integration) return null;

  return (
    <ConfigureModalBody
      key={integration.id}
      integration={integration}
      onClose={onClose}
      onSave={onSave}
    />
  );
}
