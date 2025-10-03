import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { NavLinkItem } from "../types";
import { DEFAULT_NAV_LINKS } from "../utils/constants";

type BaseTheme = "system" | "light" | "dark-pro" | "midnight";
type AccentColor =
  | "indigo"
  | "forest"
  | "rose"
  | "sunrise"
  | "violet"
  | "ocean";
type Layout = "vertical" | "horizontal";
type MobileLayout = "bottom" | "sidebar";
type FontFamily =
  | "inter"
  | "poppins"
  | "roboto"
  | "lato"
  | "lora"
  | "nunito-sans"
  | "playfair-display"
  | "source-code-pro"
  | "open-sans"
  | "montserrat"
  | "merriweather";
type BaseFontSize = 14 | 15 | 16 | 17 | 18;

export const ACCENT_PALETTES: Record<
  AccentColor,
  { label: string; primaryHex: string; vars: Record<string, string> }
> = {
  indigo: {
    label: "Indigo",
    primaryHex: "#6366f1",
    vars: {
      "--color-primary-hsl": "239 82% 66%",
      "--color-primary-hover-hsl": "239 92% 72%",
      "--color-chart-1": "#3b82f6",
      "--color-chart-2": "#14b8a6",
      "--color-chart-3": "#ef4444",
      "--color-chart-4": "#f97316",
      "--color-chart-5": "#8b5cf6",
    },
  },
  forest: {
    label: "Forest",
    primaryHex: "#16a34a",
    vars: {
      "--color-primary-hsl": "145 74% 36%",
      "--color-primary-hover-hsl": "145 84% 42%",
      "--color-chart-1": "#22c55e",
      "--color-chart-2": "#84cc16",
      "--color-chart-3": "#facc15",
      "--color-chart-4": "#06b6d4",
      "--color-chart-5": "#a855f7",
    },
  },
  rose: {
    label: "Rose",
    primaryHex: "#e11d48",
    vars: {
      "--color-primary-hsl": "347 87% 49%",
      "--color-primary-hover-hsl": "347 97% 55%",
      "--color-chart-1": "#f43f5e",
      "--color-chart-2": "#d946ef",
      "--color-chart-3": "#6366f1",
      "--color-chart-4": "#22d3ee",
      "--color-chart-5": "#f59e0b",
    },
  },
  sunrise: {
    label: "Sunrise",
    primaryHex: "#f97316",
    vars: {
      "--color-primary-hsl": "25 95% 53%",
      "--color-primary-hover-hsl": "25 98% 58%",
      "--color-chart-1": "#ea580c",
      "--color-chart-2": "#eab308",
      "--color-chart-3": "#ef4444",
      "--color-chart-4": "#84cc16",
      "--color-chart-5": "#3b82f6",
    },
  },
  violet: {
    label: "Violet",
    primaryHex: "#8b5cf6",
    vars: {
      "--color-primary-hsl": "258 90% 66%",
      "--color-primary-hover-hsl": "258 95% 72%",
      "--color-chart-1": "#a855f7",
      "--color-chart-2": "#ec4899",
      "--color-chart-3": "#22d3ee",
      "--color-chart-4": "#4ade80",
      "--color-chart-5": "#fde047",
    },
  },
  ocean: {
    label: "Ocean",
    primaryHex: "#06b6d4",
    vars: {
      "--color-primary-hsl": "187 94% 43%",
      "--color-primary-hover-hsl": "187 98% 48%",
      "--color-chart-1": "#0891b2",
      "--color-chart-2": "#34d399",
      "--color-chart-3": "#a78bfa",
      "--color-chart-4": "#fb923c",
      "--color-chart-5": "#f472b6",
    },
  },
};

export const FONT_FAMILIES: Record<FontFamily, { name: string; css: string }> =
  {
    inter: { name: "Inter", css: "'Inter', sans-serif" },
    poppins: { name: "Poppins", css: "'Poppins', sans-serif" },
    roboto: { name: "Roboto", css: "'Roboto', sans-serif" },
    "open-sans": { name: "Open Sans", css: "'Open Sans', sans-serif" },
    montserrat: { name: "Montserrat", css: "'Montserrat', sans-serif" },
    merriweather: { name: "Merriweather", css: "'Merriweather', serif" },
    lato: { name: "Lato", css: "'Lato', sans-serif" },
    lora: { name: "Lora", css: "'Lora', serif" },
    "nunito-sans": { name: "Nunito Sans", css: "'Nunito Sans', sans-serif" },
    "playfair-display": {
      name: "Playfair Display",
      css: "'Playfair Display', serif",
    },
    "source-code-pro": {
      name: "Source Code Pro",
      css: "'Source Code Pro', monospace",
    },
  };

