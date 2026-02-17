/**
 * Tailwind Utility Classes
 * Reusable class combinations for common patterns
 */

export const BUTTON_STYLES = {
  primary: "cursor-pointer rounded-full bg-[#1A1B1C] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed",
  secondary: "cursor-pointer rounded-full border border-[#1A1B1C] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#1A1B1C] transition hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed",
  ghost: "cursor-pointer transition hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed",
} as const;

export const MODAL_OVERLAY = "fixed inset-0 z-40 bg-black/50 flex items-center justify-center";
export const MODAL_CONTENT = "w-90 sm:w-full sm:mx-4 rounded-lg border border-[#E5E7EB] bg-white p-6 text-[#1A1B1C] shadow-lg";

export const INPUT_STYLES = "h-full w-full bg-transparent text-center placeholder:text-[#1A1B1C]/60 focus:outline-none disabled:opacity-60";

export const TEXT_SIZES = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
} as const;

export const FLEX_CENTERED = "flex items-center justify-center";
export const FLEX_BETWEEN = "flex items-center justify-between";
export const FLEX_COLUMN = "flex flex-col items-center justify-center";

export const RESPONSIVE_PADDING = {
  container: "px-4 sm:px-6 md:px-8",
  section: "px-4 sm:px-6 md:px-8 lg:px-12",
  card: "p-4 sm:p-6 md:p-8",
} as const;

export const RESPONSIVE_FONT = {
  title: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
  heading: "text-2xl sm:text-3xl md:text-4xl",
  subheading: "text-lg sm:text-xl md:text-2xl",
  body: "text-sm sm:text-base md:text-lg",
  caption: "text-xs sm:text-sm",
} as const;

export const RESPONSIVE_SPACING_X = "px-4 sm:px-6 md:px-8 lg:px-12";
export const RESPONSIVE_SPACING_Y = "py-4 sm:py-6 md:py-8 lg:py-12";

/**
 * Utility function to combine Tailwind classes
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Utility function to get responsive breakpoint value
 */
export function getResponsiveValue(mobile: string, tablet: string, desktop: string): string {
  return `${mobile} sm:${tablet} md:${desktop}`;
}
