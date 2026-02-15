export type ButtonConfig = {
  text: string;
  position?: "left" | "right";
};

export type DecorationConfig = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export type OverlayConfig = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
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
  decorations?: {
    left?: DecorationConfig;
    right?: DecorationConfig;
  };
  overlays?: OverlayConfig[];
};

export const slides: Slide[] = [
  {
    id: "overview",
    kicker: "",
    title: "Sophisticated skincare",
    body: "",
    stats: [""],
    accent: "#ff6f59",
    backButton: { text: "DISCOVER A.I." },
    nextButton: { text: "TAKE TEST" },
    decorations: {
      left: {
        src: "/left-rect.svg",
        alt: "left decoration",
        width: 301,
        height: 301,
        className: "absolute left-0 top-1/2 -translate-y-[calc(50%+293px)]",
      },
      right: {
        src: "/right-rect.svg",
        alt: "right decoration",
        width: 301,
        height: 301,
        className: "absolute right-0 top-1/2 -translate-y-[calc(50%+293px)]",
      },
    },
    overlays: [
      {
        src: "/coursor.svg",
        alt: "coursor",
        width: 143,
        height: 122,
        className:
          "absolute left-1/2 top-[70%] z-40 -translate-x-1/2 -translate-y-1/2 translate-x-[220px] opacity-50",
      },
    ],
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
    decorations: {
      left: {
        src: "/left-rect.svg",
        alt: "left decoration",
        width: 64,
        height: 64,
        className: "absolute left-0",
      },
      right: {
        src: "/right-rect.svg",
        alt: "right decoration",
        width: 64,
        height: 64,
        className: "absolute right-0",
      },
    },
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
    decorations: {
      left: {
        src: "/left-rect.svg",
        alt: "left decoration",
        width: 64,
        height: 64,
        className: "absolute left-0",
      },
      right: {
        src: "/right-rect.svg",
        alt: "right decoration",
        width: 64,
        height: 64,
        className: "absolute right-0",
      },
    },
  },
];
