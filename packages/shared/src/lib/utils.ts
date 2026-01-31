import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and merges Tailwind classes
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Toggle dark mode on the document
 */
export function toggleDarkMode(): void {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

/**
 * Get current dark mode state
 */
export function isDarkMode(): boolean {
  return document.documentElement.classList.contains("dark");
}

/**
 * Set dark mode explicitly
 */
export function setDarkMode(dark: boolean): void {
  if (dark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}
