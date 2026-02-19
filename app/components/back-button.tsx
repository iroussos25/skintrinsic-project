import Image from "next/image";
import { ButtonConfig } from "@/app/data/slides";

type BackButtonProps = {
  button: ButtonConfig;
  isFirst: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  showIntroDecoration?: boolean;
  hideOnSmallScreens?: boolean;
};

export default function BackButton({
  button,
  isFirst,
  onClick,
  onMouseEnter,
  onMouseLeave,
  showIntroDecoration = false,
  hideOnSmallScreens = false,
}: BackButtonProps) {
  const getPositionClass = () => {
    // For intro slide, use fixed positioning to anchor to viewport
    if (showIntroDecoration) {
      return "fixed left-4 sm:left-6 md:left-8 top-1/2 z-30 flex -translate-y-1/2 items-center gap-3 sm:gap-4";
    }
    switch (button.position) {
      case "bottom-left":
        return "absolute left-4 sm:left-6 md:left-8 bottom-4 sm:bottom-6 md:bottom-8 z-30 flex items-center gap-3 sm:gap-4";
      case "bottom-right":
        return "absolute right-4 sm:right-6 md:right-8 bottom-4 sm:bottom-6 md:bottom-8 z-30 flex items-center gap-3 sm:gap-4 flex-row-reverse";
      default:
        return "absolute left-4 sm:left-6 md:left-8 top-1/2 z-30 flex -translate-y-1/2 items-center gap-3 sm:gap-4";
    }
  };

  const isDisabled = isFirst || !button.navigateTo;
  const visibilityClass = hideOnSmallScreens ? "hidden sm:flex" : "";

  return (
    <div
      className={`${getPositionClass()} ${visibilityClass} transition hover:opacity-80 ${isDisabled ? "cursor-not-allowed opacity-40" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Intro decoration - rotated dashed square */}
      {showIntroDecoration && (
        <div
          className="pointer-events-none hidden sm:block fixed top-1/2 z-10 -translate-y-1/2 intro-square-decoration"
          style={{
            width: "602px",
            height: "602px",
            left: "-350px",
            transform: "rotate(45deg) scale(0.75)",
            opacity: 1,
          }}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 602 602"
            className="h-full w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="600"
              height="600"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeDasharray="4 8"
            />
            <line x1="1" y1="1" x2="601" y2="601" stroke="#000000" strokeWidth="2" strokeDasharray="4 8" />
          </svg>
        </div>
      )}
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`transition hover:opacity-80 ${isDisabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
      >
        <Image src="/back.svg" alt="back" width={44} height={44} />
      </button>
      <span className="font-semibold text-[#1A1B1C]" style={{ fontSize: "14px" }}>
        {button.text}
      </span>
    </div>
  );
}
