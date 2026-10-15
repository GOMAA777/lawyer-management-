import React from "react";
import { cn } from "@/lib/utils";

interface ScalesOfJusticeWatermarkProps {
  className?: string;
  panDrop?: number;
}

export function ScalesOfJusticeWatermark({
  className,
}: ScalesOfJusticeWatermarkProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      {/* 1. Top Crown & Ornamental Finial */}
      <circle cx="120" cy="18" r="6" />
      <path d="M117 24h6v6h-6z" />
      <circle cx="120" cy="34" r="8" />

      {/* 2. Main Horizontal Beam / Balance Arm */}
      <path
        d="M32 46c0-3.3 2.7-6 6-6h164c3.3 0 6 2.7 6 6s-2.7 6-6 6H38c-3.3 0-6-2.7-6-6z"
      />
      {/* Central Pivot Hub */}
      <circle cx="120" cy="46" r="10" />
      <circle cx="120" cy="46" r="4" className="fill-[#fcfbfa] dark:fill-[#121110]" />

      {/* Left End Ring & Pivot */}
      <circle cx="48" cy="46" r="6" />
      <circle cx="48" cy="46" r="2.5" className="fill-[#fcfbfa] dark:fill-[#121110]" />

      {/* Right End Ring & Pivot */}
      <circle cx="192" cy="46" r="6" />
      <circle cx="192" cy="46" r="2.5" className="fill-[#fcfbfa] dark:fill-[#121110]" />

      {/* 3. Left Suspension Chains / Cords */}
      <line x1="48" y1="52" x2="24" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="48" y1="52" x2="72" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="48" y1="52" x2="48" y2="108" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* 4. Right Suspension Chains / Cords */}
      <line x1="192" y1="52" x2="168" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="192" y1="52" x2="216" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="192" y1="52" x2="192" y2="108" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* 5. Left Weighing Pan (Deep Elegant Dish) */}
      <path
        d="M20 108c0 17 12.5 28 28 28s28-11 28-28H20z"
      />
      <line x1="18" y1="108" x2="78" y2="108" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />

      {/* 6. Right Weighing Pan (Deep Elegant Dish) */}
      <path
        d="M164 108c0 17 12.5 28 28 28s28-11 28-28H164z"
      />
      <line x1="162" y1="108" x2="222" y2="108" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />

      {/* 7. Central Stately Column / Pillar */}
      <rect x="116.5" y="52" width="7" height="135" rx="2.5" />
      {/* Classical Column Capital / Collars */}
      <rect x="111" y="70" width="18" height="5" rx="2" />
      <rect x="112" y="125" width="16" height="5" rx="2" />
      <rect x="110" y="172" width="20" height="6" rx="2.5" />

      {/* 8. Tiered Supreme Court Pedestal Base */}
      <path d="M96 187h48c3.5 0 6.5 2.5 6.5 6v6H89.5v-6c0-3.5 3-6 6.5-6z" />
      <rect x="76" y="199" width="88" height="9" rx="4.5" />
      <rect x="60" y="208" width="120" height="10" rx="5" />
    </svg>
  );
}
