export interface Project {
  name: string;
  category: string;
  year: string;
  accent: string;
  number: string;
}

export const projects: Project[] = [
  {
    name: "Tidal House",
    category: "Identity / Digital",
    year: "2026",
    accent: "from-cyan-300/70 via-sky-500/30 to-indigo-950",
    number: "01",
  },
  {
    name: "Afterglow FM",
    category: "Campaign / Motion",
    year: "2025",
    accent: "from-fuchsia-300/70 via-rose-500/30 to-violet-950",
    number: "02",
  },
  {
    name: "Northline Objects",
    category: "Commerce / Art Direction",
    year: "2025",
    accent: "from-amber-200/70 via-orange-500/30 to-stone-950",
    number: "03",
  },
  {
    name: "Still Current",
    category: "Editorial / Web",
    year: "2024",
    accent: "from-emerald-200/70 via-teal-500/30 to-slate-950",
    number: "04",
  },
  {
    name: "Soft Signal",
    category: "Launch / Experience",
    year: "2024",
    accent: "from-lime-200/70 via-green-500/30 to-zinc-950",
    number: "05",
  },
  {
    name: "Open Water",
    category: "Culture / Film",
    year: "2023",
    accent: "from-blue-200/70 via-blue-700/35 to-slate-950",
    number: "06",
  },
];
