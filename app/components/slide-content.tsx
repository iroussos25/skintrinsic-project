import React from "react";
import Image from "next/image";
import { AnimatedTitle } from "./AnimatedTitle";
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
  introNextButton?: {
    text: string;
    onClick: () => void;
  };
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
  introNextButton,
}: SlideContentProps) {

  const isIntroSlide = slide.id === "000";

  // For intro slide, keep layout constant to avoid jumps - only transform should move things
  const mainPaddingClass = isIntroSlide
    ? "px-0"
    : textAlign === "left"
      ? "pl-4 sm:pl-6 md:pl-8"
      : textAlign === "right"
        ? "pr-4 sm:pr-6 md:pr-8"
        : "px-0";
  const textAlignClass = isIntroSlide
    ? "text-center"
    : textAlign === "left"
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
          <>
            {/* Mobile title - 50% smaller */}
            <h1 
              className="block sm:hidden text-[#1A1B1C]" 
              style={{
                ...slide.titleStyle,
                fontSize: slide.titleStyle.fontSize 
                  ? `calc(${slide.titleStyle.fontSize} * 0.5)` 
                  : '36px',
                lineHeight: slide.titleStyle.lineHeight 
                  ? `calc(${slide.titleStyle.lineHeight} * 0.5)` 
                  : '36px',
              }}
            >
              {slide.title}
            </h1>
            {/* Desktop title - original size */}
            <h1 className="hidden sm:block text-[#1A1B1C]" style={slide.titleStyle}>
              {slide.title}
            </h1>
          </>
        ) : isIntroSlide ? (
          <>
            <div className="flex flex-col items-center gap-8 sm:hidden" style={{ rowGap: "calc(2rem + 50px)" }}>
              <h1
                className="text-[#1A1B1C]"
                style={{
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 300,
                  fontSize: "clamp(36px, 10vw, 56px)",
                  lineHeight: "clamp(36px, 10vw, 56px)",
                  letterSpacing: "-0.07em",
                  textAlign: "center",
                }}
              >
                {slide.title}
              </h1>
              {introNextButton && (
                <button
                  onClick={introNextButton.onClick}
                  className="flex items-center gap-3 transition hover:opacity-80"
                >
                  <span
                    className="font-semibold text-[#1A1B1C]"
                    style={{ fontSize: "clamp(12px, 3vw, 14px)" }}
                  >
                    {introNextButton.text}
                  </span>
                  <Image src="/next-slide.svg" alt="next" width={44} height={44} />
                </button>
              )}
            </div>
            <div className="hidden sm:block">
              <AnimatedTitle text={slide.title || ""} align={textAlign} styleOverride={titleStyleOverride} />
            </div>
          </>
        ) : (
          <h1
            className={
              textAlign === "left"
                ? "max-w-5xl leading-none px-4 sm:px-0"
                : textAlign === "right"
                  ? "ml-auto max-w-5xl leading-none px-4 sm:px-0"
                  : "mx-auto max-w-5xl leading-none px-4 sm:px-0"
            }
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 300,
              fontSize: "clamp(32px, 8vw, 128px)",
              lineHeight: "clamp(32px, 8vw, 120px)",
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
