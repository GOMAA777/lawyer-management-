import { create } from "zustand";

export type TableDensity = "compact" | "normal" | "comfortable";
export type ThemePreference = "light" | "dark";
export type AppLanguage = "ar" | "en";

interface UIState {
  sidebarOpen: boolean;
  tableDensity: TableDensity;
  theme: ThemePreference;
  language: AppLanguage;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTableDensity: (density: TableDensity) => void;
  setTheme: (theme: ThemePreference) => void;
  toggleTheme: () => void;
  setLanguage: (lang: AppLanguage) => void;
  toggleLanguage: () => void;
}

function applyThemeToDOM(theme: ThemePreference) {
  if (typeof document !== "undefined") {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("app-theme", theme);
    } catch {
      // Ignore in private browsing
    }
  }
}

function applyLanguageToDOM(lang: AppLanguage) {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("app-language", lang);
    } catch {
      // Ignore in private browsing
    }
  }
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarOpen: true,
  tableDensity: "normal",
  theme: "light",
  language: "ar",

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setTableDensity: (density) => set({ tableDensity: density }),

  setTheme: (theme: ThemePreference) => {
    applyThemeToDOM(theme);
    set({ theme });
  },

  toggleTheme: () => {
    const nextTheme: ThemePreference = get().theme === "light" ? "dark" : "light";
    applyThemeToDOM(nextTheme);
    set({ theme: nextTheme });
  },

  setLanguage: (lang: AppLanguage) => {
    applyLanguageToDOM(lang);
    set({ language: lang });
  },

  toggleLanguage: () => {
    const nextLang: AppLanguage = get().language === "ar" ? "en" : "ar";
    applyLanguageToDOM(nextLang);
    set({ language: nextLang });
  },
}));

// Hydrate stored preferences on client initialization
if (typeof window !== "undefined") {
  try {
    const savedTheme = localStorage.getItem("app-theme") as ThemePreference | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      applyThemeToDOM(savedTheme);
      useUIStore.setState({ theme: savedTheme });
    }
    const savedLang = localStorage.getItem("app-language") as AppLanguage | null;
    if (savedLang === "ar" || savedLang === "en") {
      applyLanguageToDOM(savedLang);
      useUIStore.setState({ language: savedLang });
    }
  } catch {
    // Ignore in private browsing mode
  }
}
