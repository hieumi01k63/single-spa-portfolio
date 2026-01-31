import { useEffect, useState } from "react";
import type { SectionId } from "../store/portfolio-store";

interface UseScrollSpyOptions {
  sectionIds: SectionId[];
  offset?: number;
}

/**
 * Hook to track which section is currently in view
 * Updates the active section based on scroll position
 */
export function useScrollSpy({
  sectionIds,
  offset = 100,
}: UseScrollSpyOptions): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>(
    sectionIds[0] ?? "hero"
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i];
        const element = document.getElementById(sectionId);

        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}
