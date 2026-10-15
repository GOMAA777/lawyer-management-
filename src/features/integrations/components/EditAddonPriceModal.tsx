"use client";

import React, { useState } from "react";
import { X, Check, DollarSign, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { PaidAddon } from "../types/integrations.types";

interface EditAddonPriceModalProps {
  addon: PaidAddon | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: PaidAddon) => void;
}

interface EditAddonModalBodyProps {
  addon: PaidAddon;
  onClose: () => void;
  onSave: (updated: PaidAddon) => void;
}

function EditAddonModalBody({
  addon,
  onClose,
  onSave,
}: EditAddonModalBodyProps) {
  const [price, setPrice] = useState(addon.price);
  const [currency, setCurrency] = useState(addon.currency);
  const [enabled, setEnabled] = useState(addon.enabled);
  const [period, setPeriod] = useState(addon.period);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...addon,
      price,
      currency,
      enabled,
      period,
    });
    toast.success(`تم حفظ تسعير وإعدادات "${addon.title}" بنجاح!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden text-start">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#ded5c6]/60 dark:border-[#2f2a24] bg-[#faf5eb] dark:bg-[#201c17]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#fff7e6] dark:bg-[#2b2014] border border-[#eeddbb] dark:border-[#604218] flex items-center justify-center text-[#c29547] dark:text-[#d4a759]">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#2c2825] dark:text-[#f5f4f0]">
                تعديل سعر وإعدادات الإضافة
              </h2>
              <p className="text-xs text-[#8c8279] dark:text-[#9e968a]">
                {addon.title}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Status Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#faf8f4] dark:bg-[#221e1a] border border-[#eee6d8] dark:border-[#2f271f]">
            <div>
              <span className="text-sm font-bold text-[#2c2825] dark:text-[#f5f4f0] block">
                حالة الإضافة لمكاتب المحاماة
              </span>
              <span className="text-xs text-[#8c8279] dark:text-[#9e968a]">
                {enabled
                  ? "مفعلة وتظهر في لوحة طلبات المكاتب"
                  : "معطلة ومخفية عن المكاتب"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setEnabled(!enabled)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                enabled
                  ? "bg-[#c29547] dark:bg-[#d4a759] justify-end"
                  : "bg-stone-300 dark:bg-stone-700 justify-start"
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
            </button>
          </div>

          {/* Price & Currency Input Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#2c2825] dark:text-[#e4ded5] mb-1.5">
                قيمة الاشتراك
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="5"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-11 rounded-2xl px-3.5 bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] text-[#2c2825] dark:text-[#f5f4f0] text-sm font-bold focus:outline-none focus:border-[#c29547] dark:focus:border-[#d4a759]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2c2825] dark:text-[#e4ded5] mb-1.5">
                العملة
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full h-11 rounded-2xl px-3.5 bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] text-[#2c2825] dark:text-[#f5f4f0] text-sm font-bold focus:outline-none focus:border-[#c29547] dark:focus:border-[#d4a759]"
              >
                <option value="ر.س">ر.س (ريال سعودي)</option>
                <option value="د.إ">د.إ (درهم إماراتي)</option>
                <option value="ج.م">ج.م (جنيه مصري)</option>
                <option value="USD">USD (دولار أمريكي)</option>
              </select>
            </div>
          </div>

          {/* Billing Period */}
          <div>
            <label className="block text-xs font-bold text-[#2c2825] dark:text-[#e4ded5] mb-1.5">
              دورة الفوترة
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPeriod("monthly")}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  period === "monthly"
                    ? "bg-[#faf5eb] dark:bg-[#2b2014] text-[#c29547] dark:text-[#d4a759] border-[#eeddbb] dark:border-[#604218]"
                    : "bg-white dark:bg-[#201d1a] text-[#8c8279] border-[#ded5c6] dark:border-[#2f2a24]"
                }`}
              >
                شهرياً (Monthly)
              </button>
              <button
                type="button"
                onClick={() => setPeriod("annual")}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  period === "annual"
                    ? "bg-[#faf5eb] dark:bg-[#2b2014] text-[#c29547] dark:text-[#d4a759] border-[#eeddbb] dark:border-[#604218]"
                    : "bg-white dark:bg-[#201d1a] text-[#8c8279] border-[#ded5c6] dark:border-[#2f2a24]"
                }`}
              >
                سنوياً (Annual)
              </button>
            </div>
          </div>

          {/* Active Firms Info */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#faf5eb]/70 dark:bg-[#241f19] text-xs text-[#8c8279] dark:text-[#aba295]">
            <ShieldCheck className="w-4 h-4 text-[#c29547] shrink-0" />
            <span>
              عدد المكاتب المشتركة حالياً في هذه الإضافة:{" "}
              <strong className="text-[#2c2825] dark:text-white font-extrabold">
                {addon.activeFirmsCount} مكتب
              </strong>
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
              <span>حفظ التعديلات</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function EditAddonPriceModal({
  addon,
  isOpen,
  onClose,
  onSave,
}: EditAddonPriceModalProps) {
  if (!isOpen || !addon) return null;

  return (
    <EditAddonModalBody
      key={addon.id}
      addon={addon}
      onClose={onClose}
      onSave={onSave}
    />
  );
}
