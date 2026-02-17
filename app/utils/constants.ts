/**
 * Design System Constants
 * Centralized values for spacing, colors, typography, and breakpoints
 */

// Spacing Scale (in rem)
export const SPACING = {
  xs: "0.25rem", // 4px
  sm: "0.5rem",  // 8px
  md: "1rem",    // 16px
  lg: "1.5rem",  // 24px
  xl: "2rem",    // 32px
  "2xl": "2.5rem", // 40px
  "3xl": "3rem",   // 48px
} as const;

// Responsive Spacing (breakpoint-aware)
export const RESPONSIVE_SPACING = {
  container: {
    mobile: SPACING.md,    // 16px on mobile
    tablet: SPACING.lg,    // 24px on tablet
    desktop: SPACING.xl,   // 32px on desktop
  },
  padding: {
    mobile: SPACING.md,    // 16px
    tablet: SPACING.lg,    // 24px
    desktop: SPACING.xl,   // 32px
  },
} as const;

// Colors
export const COLORS = {
  primary: "#1A1B1C",      // Dark/Black
  accent: "#ff6f59",       // Orange/Red
  secondary: "#2d9cdb",    // Blue
  gray: {
    light: "#F3F3F4",
    medium: "#E1E1E2",
    dark: "#A0A4AB",
  },
  text: "#1A1B1C",
  border: "#E5E7EB",
  white: "#ffffff",
  transparent: "transparent",
} as const;

// Typography
export const TYPOGRAPHY = {
  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
    "7xl": "72px",
    "8xl": "96px",
    "9xl": "128px",
  },
  fontWeight: {
    light: 300,
    normal: 400,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: "120px",
    normal: "1.5",
    relaxed: "1.75",
  },
  letterSpacing: {
    tight: "-0.07em",
    normal: "0em",
    wide: "0.15em",
    wider: "0.2em",
  },
} as const;

// Breakpoints
export const BREAKPOINTS = {
  mobile: "0px",      // xs
  tablet: "640px",    // sm
  desktop: "1024px",  // md
  large: "1280px",    // lg
  xlarge: "1536px",   // xl
} as const;

// Z-index Stack
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  tooltip: 60,
  notification: 70,
} as const;

// Animation / Transition
export const TRANSITIONS = {
  fast: "150ms",
  normal: "300ms",
  slow: "500ms",
} as const;

export const EASING = {
  linear: "linear",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  emphasize: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
} as const;

// Border Radius
export const BORDER_RADIUS = {
  none: "0",
  sm: "0.25rem",   // 4px
  md: "0.5rem",    // 8px
  lg: "1rem",      // 16px
  full: "9999px",
} as const;

// Shadow
export const SHADOWS = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
} as const;
