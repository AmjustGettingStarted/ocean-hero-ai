export const sectionIds = ["home", "projects", "studio", "reach-us"] as const;

export type SectionId = (typeof sectionIds)[number];

export interface NavLink {
  id: SectionId;
  label: string;
}

export const navLinks: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "studio", label: "Studio" },
  { id: "reach-us", label: "Reach Us" },
];

export const siteCopy = {
  brand: "Foldcraft",
  eyebrow: "Brand & Visual Storytelling",
  heroHeadline: ["Shaping visual", "narratives,", "one pixel at a time."],
  heroDescription:
    "Turning vision into reality through craft, motion, and an endless pursuit of beauty.",
  projectsEyebrow: "Selected work",
  studioEyebrow: "A small studio with a wide lens",
  reachEyebrow: "Start a conversation",
} as const;

export const NAV_SCROLL_EVENT = "foldcraft-nav-scroll";

export interface NavScrollDetail {
  id: SectionId;
}

export function scrollToSection(id: SectionId) {
  if (typeof window === "undefined") return;

  // Dispatch custom navigation event so the active section indicator locks to the target
  // and prevents intermediate section highlighting during the smooth scroll animation
  window.dispatchEvent(
    new CustomEvent<NavScrollDetail>(NAV_SCROLL_EVENT, {
      detail: { id },
    })
  );

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Header offset calculation
  const header = document.querySelector("header");
  const navHeight = header ? header.getBoundingClientRect().height : 76;

  // Check if Lenis smooth scrolling instance is available
  interface LenisGlobal {
    scrollTo: (target: number | HTMLElement | string, options?: { offset?: number; duration?: number; immediate?: boolean }) => void;
  }
  const lenis = (window as unknown as { __lenis?: LenisGlobal }).__lenis;

  if (lenis && !isReducedMotion) {
    if (id === "home") {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      const section = document.getElementById(id);
      if (section) {
        lenis.scrollTo(section, { offset: -navHeight, duration: 1.2 });
      }
    }
    try {
      window.history.replaceState(null, "", `#${id}`);
    } catch {
      // Ignore if history state update is restricted
    }
    return;
  }

  // Fallback if Lenis is not active or reduced motion is preferred
  const behavior: ScrollBehavior = isReducedMotion ? "auto" : "smooth";

  if (id === "home") {
    window.scrollTo({ top: 0, behavior });
    try {
      window.history.replaceState(null, "", "#home");
    } catch {
      // Ignore
    }
    return;
  }

  const section = document.getElementById(id);
  if (!section) return;

  const elementTop = section.getBoundingClientRect().top + window.scrollY;
  const targetY = Math.max(0, Math.round(elementTop - navHeight));

  window.scrollTo({ top: targetY, behavior });
  try {
    window.history.replaceState(null, "", `#${id}`);
  } catch {
    // Ignore
  }
}