interface AppearanceContextType {
  baseTheme: BaseTheme;
  accentColor: AccentColor;
  layout: Layout;
  mobileLayout: MobileLayout;
  fontFamily: FontFamily;
  baseFontSize: BaseFontSize;
  isSidebarCollapsed: boolean;
  navLinks: NavLinkItem[];
  setBaseTheme: (theme: BaseTheme) => void;
  setAccentColor: (accent: AccentColor) => void;
  setLayout: (layout: Layout) => void;
  setMobileLayout: (layout: MobileLayout) => void;
  setFontFamily: (font: FontFamily) => void;
  setBaseFontSize: (size: BaseFontSize) => void;
  setIsSidebarCollapsed: (isCollapsed: boolean) => void;
  setNavLinks: (links: NavLinkItem[]) => void;
  resetAppearance: () => void;
}

export const AppearanceContext = createContext<
  AppearanceContextType | undefined
>(undefined);

const BASE_THEME_OPTIONS: BaseTheme[] = [
  "system",
  "light",
  "dark-pro",
  "midnight",
];
const ACCENT_COLOR_OPTIONS: AccentColor[] = Object.keys(
  ACCENT_PALETTES
) as AccentColor[];
const LAYOUT_OPTIONS: Layout[] = ["vertical", "horizontal"];
const MOBILE_LAYOUT_OPTIONS: MobileLayout[] = ["bottom", "sidebar"];
const FONT_FAMILY_OPTIONS: FontFamily[] = Object.keys(
  FONT_FAMILIES
) as FontFamily[];
const BASE_FONT_SIZE_OPTIONS: BaseFontSize[] = [14, 15, 16, 17, 18];

const getStoredValue = <T,>(key: string, options: T[], defaultValue: T): T => {
  if (typeof window !== "undefined") {
    let storedValue = localStorage.getItem(key);
    if (storedValue) {
      // Handle numeric values
      const parsed = (
        typeof defaultValue === "number"
          ? parseInt(storedValue, 10)
          : storedValue
      ) as T;
      if (options.includes(parsed)) {
        return parsed;
      }
    }
  }
  return defaultValue;
};

const getInitialNavLinks = (): NavLinkItem[] => {
  if (typeof window === "undefined") {
    return DEFAULT_NAV_LINKS;
  }

  const storedOrder = localStorage.getItem("re-crm-nav-order");
  // Clean up old problematic storage item
  if (localStorage.getItem("re-crm-navlinks")) {
    localStorage.removeItem("re-crm-navlinks");
  }

  if (!storedOrder) {
    return DEFAULT_NAV_LINKS;
  }

  try {
    const linkIds: string[] = JSON.parse(storedOrder);
    const defaultLinksMap = new Map(
      DEFAULT_NAV_LINKS.map((link) => [link.id, link])
    );

    const orderedLinks: NavLinkItem[] = [];
    const presentIds = new Set<string>();

    linkIds.forEach((id) => {
      const link = defaultLinksMap.get(id);
      if (link) {
        orderedLinks.push(link);
        presentIds.add(id);
      }
    });

    DEFAULT_NAV_LINKS.forEach((link) => {
      if (!presentIds.has(link.id)) {
        orderedLinks.push(link);
      }
    });

    return orderedLinks;
  } catch (e) {
    console.error("Failed to parse stored nav link order", e);
    return DEFAULT_NAV_LINKS;
  }
};

const getInitialSidebarCollapsed = (): boolean => {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("re-crm-sidebar-collapsed");
  return stored === "true";
};

