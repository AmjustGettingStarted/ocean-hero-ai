import { useEffect, useState } from "react";
import type { SectionId } from "@/data/site";

export function useActiveSection(sectionIds: readonly SectionId[]) {
  const [activeSection, setActiveSection] = useState<SectionId>(sectionIds[0] ?? "home");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        const viewportCenter = window.innerHeight / 2;
        const nextSection = sections
          .map((section) => ({ section, distance: Math.abs(section.getBoundingClientRect().top + section.getBoundingClientRect().height / 2 - viewportCenter) }))
          .sort((a, b) => a.distance - b.distance)[0]?.section.id as SectionId | undefined;
        if (nextSection && sectionIds.includes(nextSection)) {
          setActiveSection(nextSection);
        }
      },
      { rootMargin: "-40% 0px -45%", threshold: [0, 0.15, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
