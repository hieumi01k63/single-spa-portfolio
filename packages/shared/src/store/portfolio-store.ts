import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

/**
 * Section IDs for navigation
 */
export type SectionId =
  | "hero"
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "awards"
  | "education"
  | "contact";

/**
 * Section configuration
 */
export interface Section {
  id: SectionId;
  label: string;
  icon?: string;
}

/**
 * Portfolio store state and actions
 */
export interface PortfolioState {
  // State
  activeSectionId: SectionId;
  sections: Section[];
  isDarkMode: boolean;
  isMobileMenuOpen: boolean;

  // Actions
  setActiveSection: (sectionId: SectionId) => void;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
}

/**
 * Default sections for the portfolio
 */
const defaultSections: Section[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "awards", label: "Awards" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

/**
 * Initialize dark mode from localStorage or system preference
 */
const getInitialDarkMode = (): boolean => {
  if (typeof window === "undefined") return false;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme === "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

/**
 * Zustand store for portfolio state management
 * This store is shared across all micro-frontends via Module Federation
 */
export const usePortfolioStore = create<PortfolioState>()(
  devtools(
    subscribeWithSelector((set) => ({
      // Initial state
      activeSectionId: "hero",
      sections: defaultSections,
      isDarkMode: getInitialDarkMode(),
      isMobileMenuOpen: false,

      // Actions
      setActiveSection: (sectionId: SectionId) => {
        set({ activeSectionId: sectionId }, false, "setActiveSection");
      },

      toggleDarkMode: () => {
        set(
          (state) => {
            const newDarkMode = !state.isDarkMode;
            // Sync with DOM
            if (newDarkMode) {
              document.documentElement.classList.add("dark");
              localStorage.setItem("theme", "dark");
            } else {
              document.documentElement.classList.remove("dark");
              localStorage.setItem("theme", "light");
            }
            return { isDarkMode: newDarkMode };
          },
          false,
          "toggleDarkMode"
        );
      },

      setDarkMode: (isDark: boolean) => {
        set(
          () => {
            if (isDark) {
              document.documentElement.classList.add("dark");
              localStorage.setItem("theme", "dark");
            } else {
              document.documentElement.classList.remove("dark");
              localStorage.setItem("theme", "light");
            }
            return { isDarkMode: isDark };
          },
          false,
          "setDarkMode"
        );
      },

      toggleMobileMenu: () => {
        set(
          (state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen }),
          false,
          "toggleMobileMenu"
        );
      },

      setMobileMenuOpen: (isOpen: boolean) => {
        set({ isMobileMenuOpen: isOpen }, false, "setMobileMenuOpen");
      },
    })),
    {
      name: "portfolio-store",
    }
  )
);