export const AppearanceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [baseTheme, setBaseThemeState] = useState<BaseTheme>(() =>
    getStoredValue("re-crm-base-theme", BASE_THEME_OPTIONS, "system")
  );
  const [accentColor, setAccentColorState] = useState<AccentColor>(() =>
    getStoredValue("re-crm-accent", ACCENT_COLOR_OPTIONS, "indigo")
  );
  const [layout, setLayoutState] = useState<Layout>(() =>
    getStoredValue("re-crm-layout", LAYOUT_OPTIONS, "vertical")
  );
  const [mobileLayout, setMobileLayoutState] = useState<MobileLayout>(() =>
    getStoredValue("re-crm-mobile-layout", MOBILE_LAYOUT_OPTIONS, "bottom")
  );
  const [fontFamily, setFontFamilyState] = useState<FontFamily>(() =>
    getStoredValue("re-crm-font-family", FONT_FAMILY_OPTIONS, "inter")
  );
  const [baseFontSize, setBaseFontSizeState] = useState<BaseFontSize>(() =>
    getStoredValue("re-crm-font-size", BASE_FONT_SIZE_OPTIONS, 16)
  );
  const [isSidebarCollapsed, setIsSidebarCollapsedState] = useState<boolean>(
    getInitialSidebarCollapsed
  );
  const [navLinks, setNavLinksState] =
    useState<NavLinkItem[]>(getInitialNavLinks);

  // Migration from old single theme system
  useEffect(() => {
    const oldTheme = localStorage.getItem("re-crm-theme");
    if (oldTheme) {
      if (oldTheme.includes("ocean")) {
        setBaseThemeState("midnight");
        setAccentColorState("ocean");
      } else if (oldTheme.includes("sunset")) {
        setBaseThemeState("dark-pro");
        setAccentColorState("sunrise");
      }
      localStorage.removeItem("re-crm-theme");
    }
  }, []);

  // Effect for applying the base theme class
  useEffect(() => {
    const applyThemeClass = (t: BaseTheme) => {
      const root = window.document.documentElement;
      root.classList.remove("theme-light", "theme-dark-pro", "theme-midnight");

      if (t === "system") {
        const systemIsDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        root.classList.add(systemIsDark ? "theme-dark-pro" : "theme-light");
      } else {
        root.classList.add(`theme-${t}`);
      }
    };

    applyThemeClass(baseTheme);

    if (baseTheme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyThemeClass("system");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [baseTheme]);

  // Effect for applying accent color & typography variables
  useEffect(() => {
    const root = document.documentElement;
    const accentPalette =
      ACCENT_PALETTES[accentColor] || ACCENT_PALETTES.indigo;

    for (const [key, value] of Object.entries(accentPalette.vars) as [
      string,
      string
    ][]) {
      root.style.setProperty(key, value);
    }

    const font = FONT_FAMILIES[fontFamily] || FONT_FAMILIES.inter;
    root.style.setProperty("--font-family-sans", font.css);
    root.style.fontSize = `${baseFontSize}px`;
  }, [accentColor, fontFamily, baseFontSize]);

  const setBaseTheme = useCallback((newTheme: BaseTheme) => {
    localStorage.setItem("re-crm-base-theme", newTheme);
    setBaseThemeState(newTheme);
  }, []);

  const setAccentColor = useCallback((newAccent: AccentColor) => {
    localStorage.setItem("re-crm-accent", newAccent);
    setAccentColorState(newAccent);
  }, []);

  const setLayout = useCallback((newLayout: Layout) => {
    localStorage.setItem("re-crm-layout", newLayout);
    setLayoutState(newLayout);
  }, []);

  const setMobileLayout = useCallback((newLayout: MobileLayout) => {
    localStorage.setItem("re-crm-mobile-layout", newLayout);
    setMobileLayoutState(newLayout);
  }, []);

  const setFontFamily = useCallback((newFont: FontFamily) => {
    localStorage.setItem("re-crm-font-family", newFont);
    setFontFamilyState(newFont);
  }, []);

  const setBaseFontSize = useCallback((newSize: BaseFontSize) => {
    localStorage.setItem("re-crm-font-size", String(newSize));
    setBaseFontSizeState(newSize);
  }, []);

  const setIsSidebarCollapsed = useCallback((isCollapsed: boolean) => {
    localStorage.setItem("re-crm-sidebar-collapsed", String(isCollapsed));
    setIsSidebarCollapsedState(isCollapsed);
  }, []);

  const setNavLinks = useCallback((newLinks: NavLinkItem[]) => {
    const linkOrder = newLinks.map((link) => link.id);
    localStorage.setItem("re-crm-nav-order", JSON.stringify(linkOrder));
    setNavLinksState(newLinks);
  }, []);

  const resetAppearance = useCallback(() => {
    setBaseTheme("system");
    setAccentColor("indigo");
    setLayout("vertical");
    setMobileLayout("bottom");
    setFontFamily("inter");
    setBaseFontSize(16);
    setIsSidebarCollapsed(false);
    setNavLinks(DEFAULT_NAV_LINKS);
  }, []);

  const value = useMemo(
    () => ({
      baseTheme,
      accentColor,
      layout,
      mobileLayout,
      fontFamily,
      baseFontSize,
      isSidebarCollapsed,
      navLinks,
      setBaseTheme,
      setAccentColor,
      setLayout,
      setMobileLayout,
      setFontFamily,
      setBaseFontSize,
      setIsSidebarCollapsed,
      setNavLinks,
      resetAppearance,
    }),
    [
      baseTheme,
      accentColor,
      layout,
      mobileLayout,
      fontFamily,
      baseFontSize,
      isSidebarCollapsed,
      navLinks,
      resetAppearance,
      setBaseTheme,
      setAccentColor,
      setLayout,
      setMobileLayout,
      setFontFamily,
      setBaseFontSize,
      setIsSidebarCollapsed,
      setNavLinks,
    ]
  );

  return (
    <AppearanceContext.Provider value={value}>
      {children}
    </AppearanceContext.Provider>
  );
};

export const useAppearance = () => {
  const context = useContext(AppearanceContext);
  if (context === undefined) {
    throw new Error("useAppearance must be used within an AppearanceProvider");
  }
  return context;
};
