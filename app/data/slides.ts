export type ButtonConfig = {
  text: string;
  position?: "top-left" | "bottom-left" | "bottom-right";
  navigateTo?: string;
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
  textAlign?: "left" | "center" | "right";
  kickerPosition?: "default" | "top-left" | "top-right";
  kickerStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  backButton?: ButtonConfig;
  nextButton?: ButtonConfig;
  resetButton?: ButtonConfig;
  confirmButton?: ButtonConfig;
  decorations?: {
    left?: DecorationConfig;
    right?: DecorationConfig;
  };
  decorationsLayer?: "content" | "screen";
  overlays?: OverlayConfig[];
  footerContent?: "text" | "button" | "both" | "none";
  twoColumnImages?: {
    leftImageSrc: string;
    leftImageAlt: string;
    rightImageSrc: string;
    rightImageAlt: string;
  };
  customComponent?: "analysisCategories" | "demographics" | "cosmeticConcerns";
};

export const slides: Slide[] = [
  {
    id: "000",
    kicker: "",
    title: "Sophisticated skincare",
    body: "",
    stats: [""],
    accent: "#ff6f59",
    textAlign: "center",
    backButton: { text: "DISCOVER A.I." },
    nextButton: { text: "TAKE TEST", navigateTo: "002" },
    footerContent: "text",
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
    id: "002",
    kicker: "TO START ANALYSIS",
    title: "CLICK TO TYPE",
    body:
      "Introduce Yourself",
    stats: ["Data-driven", "One component", "Fast iteration"],
    accent: "#2d9cdb",
    kickerPosition: "top-left",
    kickerStyle: {
      position: "absolute",
      top: "86px",
      left: "32px",
      width: "227px",
      height: "24px",
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "-0.02em",
      textTransform: "uppercase",
      opacity: 1,
    },
    titleStyle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -80px)",
      whiteSpace: "nowrap",
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "24px",
      letterSpacing: "0em",
      textTransform: "uppercase",
      opacity: 0.4,
    },
    bodyStyle: {
      position: "absolute",
      top: "calc(50% - 24px)",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "500px",
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 400,
      fontSize: "clamp(45px, 12vw, 60px)",
      lineHeight: "64px",
      letterSpacing: "-0.08em",
      textAlign: "center",
      opacity: 1,
      borderBottom: "1px solid #D1D5DB",
    },
    backButton: undefined,
    nextButton: undefined,
    footerContent: "button",
    decorationsLayer: "screen",
    decorations: {
      right: {
        src: "/rombusescenter.svg",
        alt: "center decoration",
        width: 762,
        height: 762,
        className:
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
      },
    },
  },
  {
    id: "504",
    kicker: "TO START ANALYSIS",
    title: "CLICK TO TYPE",
    body:
      "Where are you from?",
    stats: ["Data-driven", "One component", "Fast iteration"],
    accent: "#2d9cdb",
    kickerPosition: "top-left",
    kickerStyle: {
      position: "absolute",
      top: "86px",
      left: "32px",
      width: "227px",
      height: "24px",
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "-0.02em",
      textTransform: "uppercase",
      opacity: 1,
    },
    titleStyle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -80px)",
      whiteSpace: "nowrap",
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "24px",
      letterSpacing: "0em",
      textTransform: "uppercase",
      opacity: 0.4,
    },
    bodyStyle: {
      position: "absolute",
      top: "calc(50% - 24px)",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "500px",
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 400,
      fontSize: "clamp(39px, 10vw, 52px)",
      lineHeight: "60px",
      letterSpacing: "-0.07em",
      textAlign: "center",
      opacity: 1,
      borderBottom: "1px solid #D1D5DB",
    },
    backButton: undefined,
    nextButton: undefined,
    footerContent: "button",
    decorationsLayer: "screen",
    decorations: {
      right: {
        src: "/rombusescenter.svg",
        alt: "center decoration",
        width: 762,
        height: 762,
        className:
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
      },
    },
  },
  {
    id: "005",
    backButton: { text: "BACK", navigateTo: "504", position: "bottom-left" },
    nextButton: undefined,
    footerContent: "none",
    twoColumnImages: {
      leftImageSrc: "/camera.svg",
      leftImageAlt: "camera",
      rightImageSrc: "/gallery.svg",
      rightImageAlt: "gallery",
    },
  },
  {
    id: "006",
    kicker: "A.I. ANALYSIS",
    kickerPosition: "top-left",
    kickerStyle: {
      fontWeight: 700,
    },
    title: "A.I. HAS ESTIMATED THE FOLLOWING.\nFIX ESTIMATED INFORMATION IF NEEDED",
    titleStyle: {
      fontSize: "16px",
      fontWeight: 400,
      letterSpacing: "0.15em",
      lineHeight: "24px",
      marginBottom: "40px",
      whiteSpace: "pre-wrap",
    },
    backButton: { text: "back" },
    nextButton: { text: "get summary" },
    footerContent: "button",
    customComponent: "analysisCategories",
  },
  {
    id: "007",
    kicker: "A.I. ANALYSIS",
    kickerPosition: "top-left",
    kickerStyle: {
      position: "absolute",
      top: "86px",
      left: "32px",
      fontWeight: 700,
    },
    title: "DEMOGRAPHICS",
    textAlign: "left",
    titleStyle: {
      position: "absolute",
      top: "120px",
      left: "32px",
      fontSize: "clamp(36px, 10vw, 72px)",
      fontWeight: 400,
      lineHeight: "clamp(36px, 10vw, 72px)",
    },
    body: "PREDICTED RACE & AGE",
    bodyStyle: {
      position: "absolute",
      top: "210px",
      left: "32px",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "24px",
      color: "#1A1B1C",
      maxWidth: "520px",
      textAlign: "left",
    },
    backButton: { text: "back", navigateTo: "006" },
    resetButton: { text: "RESET", navigateTo: "006" },
    confirmButton: { text: "CONFIRM" },
    footerContent: "button",
    customComponent: "demographics",
  },
  {
    id: "009",
    kicker: "A.I. ANALYSIS",
    kickerPosition: "top-left",
    kickerStyle: {
      position: "absolute",
      top: "86px",
      left: "32px",
      fontWeight: 700,
    },
    title: "COSMETIC CONCERNS",
    textAlign: "left",
    titleStyle: {
      position: "absolute",
      top: "120px",
      left: "32px",
      fontSize: "72px",
      fontWeight: 400,
      lineHeight: "72px",
    },
    body: "SKIN HEALTH & AGEING",
    bodyStyle: {
      position: "absolute",
      top: "210px",
      left: "32px",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "24px",
      color: "#1A1B1C",
      maxWidth: "520px",
      textAlign: "left",
    },
    backButton: { text: "back", navigateTo: "006" },
    resetButton: { text: "RESET", navigateTo: "006" },
    confirmButton: { text: "CONFIRM" },
    footerContent: "button",
    customComponent: "cosmeticConcerns",
  },
];

