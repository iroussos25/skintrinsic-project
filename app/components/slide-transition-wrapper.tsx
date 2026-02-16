import React from "react";

type SlideTransitionWrapperProps = {
  children: React.ReactNode;
  direction: "forward" | "backward";
};

export default function SlideTransitionWrapper({
  children,
  direction,
}: SlideTransitionWrapperProps) {
  const animationClass =
    direction === "forward"
      ? "animate-slide-in-right"
      : "animate-slide-in-left";

  return (
    <div className={`flex flex-1 flex-col w-full overflow-hidden ${animationClass}`}>
      {children}
    </div>
  );
}
