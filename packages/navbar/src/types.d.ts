/// <reference types="react" />
/// <reference types="react-dom" />

declare module "@portfolio/shared" {
  export type SectionId =
    | "hero"
    | "about"
    | "experience"
    | "projects"
    | "skills"
    | "awards"
    | "education"
    | "contact";

  export interface Section {
    id: SectionId;
    label: string;
    icon?: string;
  }

  export interface PortfolioState {
    activeSectionId: SectionId;
    sections: Section[];
    isDarkMode: boolean;
    isMobileMenuOpen: boolean;
    setActiveSection: (sectionId: SectionId) => void;
    toggleDarkMode: () => void;
    setDarkMode: (isDark: boolean) => void;
    toggleMobileMenu: () => void;
    setMobileMenuOpen: (isOpen: boolean) => void;
  }

  export const usePortfolioStore: () => PortfolioState;
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
