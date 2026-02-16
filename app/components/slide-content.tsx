import React from "react";
import { Slide } from "@/app/data/slides";
import SlideForm from "./slide-form";

type SlideContentProps = {
  slide: Slide;
  textAlign: "left" | "center";
  isNameSlide: boolean;
  isLoadingLocation: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
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
}: SlideContentProps) {
  return (
    <main
      className={`flex flex-1 items-center justify-center pb-8 ${
        textAlign === "left" ? "pl-8" : "px-0"
      }`}
    >
      <div
        key={slide.id}
        className={`w-full ${textAlign === "left" ? "text-left" : "text-center"}`}
      >
        {!slide.kickerPosition && slide.kicker && (
          <p className="mb-12 text-sm uppercase tracking-[0.35em] text-neutral-600">
            {slide.kicker}
          </p>
        )}

        {slide.titleStyle ? (
          <h1 className="text-[#1A1B1C]" style={slide.titleStyle}>
            {slide.title}
          </h1>
        ) : (
          <h1
            className={
              textAlign === "left"
                ? "max-w-5xl leading-none"
                : "mx-auto max-w-5xl leading-none"
            }
            style={{
              fontFamily: '"Roobert TRIAL", sans-serif',
              fontWeight: 300,
              fontSize: "128px",
              lineHeight: "120px",
              letterSpacing: "-0.07em",
              textAlign,
              color: "#1A1B1C",
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
