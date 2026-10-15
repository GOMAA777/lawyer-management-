export type AddonPeriod = "monthly" | "annual";

export interface PaidAddon {
  id: string;
  title: string;
  titleEn: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  currency: string;
  period: AddonPeriod;
  enabled: boolean;
  activeFirmsCount: number;
  quotaLabel: string;
  iconName: string;
  features: string[];
  featuresEn: string[];
}

export type IntegrationStatus = "connected" | "disconnected" | "configuring" | "error";

export interface IntegrationField {
  key: string;
  label: string;
  value: string;
  isSecret?: boolean;
  placeholder?: string;
}

export interface SystemIntegration {
  id: string;
  name: string;
  nameEn: string;
  provider: string;
  category: "calendar" | "payment" | "storage" | "messaging";
  description: string;
  descriptionEn: string;
  iconName: string;
  enabled: boolean;
  status: IntegrationStatus;
  lastSync: string;
  isSandbox?: boolean;
  fields: IntegrationField[];
  supportedGateways?: string[];
}
