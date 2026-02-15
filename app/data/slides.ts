export type ButtonConfig = {
  text: string;
  position?: "left" | "right";
};

export type Slide = {
  id: string;
  kicker?: string;
  title?: string;
  body?: string;
  stats?: string[];
  accent?: string;
  backButton?: ButtonConfig;
  nextButton?: ButtonConfig;
};

export const slides: Slide[] = [
  {
    id: "overview",
    kicker: "",
    title: "Sophisticated skincare",
    body: "",
    stats: [""],
    accent: "#ff6f59",
    backButton: undefined,
    nextButton: { text: "TAKE TEST" },
  },
  {
    id: "story",
    kicker: "Audience",
    title: "Designed for confident first impressions",
    body:
      "Each slide builds trust with a clean layout, bold typography, and a calm color rhythm. The content swaps while the frame stays stable.",
    stats: ["Minimal UI chrome", "Focused CTA", "Reusable layout"],
    accent: "#2f80ed",
    backButton: { text: "DISCOVER A.I." },
    nextButton: { text: "TAKE TEST" },
  },
  {
    id: "next",
    kicker: "Execution",
    title: "Easy to extend and reorder",
    body:
      "Adding a slide is just adding data. The deck can scale to new sections without duplicating layout code or design tokens.",
    stats: ["Data-driven", "One component", "Fast iteration"],
    accent: "#2d9cdb",
    backButton: { text: "DISCOVER A.I." },
    nextButton: undefined,
  },
];
