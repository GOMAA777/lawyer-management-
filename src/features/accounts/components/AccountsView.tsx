"use client";

import React, { useState } from "react";
import {
  Users,
  ShieldCheck,
  UserPlus,
  Search,
  CheckCircle2,
  XCircle,
  MoreVertical,
  KeyRound,
  Download,
  Mail,
  Building2,
  X,
  Check,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { DashboardTopNavbar } from "@/features/dashboard/components/DashboardTopNavbar";
import { ScalesOfJusticeWatermark } from "@/components/shared/ScalesOfJusticeWatermark";
import { useUIStore } from "@/stores/use-ui-store";

interface AdminAccount {
  id: string;
  name: string;
  nameEn: string;
  email: string;
  role: "super_admin" | "finance_admin" | "support_lead" | "security_auditor";
  roleNameAr: string;
  roleNameEn: string;
  scope: string;
  scopeEn: string;
  status: "active" | "suspended";
  lastLogin: string;
  avatarColor: string;
}

const initialAccounts: AdminAccount[] = [
  {
    id: "acc-1",
    name: "عبد الله المنصور",
    nameEn: "Abdallah Al-Mansoor",
    email: "a.mansoor@eljudy.com",
    role: "super_admin",
    roleNameAr: "سوبر أدمن (صلاحية كاملة)",
    roleNameEn: "Super Admin (Full Access)",
    scope: "كافة المكاتب والأنظمة",
    scopeEn: "All Firms & Systems",
    status: "active",
    lastLogin: "الآن (نشط)",
    avatarColor: "from-[#d4a759] to-[#b38032]",
  },
  {
    id: "acc-2",
    name: "سارة عبد العزيز",
    nameEn: "Sara Abdulaziz",
    email: "s.abdulaziz@eljudy.com",
    role: "finance_admin",
    roleNameAr: "مدير الاشتراكات والمالية",
    roleNameEn: "Billing & Subscriptions Manager",
    scope: "الفوترة، بوابات الدفع، الباقات",
    scopeEn: "Billing, Gateways & Plans",
    status: "active",
    lastLogin: "منذ 15 دقيقة",
    avatarColor: "from-[#d4a759] to-[#b38032]",
  },
  {
    id: "acc-3",
    name: "م. طارق العتيبي",
    nameEn: "Eng. Tariq Al-Otaibi",
    email: "t.otaibi@eljudy.com",
    role: "support_lead",
    roleNameAr: "رئيس الدعم الفني والعمليات",
    roleNameEn: "Support & Operations Lead",
    scope: "تذاكر المكاتب ومتابعة الخوادم",
    scopeEn: "Firm Tickets & Server Monitoring",
    status: "active",
    lastLogin: "منذ ساعتين",
    avatarColor: "from-[#d4a759] to-[#b38032]",
  },
  {
    id: "acc-4",
    name: "د. خالد السليمان",
    nameEn: "Dr. Khaled Al-Sulaiman",
    email: "k.sulaiman@eljudy.com",
    role: "security_auditor",
    roleNameAr: "مدقق الأمان والامتثال القضائي",
    roleNameEn: "Security & Legal Compliance Auditor",
    scope: "سجلات النشاط والنسخ الاحتياطي",
    scopeEn: "Audit Logs & System Backups",
    status: "active",
    lastLogin: "منذ يوم واحد",
    avatarColor: "from-[#d4a759] to-[#b38032]",
  },
  {
    id: "acc-5",
    name: "فهد بن ناصر",
    nameEn: "Fahad Bin Nasser",
    email: "f.nasser@eljudy.com",
    role: "support_lead",
    roleNameAr: "أخصائي دعم فني",
    roleNameEn: "Support Specialist",
    scope: "تذاكر المكاتب والمحادثات",
    scopeEn: "Firm Tickets & Chat",
    status: "suspended",
    lastLogin: "منذ 14 يوماً",
    avatarColor: "from-[#d4a759] to-[#b38032]",
  },
];

export function AccountsView() {
  const language = useUIStore((state) => state.language);
  const isAr = language === "ar";

  const [accounts, setAccounts] = useState<AdminAccount[]>(initialAccounts);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New account form state
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<AdminAccount["role"]>("support_lead");
  const [newScope, setNewScope] = useState("");

  const handleToggleStatus = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === id) {
          const nextStatus = acc.status === "active" ? "suspended" : "active";
          toast.success(
            nextStatus === "active"
              ? isAr
                ? `تم تنشيط حساب ${acc.name}`
                : `Activated account for ${acc.nameEn}`
              : isAr
              ? `تم تعليق حساب ${acc.name}`
              : `Suspended account for ${acc.nameEn}`
          );
          return { ...acc, status: nextStatus };
        }
        return acc;
      })
    );
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const roleMap: Record<AdminAccount["role"], { ar: string; en: string }> = {
      super_admin: { ar: "سوبر أدمن (صلاحية كاملة)", en: "Super Admin" },
      finance_admin: { ar: "مدير الاشتراكات والمالية", en: "Billing Manager" },
      support_lead: { ar: "أخصائي دعم فني", en: "Support Specialist" },
      security_auditor: { ar: "مدقق أمان", en: "Security Auditor" },
    };

    const newAcc: AdminAccount = {
      id: `acc-${Date.now()}`,
      name: newName,
      nameEn: newName,
      email: newEmail,
      role: newRole,
      roleNameAr: roleMap[newRole].ar,
      roleNameEn: roleMap[newRole].en,
      scope: newScope || (isAr ? "صلاحيات قياسية" : "Standard Scope"),
      scopeEn: newScope || "Standard Scope",
      status: "active",
      lastLogin: isAr ? "تم الإنشاء للتو" : "Just created",
      avatarColor: "from-[#d4a759] to-[#b38032]",
    };

    setAccounts([newAcc, ...accounts]);
    toast.success(
      isAr
        ? `تم إنشاء حساب المشرف "${newName}" بنجاح وإرسال بيانات الدخول إلى ${newEmail}`
        : `Admin account "${newName}" created successfully. Login sent to ${newEmail}`
    );
    setIsAddModalOpen(false);
    setNewName("");
    setNewEmail("");
    setNewScope("");
  };

  // Filtered accounts
  const filtered = accounts.filter((acc) => {
    const matchesSearch =
      acc.name.toLowerCase().includes(search.toLowerCase()) ||
      acc.email.toLowerCase().includes(search.toLowerCase()) ||
      acc.roleNameAr.includes(search);
    const matchesRole = roleFilter === "all" || acc.role === roleFilter;
    const matchesStatus = statusFilter === "all" || acc.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalCount = accounts.length;
  const activeCount = accounts.filter((a) => a.status === "active").length;
  const suspendedCount = accounts.filter((a) => a.status === "suspended").length;
  const superCount = accounts.filter((a) => a.role === "super_admin").length;

  return (
    <div className="flex h-screen overflow-hidden bg-[#fcfbfa] dark:bg-[#121110] text-[#1c1917] dark:text-[#f5f4f0] transition-colors duration-200 relative">
      {/* 1. Main Navigation Sidebar */}
      <DashboardSidebar />

      {/* 2. Main Application Body Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        <DashboardTopNavbar />

        {/* Scrollable Workspace */}
        <main className="flex-1 overflow-y-auto scrollbar-thin w-full relative">
          {/* Ambient Scales of Justice Emblems */}
          <div
            className="fixed top-28 -left-28 w-[400px] h-[400px] opacity-[0.035] dark:opacity-[0.045] text-[#c29547] pointer-events-none select-none z-0"
            aria-hidden="true"
          >
            <ScalesOfJusticeWatermark className="w-full h-full" />
          </div>
          <div
            className="fixed top-[520px] -right-28 w-[400px] h-[400px] opacity-[0.035] dark:opacity-[0.045] text-[#c29547] pointer-events-none select-none z-0"
            aria-hidden="true"
          >
            <ScalesOfJusticeWatermark className="w-full h-full" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Header Hero Banner */}
            <div className="relative overflow-hidden rounded-2xl border border-[#eeddbb]/70 dark:border-[#383126] bg-gradient-to-br from-[#ffffff] via-[#fbf8f2] to-[#f4ece0] dark:from-[#1e1b18] dark:via-[#191715] dark:to-[#141210] p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#c29547]/10 dark:bg-[#c29547]/20 text-[#966e2e] dark:text-[#eeddbb] border border-[#c29547]/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>
                      {isAr
                        ? "إدارة الحسابات والتحكم في الوصول • Super Admin"
                        : "Account Management & Access Control"}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1c1917] dark:text-[#f5f4f0]">
                    {isAr ? "إدارة حسابات المشرفين (Accounts)" : "Administrator Accounts"}
                  </h1>

                  <p className="text-sm sm:text-base text-[#6b6357] dark:text-[#a8a196] max-w-2xl leading-relaxed">
                    {isAr
                      ? "التحكم الكامل في حسابات مدراء المنظومة، وتعيين الأدوار الوظيفية، ومتابعة آخر تسجيل دخول، وتفعيل أو تعليق الحسابات."
                      : "Manage system administrators, assign roles, inspect activity logs, and activate or suspend accounts securely."}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      toast.success(
                        isAr
                          ? "تم تصدير سجل حسابات المشرفين بنجاح بصيغة CSV"
                          : "Exported admin accounts report as CSV"
                      );
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#1c1917] dark:text-[#f5f4f0] bg-white dark:bg-[#25221d] border border-[#e2d5c0] dark:border-[#3d372e] shadow-sm hover:border-[#c29547] hover:text-[#c29547] transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#c29547]" />
                    <span>{isAr ? "تصدير التقرير" : "Export"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#c29547] via-[#b38538] to-[#996c25] hover:opacity-95 shadow-md shadow-[#c29547]/20 transition-all cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{isAr ? "إضافة مشرف جديد" : "Add Admin Account"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl border border-[#ded5c6]/70 dark:border-[#2f2a24] bg-white dark:bg-[#1a1714] shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#7c7366] dark:text-[#a8a196]">
                    {isAr ? "إجمالي الحسابات" : "Total Accounts"}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#faf5eb] dark:bg-[#282218] flex items-center justify-center text-[#c29547]">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-[#1c1917] dark:text-[#f5f4f0]">
                  {totalCount}
                </div>
                <div className="text-[11px] text-[#8c8279] mt-1">
                  {isAr ? "حسابات مسجلة بالمنظومة" : "Registered administrators"}
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-[#ded5c6]/70 dark:border-[#2f2a24] bg-white dark:bg-[#1a1714] shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#7c7366] dark:text-[#a8a196]">
                    {isAr ? "الحسابات النشطة" : "Active Accounts"}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                  {activeCount}
                </div>
                <div className="text-[11px] text-emerald-600/80 mt-1">
                  {isAr ? "جاهزة للعمل وتملك حق الوصول" : "Operational & active"}
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-[#ded5c6]/70 dark:border-[#2f2a24] bg-white dark:bg-[#1a1714] shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#7c7366] dark:text-[#a8a196]">
                    {isAr ? "سوبر أدمن (صلاحية كاملة)" : "Super Admins"}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#faf5eb] dark:bg-[#282218] flex items-center justify-center text-[#c29547]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-[#c29547] dark:text-[#d4a759]">
                  {superCount}
                </div>
                <div className="text-[11px] text-[#8c8279] mt-1">
                  {isAr ? "تحكم كامل في السيرفر والإعدادات" : "Full master authority"}
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-[#ded5c6]/70 dark:border-[#2f2a24] bg-white dark:bg-[#1a1714] shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#7c7366] dark:text-[#a8a196]">
                    {isAr ? "الحسابات المعلقة" : "Suspended"}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/40 flex items-center justify-center text-red-600">
                    <XCircle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-red-600 dark:text-red-400">
                  {suspendedCount}
                </div>
                <div className="text-[11px] text-red-500/80 mt-1">
                  {isAr ? "تم إيقاف صلاحيات الدخول مؤقتاً" : "Access temporarily blocked"}
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 rounded-2xl border border-[#ded5c6] dark:border-[#2f2a24] bg-white dark:bg-[#1a1714] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute start-3.5 top-1/2 -translate-y-1/2 text-[#8c8279]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={
                    isAr
                      ? "ابحث بالاسم، البريد الإلكتروني، أو الدور الوظيفي..."
                      : "Search by name, email, or role..."
                  }
                  className="w-full h-10.5 ps-10 pe-4 rounded-xl bg-[#faf8f4] dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] text-xs font-medium text-[#1c1917] dark:text-[#f5f4f0] focus:outline-none focus:border-[#c29547]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="h-10.5 px-3 rounded-xl bg-[#faf8f4] dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] text-xs font-semibold text-[#1c1917] dark:text-[#f5f4f0] focus:outline-none focus:border-[#c29547]"
                >
                  <option value="all">{isAr ? "كل الرتب والأدوار" : "All Roles"}</option>
                  <option value="super_admin">{isAr ? "سوبر أدمن" : "Super Admin"}</option>
                  <option value="finance_admin">{isAr ? "المالية والاشتراكات" : "Finance Admin"}</option>
                  <option value="support_lead">{isAr ? "الدعم الفني" : "Support Lead"}</option>
                  <option value="security_auditor">{isAr ? "مدقق الأمان" : "Security Auditor"}</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10.5 px-3 rounded-xl bg-[#faf8f4] dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] text-xs font-semibold text-[#1c1917] dark:text-[#f5f4f0] focus:outline-none focus:border-[#c29547]"
                >
                  <option value="all">{isAr ? "كل الحالات" : "All Status"}</option>
                  <option value="active">{isAr ? "الحسابات النشطة" : "Active"}</option>
                  <option value="suspended">{isAr ? "الحسابات المعلقة" : "Suspended"}</option>
                </select>
              </div>
            </div>

            {/* Accounts Data Table */}
            <div className="rounded-2xl border border-[#ded5c6] dark:border-[#2f2a24] bg-white dark:bg-[#1a1714] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#ded5c6] dark:border-[#2f2a24] bg-[#faf8f4] dark:bg-[#201d1a] text-[#7c7366] dark:text-[#a8a196]">
                      <th className="py-3.5 px-4 text-start font-bold">
                        {isAr ? "المشرف" : "Administrator"}
                      </th>
                      <th className="py-3.5 px-4 text-start font-bold">
                        {isAr ? "الرتبة والدور" : "Role"}
                      </th>
                      <th className="py-3.5 px-4 text-start font-bold">
                        {isAr ? "نطاق الصلاحيات المسندة" : "Access Scope"}
                      </th>
                      <th className="py-3.5 px-4 text-start font-bold">
                        {isAr ? "الحالة" : "Status"}
                      </th>
                      <th className="py-3.5 px-4 text-start font-bold">
                        {isAr ? "آخر تسجيل دخول" : "Last Login"}
                      </th>
                      <th className="py-3.5 px-4 text-center font-bold">
                        {isAr ? "الإجراءات" : "Actions"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ded5c6]/60 dark:divide-[#2f2a24]/60">
                    {filtered.map((acc) => (
                      <tr
                        key={acc.id}
                        className="hover:bg-[#faf5eb]/50 dark:hover:bg-[#201d1a]/50 transition-colors"
                      >
                        {/* Admin Name & Avatar */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-full bg-gradient-to-tr ${acc.avatarColor} text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0`}
                            >
                              {acc.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-[#1c1917] dark:text-[#f5f4f0]">
                                {isAr ? acc.name : acc.nameEn}
                              </div>
                              <div className="text-[11px] text-[#8c8279] flex items-center gap-1 font-mono">
                                <Mail className="w-3 h-3 text-[#c29547]" />
                                <span>{acc.email}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Role Badge - Unified to the first user's luxury gold aesthetic */}
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#c29547]/15 text-[#966e2e] dark:text-[#eeddbb] border border-[#c29547]/30 shadow-2xs">
                            <ShieldCheck className="w-3 h-3 text-[#c29547] shrink-0" />
                            <span>{isAr ? acc.roleNameAr : acc.roleNameEn}</span>
                          </span>
                        </td>

                        {/* Scope */}
                        <td className="py-4 px-4 text-[#524b43] dark:text-[#c4bcb1]">
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-[#8c8279] shrink-0" />
                            <span>{isAr ? acc.scope : acc.scopeEn}</span>
                          </div>
                        </td>

                        {/* Status Switch */}
                        <td className="py-4 px-4">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(acc.id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                              acc.status === "active"
                                ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200"
                                : "bg-red-100 dark:bg-red-950/50 text-red-800 dark:text-red-300 hover:bg-red-200"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                acc.status === "active" ? "bg-emerald-500" : "bg-red-500"
                              }`}
                            />
                            <span>
                              {acc.status === "active"
                                ? isAr
                                  ? "نشط ومفعل"
                                  : "Active"
                                : isAr
                                ? "معلق ومحظور"
                                : "Suspended"}
                            </span>
                          </button>
                        </td>

                        {/* Last Login */}
                        <td className="py-4 px-4 font-mono text-[11px] text-[#7c7366] dark:text-[#a8a196]">
                          {acc.lastLogin}
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                toast.info(
                                  isAr
                                    ? `تم إرسال رابط إعادة تعيين كلمة المرور إلى ${acc.email}`
                                    : `Password reset link sent to ${acc.email}`
                                );
                              }}
                              title={isAr ? "إعادة تعيين كلمة المرور" : "Reset Password"}
                              className="p-1.5 rounded-lg text-[#8c8279] hover:text-[#c29547] hover:bg-[#faf5eb] dark:hover:bg-[#201d1a] transition-colors cursor-pointer"
                            >
                              <KeyRound className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                toast.info(
                                  isAr
                                    ? `نافذة تعديل صلاحيات ${acc.name} - قيد التطوير`
                                    : `Edit permissions for ${acc.name}`
                                );
                              }}
                              className="p-1.5 rounded-lg text-[#8c8279] hover:text-[#1c1917] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add New Admin Account Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden text-start">
            <div className="flex items-center justify-between p-5 border-b border-[#ded5c6]/60 dark:border-[#2f2a24] bg-[#faf5eb] dark:bg-[#201c17]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#fff7e6] dark:bg-[#2b2014] border border-[#eeddbb] dark:border-[#604218] flex items-center justify-center text-[#c29547] dark:text-[#d4a759]">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-[#2c2825] dark:text-[#f5f4f0]">
                    {isAr ? "إضافة حساب مشرف جديد" : "Create New Admin Account"}
                  </h2>
                  <p className="text-xs text-[#8c8279] dark:text-[#9e968a]">
                    {isAr
                      ? "إنشاء حساب بصلاحيات مخصصة للتحكم في المنظومة"
                      : "Provision administrative credentials"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full text-[#8c8279] hover:text-[#2c2825] dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAccount} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2c2825] dark:text-[#e4ded5] mb-1.5">
                  {isAr ? "اسم المشرف بالكامل" : "Full Name"}
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={isAr ? "مثال: عبد العزيز الشمري" : "e.g. John Doe"}
                  className="w-full h-11 rounded-2xl px-3.5 bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0] focus:outline-none focus:border-[#c29547]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2c2825] dark:text-[#e4ded5] mb-1.5">
                  {isAr ? "البريد الإلكتروني الرسمي" : "Official Email"}
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="admin@eljudy.com"
                  className="w-full h-11 rounded-2xl px-3.5 bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] text-xs font-mono text-[#2c2825] dark:text-[#f5f4f0] focus:outline-none focus:border-[#c29547]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2c2825] dark:text-[#e4ded5] mb-1.5">
                  {isAr ? "الرتبة الإدارية (Role)" : "Administrative Role"}
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as AdminAccount["role"])}
                  className="w-full h-11 rounded-2xl px-3.5 bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0] focus:outline-none focus:border-[#c29547]"
                >
                  <option value="super_admin">{isAr ? "سوبر أدمن (تحكم كامل)" : "Super Admin"}</option>
                  <option value="finance_admin">{isAr ? "مدير الاشتراكات والمالية" : "Finance Admin"}</option>
                  <option value="support_lead">{isAr ? "أخصائي دعم فني وتشغيل" : "Support Lead"}</option>
                  <option value="security_auditor">{isAr ? "مدقق الأمان والأنظمة" : "Security Auditor"}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2c2825] dark:text-[#e4ded5] mb-1.5">
                  {isAr ? "نطاق الصلاحيات المسندة (Scope)" : "Access Scope"}
                </label>
                <input
                  type="text"
                  value={newScope}
                  onChange={(e) => setNewScope(e.target.value)}
                  placeholder={isAr ? "مثال: مكاتب منطقة الرياض والشرقية" : "e.g. All Law Firms"}
                  className="w-full h-11 rounded-2xl px-3.5 bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] text-xs font-medium text-[#2c2825] dark:text-[#f5f4f0] focus:outline-none focus:border-[#c29547]"
                />
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#faf5eb] dark:bg-[#221e1a] border border-[#eeddbb]/80 dark:border-[#4d3a1f] text-xs text-[#8c8279] dark:text-[#aba295]">
                <Lock className="w-4 h-4 text-[#c29547] shrink-0" />
                <span>
                  {isAr
                    ? "سيتم إنشاء كلمة مرور عشوائية وتشفيرها، وإرسال رابط التفعيل إلى بريد المشرف."
                    : "A random encrypted temporary password will be dispatched to the admin's email."}
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#ded5c6]/40 dark:border-[#2f2a24]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-full text-xs font-bold text-[#524b43] dark:text-[#c4bcb1] hover:bg-stone-100 dark:hover:bg-[#25201b] transition-colors cursor-pointer"
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4a759] via-[#c29547] to-[#b38032] hover:opacity-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_16px_rgba(194,149,71,0.3)] transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{isAr ? "إنشاء وتفعيل الحساب" : "Create Account"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
