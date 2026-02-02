/// <reference types="react" />
/// <reference types="react-dom" />

declare module "@portfolio/shared" {
  import type { Variants, HTMLMotionProps } from "framer-motion";
  import type {
    ReactNode,
    HTMLAttributes,
    ForwardRefExoticComponent,
    RefAttributes,
  } from "react";

  // Store Types
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

  // Animation Variants
  export const cardVariants: Variants;
  export const staggerContainerVariants: Variants;
  export const skillBadgeVariants: Variants;

  // AnimatedCard Component
  interface AnimatedCardProps extends HTMLMotionProps<"div"> {
    variants?: Variants;
    hoverEffect?: boolean;
    hoverBorder?: boolean;
  }

  export const AnimatedCard: ForwardRefExoticComponent<
    AnimatedCardProps & RefAttributes<HTMLDivElement>
  >;

  // AnimatedCardHeader Component
  interface AnimatedCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    icon?: ReactNode;
    title: string;
  }

  export const AnimatedCardHeader: ForwardRefExoticComponent<
    AnimatedCardHeaderProps & RefAttributes<HTMLDivElement>
  >;

  // AnimatedCardContent Component
  export const AnimatedCardContent: ForwardRefExoticComponent<
    HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>
  >;

  // SkillBadge Component
  interface SkillBadgeProps extends HTMLMotionProps<"span"> {
    skill: string;
  }

  export const SkillBadge: ForwardRefExoticComponent<
    SkillBadgeProps & RefAttributes<HTMLSpanElement>
  >;

  // SkillBadgeContainer Component
  export const SkillBadgeContainer: ForwardRefExoticComponent<
    HTMLMotionProps<"div"> & RefAttributes<HTMLDivElement>
  >;

  // UI Components
  export const Button: ForwardRefExoticComponent<any>;
  export const Card: ForwardRefExoticComponent<any>;
  export const CardHeader: ForwardRefExoticComponent<any>;
  export const CardTitle: ForwardRefExoticComponent<any>;
  export const CardDescription: ForwardRefExoticComponent<any>;
  export const CardContent: ForwardRefExoticComponent<any>;
  export const CardFooter: ForwardRefExoticComponent<any>;
  export const Badge: ForwardRefExoticComponent<any>;
  export const Input: ForwardRefExoticComponent<
    React.InputHTMLAttributes<HTMLInputElement> &
      RefAttributes<HTMLInputElement>
  >;
  export const Textarea: ForwardRefExoticComponent<
    React.TextareaHTMLAttributes<HTMLTextAreaElement> &
      RefAttributes<HTMLTextAreaElement>
  >;
  export const Label: ForwardRefExoticComponent<
    React.LabelHTMLAttributes<HTMLLabelElement> &
      RefAttributes<HTMLLabelElement>
  >;
  export const Separator: ForwardRefExoticComponent<any>;
  export const ThemeToggle: () => JSX.Element;

  // Animation Components
  export const FadeIn: ForwardRefExoticComponent<any>;
  export const SlideIn: ForwardRefExoticComponent<any>;
  export const StaggerContainer: ForwardRefExoticComponent<any>;
  export const StaggerItem: ForwardRefExoticComponent<any>;

  // Utility Functions
  export function cn(...inputs: any[]): string;
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
