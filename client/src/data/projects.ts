export interface Project {
  name: string;
  category: string;
  year: string;
  accent: string;
  number: string;
  image: string;
  alt: string;
  description: string;
}

export const projects: Project[] = [
  {
    name: "Tidal House",
    category: "Identity / Digital",
    year: "2026",
    accent: "from-cyan-300/70 via-sky-500/30 to-indigo-950",
    number: "01",
    image: "/images/projects/tidal-house.jpg",
    alt: "Minimalist concrete tidal pavilion on reflective coastal water at twilight",
    description: "An architectural and digital exploration balancing coastal atmosphere with precise geometric craft.",
  },
  {
    name: "Afterglow FM",
    category: "Campaign / Motion",
    year: "2025",
    accent: "from-fuchsia-300/70 via-rose-500/30 to-violet-950",
    number: "02",
    image: "/images/projects/afterglow-fm.jpg",
    alt: "Immersive neon magenta and violet soundstage with fluid waveforms and luminous light beams",
    description: "Visual identity and reactive kinetic campaign system for a late-night sound broadcast network.",
  },
  {
    name: "Northline Objects",
    category: "Commerce / Art Direction",
    year: "2025",
    accent: "from-amber-200/70 via-orange-500/30 to-stone-950",
    number: "03",
    image: "/images/projects/northline-objects.jpg",
    alt: "Sculptural ceramic vessels and stone objects on sandstone pedestal in golden hour light",
    description: "Spatial art direction and bespoke digital boutique for artisanal ceramics and natural stone artifacts.",
  },
  {
    name: "Still Current",
    category: "Editorial / Web",
    year: "2024",
    accent: "from-emerald-200/70 via-teal-500/30 to-slate-950",
    number: "04",
    image: "/images/projects/still-current.jpg",
    alt: "Deep emerald ocean waves with sunlight beams piercing dark underwater depths",
    description: "An immersive digital editorial and long-form visual investigation into global deep-sea currents.",
  },
  {
    name: "Soft Signal",
    category: "Launch / Experience",
    year: "2024",
    accent: "from-lime-200/70 via-green-500/30 to-zinc-950",
    number: "05",
    image: "/images/projects/soft-signal.jpg",
    alt: "Kinetic lime-green neon light sculpture suspended in a misty dark gallery space",
    description: "Interactive brand launch environment merging fluid light structures with generative acoustic responses.",
  },
  {
    name: "Open Water",
    category: "Culture / Film",
    year: "2023",
    accent: "from-blue-200/70 via-blue-700/35 to-slate-950",
    number: "06",
    image: "/images/projects/open-water.jpg",
    alt: "Full bleed dramatic wide photograph of an ocean vessel navigating churning cobalt blue waves under twilight storm clouds",
    description: "Title sequences, typographic systems, and promotional campaign for an oceanic feature documentary.",
  },
];
