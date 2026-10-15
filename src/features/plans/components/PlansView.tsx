"use client";

import React, { useState } from "react";
import {
  Layers,
  Plus,
  Search,
  CheckCircle2,
  CreditCard,
  Sparkles,
  Edit3,
  Trash2,
  X,
  FileText,
  Users,
  HardDrive,
  Building,
  Scale,
  Check,
  RotateCcw,
  Sliders,
  DollarSign,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { DashboardTopNavbar } from "@/features/dashboard/components/DashboardTopNavbar";
import { ScalesOfJusticeWatermark } from "@/components/shared/ScalesOfJusticeWatermark";
import { LuxurySelect, SelectOption } from "@/components/shared/LuxurySelect";
import { LuxuryCheckbox } from "@/components/shared/LuxuryCheckbox";
import { LuxuryAlertDialog } from "@/components/shared/LuxuryAlertDialog";
import { useUIStore } from "@/stores/use-ui-store";

export interface PlanFeature {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  included: boolean;
}

export interface PlanLimits {
  cases: number; // -1 for unlimited
  lawyers: number; // -1 for unlimited
  storageGb: number; // -1 for unlimited
  branches: number; // -1 for unlimited
  contracts: number; // -1 for unlimited
}

export interface PricingPlan {
  id: string;
  name: string;
  nameEn: string;
  tagline: string;
  description: string;
  badge?: string;
  monthlyPrice: number;
  annualPrice: number;
  isActive: boolean;
  isPopular?: boolean;
  activeFirmsCount: number;
  limits: PlanLimits;
  features: PlanFeature[];
}

const defaultFeaturesList: Omit<PlanFeature, "included">[] = [
  {
    id: "f-ai",
    name: "مساعد الذكاء الاصطناعي لصياغة اللوائح القانونية وتلخيص الأحكام",
    nameEn: "AI Legal Assistant for drafting pleadings & case summaries",
    description: "توليد مذكرات الدفاع وتحليل نصوص الدعاوى آلياً",
  },
  {
    id: "f-zatca",
    name: "الربط مع الفوترة الإلكترونية المعتمدة (هيئة الزكاة والضريبة - زاتكا)",
    nameEn: "ZATCA compliant e-invoicing Phase 2 integration",
    description: "إصدار الفواتير الضريبية وتوليد رمز QR المعتمد",
  },
  {
    id: "f-najiz",
    name: "الربط التقني مع منصة ناجز وبوابة مسار وتنبيهات الجلسات",
    nameEn: "Najiz & Masar court sessions sync and instant SMS alerts",
    description: "مزامنة مواعيد الجلسات والطلبات القضائية بصورة دورية",
  },
  {
    id: "f-payment",
    name: "بوابة دفع إلكتروني مخصصة لموكلي المكتب (مدى، فيزا، ماستركارد)",
    nameEn: "Dedicated online payment gateway for firm clients",
    description: "تحصيل أتعاب القضايا والاستشارات مباشرة عبر رابط آمن",
  },
  {
    id: "f-mobile",
    name: "تطبيق الجوال الذكي للمحامين والموكلين (iOS & Android)",
    nameEn: "Dedicated Mobile app for lawyers and clients",
    description: "متابعة القضايا والاطلاع على التحديثات في أي وقت ومن أي مكان",
  },
  {
    id: "f-analytics",
    name: "لوحة تحليلات مالية وتقارير أداء المحامين ومؤشرات الربحية",
    nameEn: "Advanced financial analytics & lawyer performance reports",
    description: "تقارير تدفقات نقدية ونسب كسب القضايا لكل محامٍ",
  },
  {
    id: "f-custom-domain",
    name: "نطاق وهوية بصرية مخصصة لمكتب المحاماة (Custom Branding)",
    nameEn: "Custom domain and firm branding on client portal",
    description: "استخدام رابط خاص وشعار وألوان المكتب في بوابة الموكلين",
  },
  {
    id: "f-vip-support",
    name: "دعم فني مخصص وخط ساخن 24/7 مع مدير حساب خاص",
    nameEn: "24/7 Priority VIP support with dedicated account manager",
    description: "أولوية قصوى لحل البلاغات وتدريب كوادر المكتب مجاناً",
  },
];

const initialPlans: PricingPlan[] = [
  {
    id: "plan-solo",
    name: "باقة المحامي الفردي",
    nameEn: "Solo Practitioner Plan",
    tagline: "مثالية للمحامي المستقل الذي يبدأ نشاطه القانوني",
    description: "جميع الأدوات الأساسية لإدارة القضايا والموكلين وإصدار الفواتير بسهولة.",
    monthlyPrice: 299,
    annualPrice: 2990,
    isActive: true,
    isPopular: false,
    activeFirmsCount: 84,
    limits: {
      cases: 40,
      lawyers: 2,
      storageGb: 10,
      branches: 1,
      contracts: 50,
    },
    features: [
      { ...defaultFeaturesList[0], included: false },
      { ...defaultFeaturesList[1], included: true },
      { ...defaultFeaturesList[2], included: true },
      { ...defaultFeaturesList[3], included: false },
      { ...defaultFeaturesList[4], included: false },
      { ...defaultFeaturesList[5], included: false },
      { ...defaultFeaturesList[6], included: false },
      { ...defaultFeaturesList[7], included: false },
    ],
  },
  {
    id: "plan-pro",
    name: "باقة المكاتب المتقدمة (Professional)",
    nameEn: "Law Office Professional",
    tagline: "الخيار الأفضل لمكاتب المحاماة متوسطة الحجم والنشطة",
    description: "تشمل مساعد الذكاء الاصطناعي وبوابة الدفع وتطبيق الجوال لكامل الفريق.",
    badge: "الأكثر طلباً ⭐",
    monthlyPrice: 699,
    annualPrice: 6990,
    isActive: true,
    isPopular: true,
    activeFirmsCount: 196,
    limits: {
      cases: 200,
      lawyers: 8,
      storageGb: 50,
      branches: 2,
      contracts: 300,
    },
    features: [
      { ...defaultFeaturesList[0], included: true },
      { ...defaultFeaturesList[1], included: true },
      { ...defaultFeaturesList[2], included: true },
      { ...defaultFeaturesList[3], included: true },
      { ...defaultFeaturesList[4], included: true },
      { ...defaultFeaturesList[5], included: true },
      { ...defaultFeaturesList[6], included: false },
      { ...defaultFeaturesList[7], included: false },
    ],
  },
  {
    id: "plan-enterprise",
    name: "باقة الشركات والمؤسسات الكبرى (Enterprise)",
    nameEn: "Enterprise & Mega Firms",
    tagline: "قوة غير محدودة لشركات المحاماة الكبرى ومتعددة الفروع",
    description: "قضايا ومستخدمين ومساحة بلا حدود، مع هوية خاصة ودعم VIP مخصص.",
    badge: "شامل بلا حدود 👑",
    monthlyPrice: 1499,
    annualPrice: 14990,
    isActive: true,
    isPopular: false,
    activeFirmsCount: 62,
    limits: {
      cases: -1, // Unlimited
      lawyers: -1, // Unlimited
      storageGb: -1, // Unlimited
      branches: -1, // Unlimited
      contracts: -1, // Unlimited
    },
    features: [
      { ...defaultFeaturesList[0], included: true },
      { ...defaultFeaturesList[1], included: true },
      { ...defaultFeaturesList[2], included: true },
      { ...defaultFeaturesList[3], included: true },
      { ...defaultFeaturesList[4], included: true },
      { ...defaultFeaturesList[5], included: true },
      { ...defaultFeaturesList[6], included: true },
      { ...defaultFeaturesList[7], included: true },
    ],
  },
  {
    id: "plan-starter",
    name: "باقة الانطلاق التأسيسية",
    nameEn: "Starter Law Practice",
    tagline: "باقة اقتصادية خفيفة للتدريب وبداية التحول الرقمي",
    description: "باقة تجريبية للمكاتب الجديدة لاختبار كفاءة النظام القانوني.",
    monthlyPrice: 149,
    annualPrice: 1490,
    isActive: false, // Currently disabled
    isPopular: false,
    activeFirmsCount: 15,
    limits: {
      cases: 15,
      lawyers: 1,
      storageGb: 5,
      branches: 1,
      contracts: 20,
    },
    features: [
      { ...defaultFeaturesList[0], included: false },
      { ...defaultFeaturesList[1], included: true },
      { ...defaultFeaturesList[2], included: false },
      { ...defaultFeaturesList[3], included: false },
      { ...defaultFeaturesList[4], included: false },
      { ...defaultFeaturesList[5], included: false },
      { ...defaultFeaturesList[6], included: false },
      { ...defaultFeaturesList[7], included: false },
    ],
  },
];

export function PlansView() {
  const { language } = useUIStore();
  const isAr = language === "ar";

  const [plans, setPlans] = useState<PricingPlan[]>(initialPlans);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);

  // Form Fields
  const [formNameAr, setFormNameAr] = useState("");
  const [formNameEn, setFormNameEn] = useState("");
  const [formTagline, setFormTagline] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formMonthlyPrice, setFormMonthlyPrice] = useState<number>(399);
  const [formAnnualPrice, setFormAnnualPrice] = useState<number>(3990);
  const [formIsActive, setFormIsActive] = useState<boolean>(true);
  const [formIsPopular, setFormIsPopular] = useState<boolean>(false);
  const [formBadge, setFormBadge] = useState<string>("");

  // Limits
  const [casesVal, setCasesVal] = useState<number>(100);
  const [casesUnlimited, setCasesUnlimited] = useState<boolean>(false);

  const [lawyersVal, setLawyersVal] = useState<number>(5);
  const [lawyersUnlimited, setLawyersUnlimited] = useState<boolean>(false);

  const [storageVal, setStorageVal] = useState<number>(20);
  const [storageUnlimited, setStorageUnlimited] = useState<boolean>(false);

  const [branchesVal, setBranchesVal] = useState<number>(1);
  const [branchesUnlimited, setBranchesUnlimited] = useState<boolean>(false);

  const [contractsVal, setContractsVal] = useState<number>(100);
  const [contractsUnlimited, setContractsUnlimited] = useState<boolean>(false);

  // Features Checklist State
  const [formFeatures, setFormFeatures] = useState<PlanFeature[]>([]);

  // Confirmation Alert Dialog
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    confirmLabel?: string;
    variant: "danger" | "warning" | "success" | "info";
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
    variant: "danger",
    onConfirm: () => {},
  });

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditingPlanId(null);
    setFormNameAr("");
    setFormNameEn("");
    setFormTagline("");
    setFormDescription("");
    setFormMonthlyPrice(499);
    setFormAnnualPrice(4990);
    setFormIsActive(true);
    setFormIsPopular(false);
    setFormBadge("");

    setCasesVal(100);
    setCasesUnlimited(false);
    setLawyersVal(5);
    setLawyersUnlimited(false);
    setStorageVal(25);
    setStorageUnlimited(false);
    setBranchesVal(1);
    setBranchesUnlimited(false);
    setContractsVal(100);
    setContractsUnlimited(false);

    setFormFeatures(
      defaultFeaturesList.map((f, i) => ({
        ...f,
        included: i < 3,
      }))
    );

    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (plan: PricingPlan) => {
    setEditingPlanId(plan.id);
    setFormNameAr(plan.name);
    setFormNameEn(plan.nameEn);
    setFormTagline(plan.tagline);
    setFormDescription(plan.description);
    setFormMonthlyPrice(plan.monthlyPrice);
    setFormAnnualPrice(plan.annualPrice);
    setFormIsActive(plan.isActive);
    setFormIsPopular(!!plan.isPopular);
    setFormBadge(plan.badge || "");

    // Cases
    if (plan.limits.cases === -1) {
      setCasesUnlimited(true);
      setCasesVal(100);
    } else {
      setCasesUnlimited(false);
      setCasesVal(plan.limits.cases);
    }

    // Lawyers
    if (plan.limits.lawyers === -1) {
      setLawyersUnlimited(true);
      setLawyersVal(5);
    } else {
      setLawyersUnlimited(false);
      setLawyersVal(plan.limits.lawyers);
    }

    // Storage
    if (plan.limits.storageGb === -1) {
      setStorageUnlimited(true);
      setStorageVal(50);
    } else {
      setStorageUnlimited(false);
      setStorageVal(plan.limits.storageGb);
    }

    // Branches
    if (plan.limits.branches === -1) {
      setBranchesUnlimited(true);
      setBranchesVal(1);
    } else {
      setBranchesUnlimited(false);
      setBranchesVal(plan.limits.branches);
    }

    // Contracts
    if (plan.limits.contracts === -1) {
      setContractsUnlimited(true);
      setContractsVal(100);
    } else {
      setContractsUnlimited(false);
      setContractsVal(plan.limits.contracts);
    }

    setFormFeatures([...plan.features]);
    setIsModalOpen(true);
  };

  // Toggle Plan Active Status
  const handleTogglePlanActive = (planId: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    setPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, isActive: nextStatus } : p))
    );
    toast.success(
      nextStatus ? "تم تفعيل الباقة وإتاحتها للاشتراك" : "تم تعطيل الباقة وإخفاؤها من صفحة الأسعار",
      {
        description: `باقة: ${plans.find((p) => p.id === planId)?.name}`,
      }
    );
  };

  // Delete Plan
  const handleDeletePlan = (planId: string, planName: string) => {
    setConfirmDialog({
      isOpen: true,
      title: isAr ? `حذف الباقة (${planName})؟` : `Delete plan ${planName}?`,
      description: isAr
        ? "هل أنت متأكد من حذف هذه الباقة نهائياً؟ لن يتمكن أي مكتب جديد من الاشتراك بها. لن تتأثر المكاتب المشتركة حالياً."
        : "Are you sure you want to delete this plan? Subscribed firms will not be affected.",
      confirmLabel: isAr ? "نعم، حذف الباقة" : "Yes, Delete",
      variant: "danger",
      onConfirm: () => {
        setPlans((prev) => prev.filter((p) => p.id !== planId));
        toast.success(isAr ? "تم حذف الباقة بنجاح" : "Plan deleted successfully");
      },
    });
  };

  // Save Add/Edit
  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formNameAr.trim()) {
      toast.error("يرجى إدخال اسم الباقة بالعربية");
      return;
    }

    const calculatedLimits: PlanLimits = {
      cases: casesUnlimited ? -1 : Math.max(1, Number(casesVal) || 1),
      lawyers: lawyersUnlimited ? -1 : Math.max(1, Number(lawyersVal) || 1),
      storageGb: storageUnlimited ? -1 : Math.max(1, Number(storageVal) || 1),
      branches: branchesUnlimited ? -1 : Math.max(1, Number(branchesVal) || 1),
      contracts: contractsUnlimited ? -1 : Math.max(1, Number(contractsVal) || 1),
    };

    if (editingPlanId) {
      // Edit
      setPlans((prev) =>
        prev.map((p) => {
          if (p.id !== editingPlanId) return p;
          return {
            ...p,
            name: formNameAr,
            nameEn: formNameEn || formNameAr,
            tagline: formTagline,
            description: formDescription,
            monthlyPrice: Number(formMonthlyPrice) || 0,
            annualPrice: Number(formAnnualPrice) || 0,
            isActive: formIsActive,
            isPopular: formIsPopular,
            badge: formBadge || (formIsPopular ? "الأكثر طلباً ⭐" : undefined),
            limits: calculatedLimits,
            features: formFeatures,
          };
        })
      );
      toast.success(isAr ? "تم تحديث الباقة والحدود بنجاح" : "Plan updated successfully");
    } else {
      // Create New
      const newPlanObj: PricingPlan = {
        id: `plan-${Date.now()}`,
        name: formNameAr,
        nameEn: formNameEn || formNameAr,
        tagline: formTagline,
        description: formDescription,
        monthlyPrice: Number(formMonthlyPrice) || 0,
        annualPrice: Number(formAnnualPrice) || 0,
        isActive: formIsActive,
        isPopular: formIsPopular,
        badge: formBadge || (formIsPopular ? "جديد ⭐" : undefined),
        activeFirmsCount: 0,
        limits: calculatedLimits,
        features: formFeatures,
      };
      setPlans((prev) => [newPlanObj, ...prev]);
      toast.success(isAr ? "تم إنشاء باقة الاشتراك الجديدة بنجاح" : "Plan created successfully");
    }

    setIsModalOpen(false);
  };

  // Toggle Feature Included in Form
  const handleToggleFeatureInForm = (featId: string) => {
    setFormFeatures((prev) =>
      prev.map((f) => (f.id === featId ? { ...f, included: !f.included } : f))
    );
  };

  // Filtered Plans
  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "active"
        ? plan.isActive
        : !plan.isActive;

    return matchesSearch && matchesStatus;
  });

  // KPIs
  const totalPlansCount = plans.length;
  const activePlansCount = plans.filter((p) => p.isActive).length;
  const topPlan = [...plans].sort((a, b) => b.activeFirmsCount - a.activeFirmsCount)[0];
  const avgMonthlyPrice = Math.round(
    plans.reduce((acc, p) => acc + p.monthlyPrice, 0) / (plans.length || 1)
  );

  const statusOptions: SelectOption[] = [
    { value: "all", label: isAr ? "جميع الباقات" : "All Plans" },
    { value: "active", label: isAr ? "الباقات النشطة فقط" : "Active Only" },
    { value: "inactive", label: isAr ? "الباقات المعطلة فقط" : "Inactive Only" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#fcfbfa] dark:bg-[#121110] text-[#1c1917] dark:text-[#f5f4f0] transition-colors duration-200 relative">
      {/* 1. Main Navigation Sidebar */}
      <DashboardSidebar />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        <DashboardTopNavbar />

        <main className="flex-1 overflow-y-auto scrollbar-thin w-full relative p-4 sm:p-6 lg:p-8">
          {/* Ambient Scales of Justice Emblems */}
          <div
            className="fixed top-28 -left-28 w-[380px] h-[380px] opacity-[0.035] dark:opacity-[0.045] text-[#c29547] pointer-events-none select-none z-0"
            aria-hidden="true"
          >
            <ScalesOfJusticeWatermark className="w-full h-full" />
          </div>

          <div
            className="fixed bottom-10 -right-28 w-[420px] h-[420px] opacity-[0.035] dark:opacity-[0.045] text-[#c29547] pointer-events-none select-none z-0"
            aria-hidden="true"
          >
            <ScalesOfJusticeWatermark className="w-full h-full" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto space-y-6 text-start">
            {/* Top Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8c8279] dark:text-[#9e968a] mb-1">
                  <span>{isAr ? "الرئيسية" : "Dashboard"}</span>
                  <span>/</span>
                  <span>{isAr ? "المالية" : "Finance"}</span>
                  <span>/</span>
                  <span className="text-[#c29547] dark:text-[#d4a759]">
                    {isAr ? "الباقات والأسعار والحدود" : "Pricing Plans & Limits"}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2c2825] dark:text-[#f5f4f0] flex items-center gap-2.5">
                  <Layers className="w-7 h-7 text-[#c29547] dark:text-[#d4a759]" />
                  <span>{isAr ? "إدارة باقات الاشتراك والأسعار والحدود" : "Plans & Limits Management"}</span>
                </h1>
                <p className="text-xs sm:text-sm text-[#736b63] dark:text-[#a8a196] mt-1 max-w-3xl">
                  {isAr
                    ? "تحديد أسعار الاشتراكات الشهرية والسنوية، ضبط القيود التشغيلية (القضايا، المحامين، التخزين)، والمميزات الإضافية المتاحة لكل باقة."
                    : "Configure monthly and annual subscription tiers, operational quotas, and add-on module permissions."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0">
                {/* Billing Toggle in Header */}
                <div className="p-1 rounded-2xl bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] flex items-center shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setBillingCycle("monthly")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      billingCycle === "monthly"
                        ? "bg-gradient-to-r from-[#d4a759] to-[#c29547] text-white shadow-xs"
                        : "text-[#736b63] dark:text-[#a8a196] hover:text-[#1c1917] dark:hover:text-white"
                    }`}
                  >
                    {isAr ? "عرض الشهري" : "Monthly"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle("annual")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      billingCycle === "annual"
                        ? "bg-gradient-to-r from-[#d4a759] to-[#c29547] text-white shadow-xs"
                        : "text-[#736b63] dark:text-[#a8a196] hover:text-[#1c1917] dark:hover:text-white"
                    }`}
                  >
                    <span>{isAr ? "عرض السنوي" : "Annual"}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-extrabold">
                      -20%
                    </span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddModal}
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#d4a759] to-[#c29547] text-white text-xs sm:text-sm font-bold shadow-[0_4px_14px_rgba(194,149,71,0.35)] hover:opacity-95 transition-all cursor-pointer flex items-center gap-2 shrink-0"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>{isAr ? "إضافة باقة جديدة" : "Add New Plan"}</span>
                </button>
              </div>
            </div>

            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Total Plans */}
              <div className="p-4 rounded-3xl bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#8c8279] dark:text-[#9e968a]">
                    {isAr ? "إجمالي الباقات" : "Total Plans"}
                  </p>
                  <h3 className="text-2xl font-black text-[#2c2825] dark:text-[#f5f4f0] mt-1 font-mono">
                    {totalPlansCount}
                  </h3>
                  <p className="text-[11px] text-[#736b63] dark:text-[#a8a196] mt-0.5">
                    {isAr ? "الخطط المعرفة في النظام" : "Registered subscription tiers"}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#fff7e6] dark:bg-[#2b2014] border border-[#eeddbb] dark:border-[#604218] flex items-center justify-center text-[#c29547] dark:text-[#d4a759]">
                  <Layers className="w-6 h-6" />
                </div>
              </div>

              {/* Card 2: Active Plans */}
              <div className="p-4 rounded-3xl bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#8c8279] dark:text-[#9e968a]">
                    {isAr ? "الباقات النشطة للاشتراك" : "Active Available Plans"}
                  </p>
                  <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                    {activePlansCount}
                  </h3>
                  <p className="text-[11px] text-[#736b63] dark:text-[#a8a196] mt-0.5">
                    {isAr ? "تظهر للمكاتب في صفحة التسجيل" : "Visible on checkout"}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

              {/* Card 3: Top Selling Plan */}
              <div className="p-4 rounded-3xl bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#8c8279] dark:text-[#9e968a]">
                    {isAr ? "الباقة الأكثر طلباً" : "Top Subscribed Plan"}
                  </p>
                  <h3 className="text-base font-black text-[#c29547] dark:text-[#d4a759] mt-1 truncate max-w-[170px]">
                    {topPlan ? topPlan.name : "-"}
                  </h3>
                  <p className="text-[11px] text-[#736b63] dark:text-[#a8a196] mt-0.5 font-mono">
                    {topPlan ? `${topPlan.activeFirmsCount} مكتب مشترك` : "-"}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#fff7e6] dark:bg-[#2b2014] border border-[#eeddbb] dark:border-[#604218] flex items-center justify-center text-[#c29547] dark:text-[#d4a759]">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>

              {/* Card 4: Avg Monthly Plan Value */}
              <div className="p-4 rounded-3xl bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#8c8279] dark:text-[#9e968a]">
                    {isAr ? "متوسط قيمة الباقات" : "Average Monthly Tier"}
                  </p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <h3 className="text-2xl font-black text-[#2c2825] dark:text-[#f5f4f0] font-mono">
                      {avgMonthlyPrice.toLocaleString()}
                    </h3>
                    <span className="text-xs font-bold text-[#c29547]">ر.س</span>
                  </div>
                  <p className="text-[11px] text-[#736b63] dark:text-[#a8a196] mt-0.5">
                    {isAr ? "لكل باقة شهرياً" : "Per package / month"}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <CreditCard className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 rounded-3xl bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3.5 text-[#8c8279]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isAr ? "بحث باسم الباقة أو الوصف..." : "Search plan name or description..."}
                  className="w-full h-10 ps-10 pe-4 rounded-2xl text-xs bg-[#fbf9f5] dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] focus:outline-none focus:border-[#c29547] text-[#1c1917] dark:text-[#f5f4f0]"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="w-full sm:w-48">
                  <LuxurySelect
                    options={statusOptions}
                    value={statusFilter}
                    onChange={(val) => setStatusFilter(val)}
                    placeholder="تصفية حسب الحالة"
                  />
                </div>

                {(searchQuery || statusFilter !== "all") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                    }}
                    className="p-2.5 rounded-2xl border border-[#ded5c6] dark:border-[#2f2a24] text-[#8c8279] hover:text-[#c29547] hover:border-[#c29547] transition-all cursor-pointer"
                    title={isAr ? "إعادة تعيين الفلاتر" : "Reset filters"}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Plans Grid */}
            {filteredPlans.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] shadow-xs">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-[#fff7e6] dark:bg-[#2b2014] border border-[#eeddbb] dark:border-[#604218] flex items-center justify-center text-[#c29547] mb-3">
                  <Layers className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#2c2825] dark:text-[#f5f4f0]">
                  {isAr ? "لم يتم العثور على أي باقات مطابقة" : "No plans found"}
                </h3>
                <p className="text-xs text-[#8c8279] dark:text-[#9e968a] mt-1 max-w-sm mx-auto">
                  {isAr
                    ? "جرّب تغيير كلمات البحث أو إعادة ضبط خيارات التصفية."
                    : "Try adjusting your search criteria or resetting filters."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map((plan) => {
                  const displayPrice =
                    billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
                  const cycleLabel =
                    billingCycle === "monthly"
                      ? isAr ? "/ شهرياً" : "/ month"
                      : isAr ? "/ سنوياً" : "/ year";

                  return (
                    <div
                      key={plan.id}
                      className={`relative rounded-3xl bg-white dark:bg-[#1a1714] border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                        plan.isPopular
                          ? "border-[#c29547] ring-2 ring-[#c29547]/20 dark:ring-[#c29547]/30"
                          : "border-[#ded5c6] dark:border-[#2f2a24]"
                      } ${!plan.isActive ? "opacity-75 bg-[#fbf9f5]/50 dark:bg-[#161412]" : ""}`}
                    >
                      {/* Top Header Card */}
                      <div className="p-6 pb-4">
                        {/* Top Badges & Toggle */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {plan.badge && (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#fff7e6] dark:bg-[#2b2014] border border-[#eeddbb] dark:border-[#604218] text-[#c29547] dark:text-[#d4a759] shadow-2xs">
                                {plan.badge}
                              </span>
                            )}
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                plan.isActive
                                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40"
                                  : "bg-stone-100 dark:bg-stone-900 text-stone-500 border border-stone-300 dark:border-stone-800"
                              }`}
                            >
                              {plan.isActive ? (isAr ? "نشطة ومتاحة" : "Active") : (isAr ? "معطلة مؤقتاً" : "Inactive")}
                            </span>
                          </div>

                          {/* Live Toggle Switch */}
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#8c8279] font-medium hidden sm:inline">
                              {plan.isActive ? (isAr ? "تفعيل" : "Enabled") : (isAr ? "تعطيل" : "Disabled")}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleTogglePlanActive(plan.id, plan.isActive)}
                              className={`w-10 h-5.5 rounded-full transition-colors p-0.5 cursor-pointer relative ${
                                plan.isActive ? "bg-[#c29547]" : "bg-stone-300 dark:bg-stone-700"
                              }`}
                              title={plan.isActive ? "تعطيل الباقة" : "تفعيل الباقة"}
                            >
                              <div
                                className={`w-4.5 h-4.5 rounded-full bg-white shadow-xs transition-transform transform ${
                                  plan.isActive ? (isAr ? "-translate-x-4.5" : "translate-x-4.5") : "translate-x-0"
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="text-lg font-extrabold text-[#2c2825] dark:text-[#f5f4f0]">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-[#8c8279] dark:text-[#9e968a] mt-0.5">
                          {plan.tagline}
                        </p>

                        {/* Price display */}
                        <div className="mt-4 pt-4 border-t border-[#ded5c6]/50 dark:border-[#2f2a24] flex items-baseline justify-between">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-3xl font-black text-[#2c2825] dark:text-[#f5f4f0] font-mono">
                              {displayPrice.toLocaleString()}
                            </span>
                            <span className="text-xs font-bold text-[#c29547]">ر.س</span>
                            <span className="text-xs text-[#8c8279]">{cycleLabel}</span>
                          </div>

                          <div className="text-end">
                            <span className="text-[11px] font-mono text-[#8c8279] bg-[#fbf9f5] dark:bg-[#201d1a] px-2 py-1 rounded-xl border border-[#ded5c6]/60 dark:border-[#2f2a24]">
                              {plan.activeFirmsCount} {isAr ? "مكتب مشترك" : "firms"}
                            </span>
                          </div>
                        </div>

                        {/* Operational Limits Box */}
                        <div className="mt-4 p-3.5 rounded-2xl bg-[#faf6ee] dark:bg-[#201c17] border border-[#eeddbb]/60 dark:border-[#403423] space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold text-[#c29547] pb-1.5 border-b border-[#eeddbb]/60 dark:border-[#403423]/60">
                            <span className="flex items-center gap-1.5">
                              <Sliders className="w-3.5 h-3.5" />
                              <span>{isAr ? "الحدود التشغيلية للباقة" : "Operational Quotas"}</span>
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                            {/* Cases */}
                            <div className="flex items-center gap-1.5 text-[#2c2825] dark:text-[#f5f4f0]">
                              <Scale className="w-3.5 h-3.5 text-[#c29547] shrink-0" />
                              <span>{isAr ? "القضايا:" : "Cases:"}</span>
                              <span className="font-extrabold font-mono text-[#c29547]">
                                {plan.limits.cases === -1 ? (isAr ? "غير محدود ∞" : "Unlimited") : `${plan.limits.cases}`}
                              </span>
                            </div>

                            {/* Lawyers */}
                            <div className="flex items-center gap-1.5 text-[#2c2825] dark:text-[#f5f4f0]">
                              <Users className="w-3.5 h-3.5 text-[#c29547] shrink-0" />
                              <span>{isAr ? "المحامين:" : "Lawyers:"}</span>
                              <span className="font-extrabold font-mono text-[#c29547]">
                                {plan.limits.lawyers === -1 ? (isAr ? "غير محدود ∞" : "Unlimited") : `${plan.limits.lawyers}`}
                              </span>
                            </div>

                            {/* Storage */}
                            <div className="flex items-center gap-1.5 text-[#2c2825] dark:text-[#f5f4f0]">
                              <HardDrive className="w-3.5 h-3.5 text-[#c29547] shrink-0" />
                              <span>{isAr ? "التخزين:" : "Storage:"}</span>
                              <span className="font-extrabold font-mono text-[#c29547]">
                                {plan.limits.storageGb === -1 ? (isAr ? "غير محدود ∞" : "Unlimited") : `${plan.limits.storageGb} GB`}
                              </span>
                            </div>

                            {/* Branches */}
                            <div className="flex items-center gap-1.5 text-[#2c2825] dark:text-[#f5f4f0]">
                              <Building className="w-3.5 h-3.5 text-[#c29547] shrink-0" />
                              <span>{isAr ? "الفروع:" : "Branches:"}</span>
                              <span className="font-extrabold font-mono text-[#c29547]">
                                {plan.limits.branches === -1 ? (isAr ? "غير محدود ∞" : "Unlimited") : `${plan.limits.branches}`}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Features List */}
                        <div className="mt-4 space-y-2">
                          <p className="text-[11px] font-bold text-[#8c8279] dark:text-[#9e968a]">
                            {isAr ? "المميزات الإضافية المتاحة:" : "Included features:"}
                          </p>
                          <ul className="space-y-1.5">
                            {plan.features.map((feat) => (
                              <li
                                key={feat.id}
                                className={`text-xs flex items-center gap-2 ${
                                  feat.included
                                    ? "text-[#2c2825] dark:text-[#f5f4f0]"
                                    : "text-stone-400 dark:text-stone-600 line-through"
                                }`}
                              >
                                {feat.included ? (
                                  <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  </div>
                                ) : (
                                  <div className="w-4 h-4 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-400 flex items-center justify-center shrink-0">
                                    <X className="w-2.5 h-2.5" />
                                  </div>
                                )}
                                <span className="line-clamp-1">{feat.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Card Action Footer */}
                      <div className="p-4 bg-[#fbf9f5] dark:bg-[#1a1714]/80 border-t border-[#ded5c6]/60 dark:border-[#2f2a24] flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(plan)}
                          className="flex-1 py-2 px-3 rounded-xl bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0] hover:border-[#c29547] hover:text-[#c29547] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#c29547]" />
                          <span>{isAr ? "تعديل الباقة والحدود" : "Edit Plan & Limits"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeletePlan(plan.id, plan.name)}
                          className="p-2 rounded-xl border border-rose-200 dark:border-rose-900/40 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
                          title={isAr ? "حذف الباقة" : "Delete Plan"}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add / Edit Plan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden text-start max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#ded5c6]/60 dark:border-[#2f2a24] bg-[#faf5eb] dark:bg-[#201c17]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#fff7e6] dark:bg-[#2b2014] border border-[#eeddbb] dark:border-[#604218] flex items-center justify-center text-[#c29547] dark:text-[#d4a759]">
                  {editingPlanId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-[#2c2825] dark:text-[#f5f4f0]">
                    {editingPlanId
                      ? isAr ? "تعديل الباقة والحدود التشغيلية" : "Edit Plan & Quotas"
                      : isAr ? "إضافة باقة اشتراك جديدة" : "Add New Subscription Plan"}
                  </h2>
                  <p className="text-xs text-[#8c8279] dark:text-[#9e968a]">
                    {isAr
                      ? "اضبط الأسعار الشهرية/السنوية، قيود القضايا والتخزين، وتفعيل المميزات"
                      : "Configure pricing, storage and cases quotas, and feature flags"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-[#8c8279] hover:text-[#2c2825] dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSavePlan} className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Section 1: Basic Information */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#c29547] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#ded5c6]/50 dark:border-[#2f2a24] pb-2">
                  <FileText className="w-4 h-4" />
                  <span>{isAr ? "البيانات الأساسية للباقة" : "Basic Information"}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0]">
                      اسم الباقة (بالعربية) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formNameAr}
                      onChange={(e) => setFormNameAr(e.target.value)}
                      placeholder="مثال: باقة النخبة للمحاماة"
                      className="w-full h-11 px-4 rounded-xl text-xs bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] focus:outline-none focus:border-[#c29547] text-[#1c1917] dark:text-[#f5f4f0]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0]">
                      اسم الباقة (بالإنجليزية)
                    </label>
                    <input
                      type="text"
                      value={formNameEn}
                      onChange={(e) => setFormNameEn(e.target.value)}
                      placeholder="e.g. Elite Law Firm Plan"
                      className="w-full h-11 px-4 rounded-xl text-xs bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] focus:outline-none focus:border-[#c29547] text-[#1c1917] dark:text-[#f5f4f0]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0]">
                    شعار أو وصف موجز للباقة
                  </label>
                  <input
                    type="text"
                    value={formTagline}
                    onChange={(e) => setFormTagline(e.target.value)}
                    placeholder="مثال: مخصصة للشركات القانونية الكبرى ذات الفروع المتعددة"
                    className="w-full h-11 px-4 rounded-xl text-xs bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] focus:outline-none focus:border-[#c29547] text-[#1c1917] dark:text-[#f5f4f0]"
                  />
                </div>

                {/* Pricing Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0] flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-[#c29547]" />
                      <span>السعر الشهري (ر.س) *</span>
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formMonthlyPrice}
                      onChange={(e) => setFormMonthlyPrice(Number(e.target.value))}
                      className="w-full h-11 px-4 rounded-xl text-xs font-mono font-bold bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] focus:outline-none focus:border-[#c29547] text-[#1c1917] dark:text-[#f5f4f0]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0] flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-[#c29547]" />
                      <span>السعر السنوي (ر.س) *</span>
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formAnnualPrice}
                      onChange={(e) => setFormAnnualPrice(Number(e.target.value))}
                      className="w-full h-11 px-4 rounded-xl text-xs font-mono font-bold bg-white dark:bg-[#201d1a] border border-[#ded5c6] dark:border-[#2f2a24] focus:outline-none focus:border-[#c29547] text-[#1c1917] dark:text-[#f5f4f0]"
                    />
                  </div>
                </div>

                {/* Options: Is Active & Is Popular */}
                <div className="p-4 rounded-2xl bg-[#faf5eb]/50 dark:bg-[#201c17]/50 border border-[#ded5c6]/60 dark:border-[#2f2a24] flex flex-wrap items-center justify-between gap-4">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <LuxuryCheckbox
                      checked={formIsActive}
                      onChange={() => setFormIsActive(!formIsActive)}
                    />
                    <span className="text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0]">
                      الباقة نشطة ومتاحة للاشتراك في الموقع
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <LuxuryCheckbox
                      checked={formIsPopular}
                      onChange={() => setFormIsPopular(!formIsPopular)}
                    />
                    <span className="text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0]">
                      تمييز كباقة (الأكثر طلباً ⭐)
                    </span>
                  </label>
                </div>
              </div>

              {/* Section 2: Operational Quotas & Limits */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#ded5c6]/50 dark:border-[#2f2a24] pb-2">
                  <h4 className="text-xs font-bold text-[#c29547] uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" />
                    <span>{isAr ? "الحدود التشغيلية للباقة (Operational Quotas)" : "Limits"}</span>
                  </h4>
                  <span className="text-[11px] text-[#8c8279] flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>{isAr ? "اختيار 'غير محدود' يضبط القيمة على -1" : "Unlimited sets -1"}</span>
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Limit 1: Cases */}
                  <div className="p-3.5 rounded-2xl bg-[#fbf9f5] dark:bg-[#201d1a] border border-[#ded5c6]/80 dark:border-[#2f2a24] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#fff7e6] dark:bg-[#2b2014] text-[#c29547] flex items-center justify-center shrink-0">
                        <Scale className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0]">
                          عدد القضايا المسموح بها
                        </p>
                        <p className="text-[11px] text-[#8c8279]">الحد الأقصى لملفات القضايا النشطة</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        disabled={casesUnlimited}
                        min={1}
                        value={casesUnlimited ? "" : casesVal}
                        onChange={(e) => setCasesVal(Number(e.target.value))}
                        placeholder={casesUnlimited ? "غير محدود ∞" : "50"}
                        className="w-24 h-9 px-3 rounded-xl text-xs font-mono font-bold bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] text-center disabled:opacity-50 disabled:bg-stone-100 dark:disabled:bg-stone-800"
                      />
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <LuxuryCheckbox
                          checked={casesUnlimited}
                          onChange={() => setCasesUnlimited(!casesUnlimited)}
                        />
                        <span className="text-xs font-bold text-[#c29547]">غير محدود</span>
                      </label>
                    </div>
                  </div>

                  {/* Limit 2: Lawyers */}
                  <div className="p-3.5 rounded-2xl bg-[#fbf9f5] dark:bg-[#201d1a] border border-[#ded5c6]/80 dark:border-[#2f2a24] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#fff7e6] dark:bg-[#2b2014] text-[#c29547] flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0]">
                          عدد المحامين والمستخدمين
                        </p>
                        <p className="text-[11px] text-[#8c8279]">حسابات كادر العمل في المكتب</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        disabled={lawyersUnlimited}
                        min={1}
                        value={lawyersUnlimited ? "" : lawyersVal}
                        onChange={(e) => setLawyersVal(Number(e.target.value))}
                        placeholder={lawyersUnlimited ? "غير محدود ∞" : "5"}
                        className="w-24 h-9 px-3 rounded-xl text-xs font-mono font-bold bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] text-center disabled:opacity-50 disabled:bg-stone-100 dark:disabled:bg-stone-800"
                      />
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <LuxuryCheckbox
                          checked={lawyersUnlimited}
                          onChange={() => setLawyersUnlimited(!lawyersUnlimited)}
                        />
                        <span className="text-xs font-bold text-[#c29547]">غير محدود</span>
                      </label>
                    </div>
                  </div>

                  {/* Limit 3: Storage */}
                  <div className="p-3.5 rounded-2xl bg-[#fbf9f5] dark:bg-[#201d1a] border border-[#ded5c6]/80 dark:border-[#2f2a24] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#fff7e6] dark:bg-[#2b2014] text-[#c29547] flex items-center justify-center shrink-0">
                        <HardDrive className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0]">
                          سعة التخزين السحابي (GB)
                        </p>
                        <p className="text-[11px] text-[#8c8279]">حجم المستندات والوثائق المرفوعة</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        disabled={storageUnlimited}
                        min={1}
                        value={storageUnlimited ? "" : storageVal}
                        onChange={(e) => setStorageVal(Number(e.target.value))}
                        placeholder={storageUnlimited ? "غير محدود ∞" : "25"}
                        className="w-24 h-9 px-3 rounded-xl text-xs font-mono font-bold bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] text-center disabled:opacity-50 disabled:bg-stone-100 dark:disabled:bg-stone-800"
                      />
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <LuxuryCheckbox
                          checked={storageUnlimited}
                          onChange={() => setStorageUnlimited(!storageUnlimited)}
                        />
                        <span className="text-xs font-bold text-[#c29547]">غير محدود</span>
                      </label>
                    </div>
                  </div>

                  {/* Limit 4: Branches */}
                  <div className="p-3.5 rounded-2xl bg-[#fbf9f5] dark:bg-[#201d1a] border border-[#ded5c6]/80 dark:border-[#2f2a24] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#fff7e6] dark:bg-[#2b2014] text-[#c29547] flex items-center justify-center shrink-0">
                        <Building className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0]">
                          عدد الفروع والمقرات التابعة
                        </p>
                        <p className="text-[11px] text-[#8c8279]">إدارة مقرات المكتب المتعددة</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        disabled={branchesUnlimited}
                        min={1}
                        value={branchesUnlimited ? "" : branchesVal}
                        onChange={(e) => setBranchesVal(Number(e.target.value))}
                        placeholder={branchesUnlimited ? "غير محدود ∞" : "1"}
                        className="w-24 h-9 px-3 rounded-xl text-xs font-mono font-bold bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] text-center disabled:opacity-50 disabled:bg-stone-100 dark:disabled:bg-stone-800"
                      />
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <LuxuryCheckbox
                          checked={branchesUnlimited}
                          onChange={() => setBranchesUnlimited(!branchesUnlimited)}
                        />
                        <span className="text-xs font-bold text-[#c29547]">غير محدود</span>
                      </label>
                    </div>
                  </div>

                  {/* Limit 5: Contracts */}
                  <div className="p-3.5 rounded-2xl bg-[#fbf9f5] dark:bg-[#201d1a] border border-[#ded5c6]/80 dark:border-[#2f2a24] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#fff7e6] dark:bg-[#2b2014] text-[#c29547] flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0]">
                          العقود والوثائق الشهرية
                        </p>
                        <p className="text-[11px] text-[#8c8279]">عقود التوكيل والاتفاقيات المصدرة شهرياً</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        disabled={contractsUnlimited}
                        min={1}
                        value={contractsUnlimited ? "" : contractsVal}
                        onChange={(e) => setContractsVal(Number(e.target.value))}
                        placeholder={contractsUnlimited ? "غير محدود ∞" : "100"}
                        className="w-24 h-9 px-3 rounded-xl text-xs font-mono font-bold bg-white dark:bg-[#1a1714] border border-[#ded5c6] dark:border-[#2f2a24] text-center disabled:opacity-50 disabled:bg-stone-100 dark:disabled:bg-stone-800"
                      />
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <LuxuryCheckbox
                          checked={contractsUnlimited}
                          onChange={() => setContractsUnlimited(!contractsUnlimited)}
                        />
                        <span className="text-xs font-bold text-[#c29547]">غير محدود</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Additional Features Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#c29547] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#ded5c6]/50 dark:border-[#2f2a24] pb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>{isAr ? "المميزات والخدمات المشمولة في الباقة" : "Features Checklist"}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {formFeatures.map((feat) => (
                    <div
                      key={feat.id}
                      onClick={() => handleToggleFeatureInForm(feat.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-2.5 select-none ${
                        feat.included
                          ? "bg-[#faf5eb] dark:bg-[#201c17] border-[#eeddbb] dark:border-[#4d3d28]"
                          : "bg-white dark:bg-[#201d1a] border-[#ded5c6]/60 dark:border-[#2f2a24] opacity-60"
                      }`}
                    >
                      <div className="pt-0.5">
                        <LuxuryCheckbox
                          checked={feat.included}
                          onChange={() => handleToggleFeatureInForm(feat.id)}
                        />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-[#2c2825] dark:text-[#f5f4f0]">
                          {feat.name}
                        </p>
                        <p className="text-[10px] text-[#8c8279] dark:text-[#9e968a]">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-4 border-t border-[#ded5c6]/60 dark:border-[#2f2a24] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#ded5c6] dark:border-[#2f2a24] text-xs font-bold text-[#736b63] dark:text-[#a8a196] hover:text-[#1c1917] dark:hover:text-white transition-colors cursor-pointer"
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a759] to-[#c29547] text-white text-xs font-bold hover:opacity-95 transition-all cursor-pointer shadow-md flex items-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>{editingPlanId ? (isAr ? "حفظ التعديلات" : "Save Changes") : (isAr ? "إنشاء الباقة" : "Create Plan")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <LuxuryAlertDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        description={confirmDialog.description}
        confirmLabel={confirmDialog.confirmLabel}
        variant={confirmDialog.variant}
        onConfirm={confirmDialog.onConfirm}
        onClose={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
