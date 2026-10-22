export interface StudioStat {
  value: number;
  suffix: string;
  label: string;
}

export interface StudioStep {
  title: string;
  description: string;
}

export const studioStats: StudioStat[] = [
  { value: 18, suffix: "+", label: "brands shaped" },
  { value: 9, suffix: "", label: "countries reached" },
  { value: 42, suffix: "m", label: "organic impressions" },
  { value: 6, suffix: " yrs", label: "making work" },
];

export const studioProcess: StudioStep[] = [
  {
    title: "Discover",
    description: "We find the sharpest truth in the brief, then turn it into a point of view.",
  },
  {
    title: "Design",
    description: "We build the visual language, details, and motion system that make it unmistakable.",
  },
  {
    title: "Deliver",
    description: "We bring every touchpoint into focus and leave your team with momentum.",
  },
];

export const studioServices = [
  "Brand strategy",
  "Visual identity",
  "Digital direction",
  "Motion systems",
  "Campaign worlds",
  "Creative partnerships",
] as const;
