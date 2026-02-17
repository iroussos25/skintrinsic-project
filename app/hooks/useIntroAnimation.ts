/**
 * Custom hook for managing intro slide hover animations
 * Centralizes the logic for title animation state and styling
 */

import { useState, useMemo } from "react";

export function useIntroAnimation(isIntroSlide: boolean) {
  const [introHoverSide, setIntroHoverSide] = useState<"left" | "right" | null>(null);

  const effectiveTextAlign = useMemo(() => {
    if (!isIntroSlide) return "center";
    
    return introHoverSide === "right"
      ? "left"
      : introHoverSide === "left"
        ? "right"
        : "center";
  }, [isIntroSlide, introHoverSide]);

  const introTitleStyleOverride = useMemo(
    () =>
      isIntroSlide
        ? {
            transform:
              introHoverSide === "right"
                ? "translateX(-40px)"
                : introHoverSide === "left"
                  ? "translateX(40px)"
                  : "translateX(0)",
          }
        : undefined,
    [isIntroSlide, introHoverSide]
  );

  return {
    introHoverSide,
    setIntroHoverSide,
    effectiveTextAlign,
    introTitleStyleOverride,
  };
}
