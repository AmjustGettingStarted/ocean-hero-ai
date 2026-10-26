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

export function scrollToSection(id: SectionId) {
  const section = document.getElementById(id);
  if (!section) return;

  section.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}
