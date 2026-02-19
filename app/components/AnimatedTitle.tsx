import React from "react";

interface AnimatedTitleProps {
  text: string;
  align: "left" | "center" | "right";
  styleOverride?: React.CSSProperties;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text, align, styleOverride }) => {
  // Calculate transform based on align - slide to screen edges
  let transform = "translateX(0)";
  if (align === "left") transform = "translateX(calc(-50vw + 50%))";
  else if (align === "right") transform = "translateX(calc(50vw - 50%))";

  return (
    <h1
      // Always keep centered layout to avoid layout jumps - only transform moves the title
      className="mx-auto max-w-5xl leading-none text-center"
      style={{
        fontFamily: '"Poppins", sans-serif',
        fontWeight: 300,
        fontSize: "clamp(48px, 12vw, 128px)",
        lineHeight: "clamp(48px, 12vw, 120px)",
        letterSpacing: "-0.07em",
        color: "#1A1B1C",
        display: "inline-block",
        willChange: "transform",
        transform,
        transition: "transform 1.2s cubic-bezier(0.77, 0, 0.175, 1)",
        ...styleOverride,
      }}
    >
      {text}
    </h1>
  );
};
