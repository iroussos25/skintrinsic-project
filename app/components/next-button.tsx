import Image from "next/image";
import { ButtonConfig } from "@/app/data/slides";

type NextButtonProps = {
  button: ButtonConfig;
  isLast: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  showIntroDecoration?: boolean;
  hideOnSmallScreens?: boolean;
};

export default function NextButton({
  button,
  isLast,
  onMouseEnter,
  onMouseLeave,
  onClick,
  showIntroDecoration = false,
  hideOnSmallScreens = false,
}: NextButtonProps) {
  // For intro slide, use fixed positioning to anchor to viewport
  const positionClass = showIntroDecoration
    ? "fixed right-4 sm:right-6 md:right-8 top-1/2 z-30 flex -translate-y-1/2 items-center gap-3 sm:gap-4 transition hover:opacity-80"
    : "absolute right-4 sm:right-6 md:right-8 top-1/2 z-30 flex -translate-y-1/2 items-center gap-3 sm:gap-4 transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40";
  const visibilityClass = hideOnSmallScreens ? "hidden sm:flex" : "";

  return (
    <div
      className={`${positionClass} ${visibilityClass}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className="font-semibold text-[#1A1B1C] text-xs sm:text-sm" style={{ fontSize: "clamp(12px, 1vw, 14px)" }}>
        {button.text}
      </span>
      <button
        onClick={onClick}
        disabled={isLast}
        className="cursor-pointer transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Image src="/next-slide.svg" alt="next" width={44} height={44} />
      </button>
      {/* Intro decoration - rotated dashed square */}
      {showIntroDecoration && (
        <div
          className="pointer-events-none hidden sm:block fixed top-1/2 z-10 -translate-y-1/2 intro-square-decoration"
          style={{
            width: "602px",
            height: "602px",
            right: "-350px",
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
    </div>
  );
}
