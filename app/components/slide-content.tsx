import React from "react";
import { Slide } from "@/app/data/slides";
import SlideForm from "./slide-form";

type SlideContentProps = {
  slide: Slide;
  textAlign: "left" | "center" | "right";
  isNameSlide: boolean;
  isLoadingLocation: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  titleStyleOverride?: React.CSSProperties;
};

export default function SlideContent({
  slide,
  textAlign,
  isNameSlide,
  isLoadingLocation,
  isSubmitting,
  submitError,
  inputValue,
  onInputChange,
  onFormSubmit,
  titleStyleOverride,
}: SlideContentProps) {

  const mainPaddingClass =
    textAlign === "left"
      ? "pl-4 sm:pl-6 md:pl-8"
      : textAlign === "right"
        ? "pr-4 sm:pr-6 md:pr-8"
        : "px-0";
  const textAlignClass =
    textAlign === "left"
      ? "text-left"
      : textAlign === "right"
        ? "text-right"
        : "text-center";

  return (
    <main
      className={`flex flex-1 items-center justify-center pb-4 sm:pb-6 md:pb-8 ${mainPaddingClass}`}
    >
      <div
        key={slide.id}
        className={`w-full ${textAlignClass}`}
      >
        {!slide.kickerPosition && slide.kicker && (
          <p className="mb-8 sm:mb-10 md:mb-12 text-xs sm:text-sm uppercase tracking-[0.35em] text-neutral-600">
            {slide.kicker}
          </p>
        )}

        {slide.titleStyle ? (
          <h1 className="text-[#1A1B1C]" style={slide.titleStyle}>
            {slide.title}
          </h1>
        ) : slide.id === "000" && titleStyleOverride ? (
          <h1
            className={
              textAlign === "left"
                ? "max-w-5xl leading-none"
                : textAlign === "right"
                  ? "ml-auto max-w-5xl leading-none"
                  : "mx-auto max-w-5xl leading-none"
            }
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 300,
              fontSize: "clamp(48px, 12vw, 128px)",
              lineHeight: "clamp(48px, 12vw, 120px)",
              letterSpacing: "-0.07em",
              textAlign,
              color: "#1A1B1C",
              display: "inline-block",
            }}
          >
            {slide.title?.split(" ").map((word, idx) => {
              const currentTransform = titleStyleOverride?.transform;
              const isAnimating = currentTransform !== "translateX(0)";
              const animationClass = 
                currentTransform === "translateX(40px)"
                  ? `intro-title-word-${idx}-left`
                  : currentTransform === "translateX(-40px)"
                    ? `intro-title-word-${idx}-right`
                    : "";

              return (
                <span
                  key={word}
                  className={animationClass}
                  style={{
                    display: "inline-block",
                    marginRight: idx === 0 ? "0.25em" : 0,
                    transitionProperty: isAnimating ? "none" : "transform",
                    transitionDuration: isAnimating ? "0s" : "1s",
                    transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transitionDelay: idx * 200 + "ms",
                    transform: !isAnimating ? currentTransform : undefined,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </h1>
        ) : (
          <h1
            className={
              textAlign === "left"
                ? "max-w-5xl leading-none"
                : textAlign === "right"
                  ? "ml-auto max-w-5xl leading-none"
                  : "mx-auto max-w-5xl leading-none"
            }
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 300,
              fontSize: "clamp(48px, 12vw, 128px)",
              lineHeight: "clamp(48px, 12vw, 120px)",
              letterSpacing: "-0.07em",
              textAlign,
              color: "#1A1B1C",
              display: "inline-block",
              willChange: "transform",
              ...titleStyleOverride,
            }}
          >
            {slide.title}
          </h1>
        )}

        {slide.bodyStyle && isNameSlide ? (
          <SlideForm
            value={inputValue}
            placeholder={slide.body || ""}
            isLoading={isLoadingLocation}
            isSubmitting={isSubmitting}
            submitError={submitError}
            onChange={onInputChange}
            onSubmit={onFormSubmit}
            bodyStyle={slide.bodyStyle}
          />
        ) : slide.bodyStyle ? (
          <p className="text-[#1A1B1C]" style={slide.bodyStyle}>
            {slide.body}
          </p>
        ) : (
          <p
            className={
              textAlign === "left"
                ? "mt-12 max-w-2xl text-base leading-relaxed text-neutral-700"
                : textAlign === "right"
                  ? "ml-auto mt-12 max-w-2xl text-base leading-relaxed text-neutral-700 text-right"
                  : "mx-auto mt-12 max-w-2xl text-base leading-relaxed text-neutral-700"
            }
          >
            {slide.body}
          </p>
        )}
      </div>
    </main>
  );
}
