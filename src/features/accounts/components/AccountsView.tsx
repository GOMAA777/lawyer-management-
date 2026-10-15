"use client";

import React, { useState, useEffect } from "react";
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
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit3,
  Trash2,
  Shield,
  Unlock,
} from "lucide-react";
import { toast } from "sonner";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { DashboardTopNavbar } from "@/features/dashboard/components/DashboardTopNavbar";
import { ScalesOfJusticeWatermark } from "@/components/shared/ScalesOfJusticeWatermark";
import { LuxurySelect, SelectOption } from "@/components/shared/LuxurySelect";
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
  {
    id: "acc-6",
    name: "ريم الهذلي",
    nameEn: "Reem Al-Hothali",
    email: "r.hothali@eljudy.com",
    role: "finance_admin",
    roleNameAr: "مدير الاشتراكات والمالية",
    roleNameEn: "Billing & Subscriptions Manager",
    scope: "الفوترة والباقات السحابية",
    scopeEn: "Billing & Cloud Packages",
    status: "active",
    lastLogin: "منذ 3 ساعات",
    avatarColor: "from-[#d4a759] to-[#b38032]",
  },
  {
    id: "acc-7",
    name: "عمر القحطاني",
    nameEn: "Omar Al-Qahtani",
    email: "o.qahtani@eljudy.com",
    role: "support_lead",
    roleNameAr: "أخصائي دعم فني",
    roleNameEn: "Support Specialist",
    scope: "تذاكر المكاتب والمحادثات",
    scopeEn: "Firm Tickets & Chat",
    status: "active",
    lastLogin: "منذ 5 ساعات",
    avatarColor: "from-[#d4a759] to-[#b38032]",
  },
  {
    id: "acc-8",
    name: "نورة الشهري",
    nameEn: "Noura Al-Shehri",
    email: "n.shehri@eljudy.com",
    role: "security_auditor",
    roleNameAr: "مدقق الأمان والأنظمة",
    roleNameEn: "Security & Systems Auditor",
    scope: "سجلات الدخول ومراجعة الصلاحيات",
    scopeEn: "Audit Logs & Permission Reviews",
    status: "suspended",
    lastLogin: "منذ أسبوع",
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([]);
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

  // New account form state
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<AdminAccount["role"]>("support_lead");
  const [newScope, setNewScope] = useState("");

  const hasActiveFilters = Boolean(
    search.trim() !== "" || roleFilter !== "all" || statusFilter !== "all"
  );

  const handleResetFilters = () => {
    setSearch("");
    setRoleFilter("all");
    setStatusFilter("all");
    setCurrentPage(1);
    toast.info(isAr ? "تمت إعادة ضبط وتفريغ كل الفلاتر" : "All filters reset");
  };

  // Close action menu on click outside
  useEffect(() => {
    function handleActionClickOutside(event: MouseEvent) {
      if (
        openActionMenuId &&
        !(event.target as HTMLElement).closest(".action-menu-container")
      ) {
        setOpenActionMenuId(null);
      }
    }

    if (openActionMenuId) {
      document.addEventListener("mousedown", handleActionClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleActionClickOutside);
    };
  }, [openActionMenuId]);

  const handleBulkActivate = () => {
    const count = selectedAccountIds.length;
    setAccounts((prev) =>
      prev.map((acc) =>
        selectedAccountIds.includes(acc.id) ? { ...acc, status: "active" } : acc
      )
    );
    toast.success(
      isAr
        ? `تم تفعيل ${count} حساب بنجاح`
        : `Activated ${count} accounts`
    );
    setSelectedAccountIds([]);
  };

  const handleBulkSuspend = () => {
    const count = selectedAccountIds.length;
    setAccounts((prev) =>
      prev.map((acc) =>
        selectedAccountIds.includes(acc.id)
          ? { ...acc, status: "suspended" }
          : acc
      )
    );
    toast.success(
      isAr
        ? `تم إلغاء تفعيل وتعليق ${count} حساب بنجاح`
        : `Deactivated ${count} accounts`
    );
    setSelectedAccountIds([]);
  };

  const handleBulkDelete = () => {
    const count = selectedAccountIds.length;
    if (count === 0) return;
    setAccounts((prev) =>
      prev.filter((acc) => !selectedAccountIds.includes(acc.id))
    );
    toast.success(
      isAr
        ? `تم مسح وحذف ${count} من حسابات المشرفين المحددة بنجاح`
        : `Deleted ${count} selected accounts successfully`
    );
    setSelectedAccountIds([]);
  };

  const handleDeleteAccount = (id: string, name: string) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
    setSelectedAccountIds((prev) => prev.filter((item) => item !== id));
    setOpenActionMenuId(null);
    toast.success(
      isAr
        ? `تم حذف حساب المشرف "${name}" بنجاح`
        : `Admin account "${name}" deleted`
    );
  };

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

  const totalFiltered = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const activePage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (activePage - 1) * pageSize;
  const paginatedAccounts = filtered.slice(startIndex, startIndex + pageSize);
  const fromIndex = totalFiltered === 0 ? 0 : startIndex + 1;
  const toIndex = Math.min(startIndex + pageSize, totalFiltered);

  const isAllSelected =
    paginatedAccounts.length > 0 &&
    paginatedAccounts.every((acc) => selectedAccountIds.includes(acc.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      const pageIds = new Set(paginatedAccounts.map((a) => a.id));
      setSelectedAccountIds((prev) => prev.filter((id) => !pageIds.has(id)));
    } else {
      const newIds = new Set([
        ...selectedAccountIds,
        ...paginatedAccounts.map((a) => a.id),
      ]);
      setSelectedAccountIds(Array.from(newIds));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedAccountIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalCount = accounts.length;
  const activeCount = accounts.filter((a) => a.status === "active").length;
  const suspendedCount = accounts.filter((a) => a.status === "suspended").length;
  const superCount = accounts.filter((a) => a.role === "super_admin").length;

  // Combobox Options
  const roleOptions: SelectOption<string>[] = [
    { value: "all", label: isAr ? "كل الرتب والأدوار" : "All Roles" },
    { value: "super_admin", label: isAr ? "سوبر أدمن" : "Super Admin" },
    { value: "finance_admin", label: isAr ? "المالية والاشتراكات" : "Finance Admin" },
    { value: "support_lead", label: isAr ? "الدعم الفني" : "Support Lead" },
    { value: "security_auditor", label: isAr ? "مدقق الأمان" : "Security Auditor" },
  ];

  const statusOptions: SelectOption<string>[] = [
    { value: "all", label: isAr ? "كل الحالات" : "All Status" },
    { value: "active", label: isAr ? "الحسابات النشطة" : "Active" },
    { value: "suspended", label: isAr ? "الحسابات المعلقة" : "Suspended" },
  ];

  const pageSizeOptions: SelectOption<number>[] = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
  ];

  const newRoleOptions: SelectOption<AdminAccount["role"]>[] = [
    { value: "super_admin", label: isAr ? "سوبر أدمن (تحكم كامل)" : "Super Admin" },
    { value: "finance_admin", label: isAr ? "مدير الاشتراكات والمالية" : "Finance Admin" },
    { value: "support_lead", label: isAr ? "أخصائي دعم فني وتشغيل" : "Support Lead" },
    { value: "security_auditor", label: isAr ? "مدقق الأمان والأنظمة" : "Security Auditor" },
  ];

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
                  <div className="w-8 h-8 rounded-lg bg-[#faf5eb] dark:bg-[#282218] flex items-center justify-center text-[#c29547]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-[#1c1917] dark:text-[#f5f4f0]">
                  {activeCount}
                </div>
                <div className="text-[11px] text-[#8c8279] mt-1">
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
                <div className="text-2xl font-black text-[#1c1917] dark:text-[#f5f4f0]">
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
                  <div className="w-8 h-8 rounded-lg bg-[#faf5eb] dark:bg-[#282218] flex items-center justify-center text-[#c29547]">
                    <XCircle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-[#1c1917] dark:text-[#f5f4f0]">
                  {suspendedCount}
                </div>
                <div className="text-[11px] text-[#8c8279] mt-1">
                  {isAr ? "تم إيقاف صلاحيات الدخول مؤقتاً" : "Access temporarily blocked"}
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 rounded-2xl border border-[#ded5c6] dark:border-[#2f2a24] bg-white dark:bg-[#1a1714] shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-3">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 absolute start-3.5 top-1/2 -translate-y-1/2 text-[#8c8279]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={
                    isAr
                      ? "ابحث بالاسم، البريد، أو الدور..."
                      : "Search by name, email, or role..."
                  }
                  className="w-full h-10.5 ps-10 pe-9 rounded-xl bg-[#faf8f4] dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] text-xs font-medium text-[#1c1917] dark:text-[#f5f4f0] focus:outline-none focus:border-[#c29547]"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setCurrentPage(1);
                    }}
                    title={isAr ? "مسح البحث" : "Clear search"}
                    className="absolute end-2.5 top-1/2 -translate-y-1/2 p-1 text-[#8c8279] hover:text-[#1c1917] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <LuxurySelect
                  value={roleFilter}
                  onChange={(val) => {
                    setRoleFilter(val);
                    setCurrentPage(1);
                  }}
                  options={roleOptions}
                  minWidth="min-w-[170px]"
                />

                <LuxurySelect
                  value={statusFilter}
                  onChange={(val) => {
                    setStatusFilter(val);
                    setCurrentPage(1);
                  }}
                  options={statusOptions}
                  minWidth="min-w-[150px]"
                />

                <button
                  type="button"
                  onClick={handleResetFilters}
                  title={isAr ? "إعادة ضبط وتفريغ كل الفلاتر" : "Reset all filters"}
                  className={`h-10.5 px-3.5 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                    hasActiveFilters
                      ? "bg-[#faf5eb] dark:bg-[#282218] border-[#eeddbb] dark:border-[#4d3a1f] text-[#966e2e] dark:text-[#eeddbb] hover:border-[#c29547] shadow-2xs"
                      : "bg-[#faf8f4] dark:bg-[#201d1a] border-[#ded5c6] dark:border-[#2f2a24] text-[#7c7366] dark:text-[#a8a196] hover:border-[#c29547] hover:text-[#c29547]"
                  }`}
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${hasActiveFilters ? "text-[#c29547]" : "text-[#8c8279]"}`} />
                  <span>{isAr ? "إعادة ضبط" : "Reset Filters"}</span>
                </button>
              </div>
            </div>

            {/* Bulk Actions Notification Bar */}
            {selectedAccountIds.length > 0 && (
              <div className="p-3.5 px-4 rounded-2xl border border-[#c29547]/40 bg-[#faf5eb] dark:bg-[#201c17] flex flex-wrap items-center justify-between gap-3 shadow-xs animate-in fade-in duration-200">
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold text-[#966e2e] dark:text-[#eeddbb]">
                  <span className="w-6 h-6 rounded-lg bg-[#c29547] text-white flex items-center justify-center text-xs shadow-2xs font-mono">
                    {selectedAccountIds.length}
                  </span>
                  <span>
                    {isAr
                      ? `تم تحديد ${selectedAccountIds.length} من حسابات المشرفين`
                      : `${selectedAccountIds.length} accounts selected`}
                  </span>
                  {selectedAccountIds.length < filtered.length && (
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedAccountIds(filtered.map((a) => a.id))
                      }
                      className="text-xs text-[#c29547] hover:text-[#966e2e] underline cursor-pointer font-bold"
                    >
                      {isAr
                        ? `(تحديد كافة الـ ${filtered.length} حساب)`
                        : `(Select all ${filtered.length})`}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {/* زر التفعيل */}
                  <button
                    type="button"
                    onClick={handleBulkActivate}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors cursor-pointer shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{isAr ? "تفعيل المحددة" : "Activate"}</span>
                  </button>

                  {/* زر إلغاء التفعيل / التعليق */}
                  <button
                    type="button"
                    onClick={handleBulkSuspend}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-xs font-bold hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                    <span>{isAr ? "إلغاء تفعيل المحددة" : "Deactivate"}</span>
                  </button>

                  {/* زر المسح / الحذف */}
                  <button
                    type="button"
                    onClick={handleBulkDelete}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 text-white border border-rose-700 hover:bg-rose-700 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{isAr ? "مسح وحذف المحددة" : "Delete"}</span>
                  </button>

                  {/* زر إلغاء التحديد */}
                  <button
                    type="button"
                    onClick={() => setSelectedAccountIds([])}
                    className="px-3 py-1.5 rounded-xl border border-[#ded5c6] dark:border-[#2f2a24] text-xs font-bold text-[#7c7366] dark:text-[#a8a196] hover:bg-white dark:hover:bg-[#282218] transition-colors cursor-pointer"
                  >
                    {isAr ? "إلغاء التحديد" : "Deselect"}
                  </button>
                </div>
              </div>
            )}

            {/* Accounts Data Table */}
            <div className="rounded-2xl border border-[#ded5c6] dark:border-[#2f2a24] bg-white dark:bg-[#1a1714] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#ded5c6] dark:border-[#2f2a24] bg-[#faf8f4] dark:bg-[#201d1a] text-[#7c7366] dark:text-[#a8a196]">
                      <th className="py-3.5 px-4 w-11 text-center">
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          onChange={handleSelectAll}
                          title={isAr ? "تحديد كل الصفحة" : "Select all on page"}
                          className="w-4 h-4 rounded-md border-[#ded5c6] dark:border-[#382b18] text-[#c29547] accent-[#c29547] focus:ring-0 focus:outline-none cursor-pointer align-middle"
                        />
                      </th>
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
                    {paginatedAccounts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-[#8c8279]">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Users className="w-8 h-8 text-[#c29547]/50" />
                            <p className="font-bold text-sm text-[#2c2825] dark:text-[#eeddbb]">
                              {isAr ? "لم يتم العثور على أي حسابات" : "No administrator accounts found"}
                            </p>
                            <p className="text-xs">
                              {isAr
                                ? "جرّب تغيير عبارة البحث أو إعادة ضبط الفلاتر المحددة"
                                : "Try adjusting search terms or resetting active filters"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginatedAccounts.map((acc) => (
                      <tr
                        key={acc.id}
                        className={`transition-colors ${
                          selectedAccountIds.includes(acc.id)
                            ? "bg-[#faf5eb]/90 dark:bg-[#282218]/50"
                            : "hover:bg-[#faf5eb]/50 dark:hover:bg-[#201d1a]/50"
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-4 px-4 w-11 text-center">
                          <input
                            type="checkbox"
                            checked={selectedAccountIds.includes(acc.id)}
                            onChange={() => handleToggleSelect(acc.id)}
                            className="w-4 h-4 rounded-md border-[#ded5c6] dark:border-[#382b18] text-[#c29547] accent-[#c29547] focus:ring-0 focus:outline-none cursor-pointer align-middle"
                          />
                        </td>
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

                        {/* Status Switch (Green for active, Red for suspended) */}
                        <td className="py-4 px-4">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(acc.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all border ${
                              acc.status === "active"
                                ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-300/80 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 shadow-2xs"
                                : "bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-300/80 dark:border-rose-800/60 hover:bg-rose-100 dark:hover:bg-rose-900/40 shadow-2xs"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                acc.status === "active" ? "bg-emerald-500" : "bg-rose-500"
                              }`}
                            />
                            <span>
                              {acc.status === "active"
                                ? isAr
                                  ? "نشط"
                                  : "Active"
                                : isAr
                                ? "معلق"
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
                          <div className="flex items-center justify-center gap-1.5 relative action-menu-container">
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
                              onClick={() =>
                                setOpenActionMenuId((prev) =>
                                  prev === acc.id ? null : acc.id
                                )
                              }
                              title={isAr ? "خيارات الحساب" : "Account options"}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                openActionMenuId === acc.id
                                  ? "bg-[#faf5eb] dark:bg-[#282218] text-[#c29547]"
                                  : "text-[#8c8279] hover:text-[#1c1917] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                              }`}
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {/* Dropdown Action Popover Menu */}
                            {openActionMenuId === acc.id && (
                              <div
                                className="absolute end-0 top-full mt-1.5 z-50 w-56 rounded-2xl border border-[#eeddbb] dark:border-[#382b18] bg-white dark:bg-[#1a1714] p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.6)] backdrop-blur-md animate-in fade-in-0 zoom-in-95 duration-150 text-start"
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenActionMenuId(null);
                                    toast.info(
                                      isAr
                                        ? `نافذة تعديل بيانات ${acc.name} - قيد التطوير`
                                        : `Edit details for ${acc.name}`
                                    );
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#2c2825] dark:text-[#f5f4f0] hover:bg-[#faf5eb] dark:hover:bg-[#282218] hover:text-[#c29547] transition-colors cursor-pointer"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-[#c29547]" />
                                  <span>{isAr ? "تعديل البيانات" : "Edit Profile"}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenActionMenuId(null);
                                    toast.info(
                                      isAr
                                        ? `إدارة صلاحيات ${acc.name} في تاب الصلاحيات`
                                        : `Manage permissions for ${acc.name}`
                                    );
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#2c2825] dark:text-[#f5f4f0] hover:bg-[#faf5eb] dark:hover:bg-[#282218] hover:text-[#c29547] transition-colors cursor-pointer"
                                >
                                  <Shield className="w-3.5 h-3.5 text-[#c29547]" />
                                  <span>{isAr ? "تعديل الصلاحيات" : "Permissions"}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    handleToggleStatus(acc.id);
                                    setOpenActionMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#2c2825] dark:text-[#f5f4f0] hover:bg-[#faf5eb] dark:hover:bg-[#282218] hover:text-[#c29547] transition-colors cursor-pointer"
                                >
                                  {acc.status === "active" ? (
                                    <>
                                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                                      <span>{isAr ? "تعليق الحساب مؤقتاً" : "Suspend Account"}</span>
                                    </>
                                  ) : (
                                    <>
                                      <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>{isAr ? "تنشيط وتفعيل الحساب" : "Activate Account"}</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenActionMenuId(null);
                                    toast.success(
                                      isAr
                                        ? `تم إرسال رابط إعادة التعيين إلى ${acc.email}`
                                        : `Password reset dispatched to ${acc.email}`
                                    );
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#2c2825] dark:text-[#f5f4f0] hover:bg-[#faf5eb] dark:hover:bg-[#282218] hover:text-[#c29547] transition-colors cursor-pointer"
                                >
                                  <KeyRound className="w-3.5 h-3.5 text-[#c29547]" />
                                  <span>{isAr ? "إعادة تعيين كلمة المرور" : "Reset Password"}</span>
                                </button>

                                <div className="my-1 border-t border-[#ded5c6]/60 dark:border-[#2f2a24]" />

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteAccount(acc.id, isAr ? acc.name : acc.nameEn)
                                  }
                                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>{isAr ? "حذف الحساب نهائياً" : "Delete Account"}</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Bar */}
              <div className="p-4 border-t border-[#ded5c6] dark:border-[#2f2a24] bg-[#faf8f4]/60 dark:bg-[#1a1714] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                {/* Left: Rows per page & range summary */}
                <div className="flex flex-wrap items-center gap-4 text-[#7c7366] dark:text-[#a8a196]">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{isAr ? "صفوف لكل صفحة:" : "Rows per page:"}</span>
                    <LuxurySelect<number>
                      value={pageSize}
                      onChange={(val) => {
                        setPageSize(val);
                        setCurrentPage(1);
                      }}
                      options={pageSizeOptions}
                      placement="top"
                      compact={true}
                      minWidth="min-w-[70px]"
                      className="w-18"
                    />
                  </div>
                  <span className="text-[#ded5c6] dark:text-[#2f2a24] hidden sm:inline">|</span>
                  <span className="font-medium">
                    {isAr
                      ? `عرض ${fromIndex} إلى ${toIndex} من أصل ${totalFiltered} حساب`
                      : `Showing ${fromIndex} to ${toIndex} of ${totalFiltered} accounts`}
                  </span>
                </div>

                {/* Right: Page navigation controls in LTR order (1, 2, 3) */}
                <div dir="ltr" className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCurrentPage(1)}
                    disabled={activePage === 1}
                    title={isAr ? "الصفحة الأولى" : "First page"}
                    className="w-8 h-8 rounded-lg border border-[#ded5c6] dark:border-[#2f2a24] bg-white dark:bg-[#201d1a] text-[#524b43] dark:text-[#c4bcb1] hover:border-[#c29547] hover:text-[#c29547] disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={activePage === 1}
                    title={isAr ? "الصفحة السابقة" : "Previous page"}
                    className="w-8 h-8 rounded-lg border border-[#ded5c6] dark:border-[#2f2a24] bg-white dark:bg-[#201d1a] text-[#524b43] dark:text-[#c4bcb1] hover:border-[#c29547] hover:text-[#c29547] disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Page numbers (LTR 1, 2, 3...) */}
                  <div className="flex items-center gap-1 px-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`min-w-8 h-8 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          pageNum === activePage
                            ? "bg-gradient-to-r from-[#d4a759] to-[#b38032] text-white shadow-2xs"
                            : "border border-[#ded5c6] dark:border-[#2f2a24] bg-white dark:bg-[#201d1a] text-[#524b43] dark:text-[#c4bcb1] hover:border-[#c29547] hover:text-[#c29547]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={activePage === totalPages}
                    title={isAr ? "الصفحة التالية" : "Next page"}
                    className="w-8 h-8 rounded-lg border border-[#ded5c6] dark:border-[#2f2a24] bg-white dark:bg-[#201d1a] text-[#524b43] dark:text-[#c4bcb1] hover:border-[#c29547] hover:text-[#c29547] disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={activePage === totalPages}
                    title={isAr ? "الصفحة الأخيرة" : "Last page"}
                    className="w-8 h-8 rounded-lg border border-[#ded5c6] dark:border-[#2f2a24] bg-white dark:bg-[#201d1a] text-[#524b43] dark:text-[#c4bcb1] hover:border-[#c29547] hover:text-[#c29547] disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                </div>
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
                <LuxurySelect<AdminAccount["role"]>
                  value={newRole}
                  onChange={(val) => setNewRole(val)}
                  options={newRoleOptions}
                  className="w-full"
                  minWidth="w-full"
                />
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
