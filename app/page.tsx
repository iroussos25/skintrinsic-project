"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import LoadingSkeleton from "./components/loading-skeleton";
import { slides } from "./data/slides";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const slide = useMemo(() => slides[activeIndex], [activeIndex]);
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === slides.length - 1;
  const textAlign = slide.textAlign ?? "center";
  const decorationsLayer = slide.decorationsLayer ?? "content";
  const isNameSlide = ["002", "504"].includes(slide.id);
  const isLocationSlide = slide.id === "504";
  const isLoadingLocation = isLocationSlide && isSubmitting;
  const sanitizeText = (value: string) =>
    value.replace(/[^a-zA-Z\s'-]/g, "");

  const handleNameSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = (isLocationSlide ? location : name).trim();

    if (!trimmedValue || isSubmitting) {
      return;
    }

    setSubmitError(null);

    if (!isLocationSlide) {
      setName(trimmedValue);
      const targetIndex = slides.findIndex((item) => item.id === "504");
      if (targetIndex !== -1) {
        setActiveIndex(targetIndex);
      }
      return;
    }

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: trimmedName, location: trimmedValue }),
        }
      );
      if (response.ok) {
        setActiveIndex((index) => Math.min(slides.length - 1, index + 1));
      } else {
        const reason = await response.text();
        setSubmitError(
          reason ? `Submission failed: ${reason}` : "Submission failed."
        );
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown error";
      setSubmitError(`Submission failed: ${reason}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-[#1A1B1C]">
      {decorationsLayer === "screen" && (
        <div className="pointer-events-none absolute inset-0 z-0">
          {slide.decorations?.left && (
            <Image
              src={slide.decorations.left.src}
              alt={slide.decorations.left.alt}
              width={slide.decorations.left.width}
              height={slide.decorations.left.height}
              className={slide.decorations.left.className}
            />
          )}
          {slide.decorations?.right && (
            <Image
              src={slide.decorations.right.src}
              alt={slide.decorations.right.alt}
              width={slide.decorations.right.width}
              height={slide.decorations.right.height}
              className={slide.decorations.right.className}
            />
          )}
        </div>
      )}
      <div className="relative z-10 flex min-h-screen w-full flex-col">
        <Header onLogoClick={() => setActiveIndex(0)} />

        {slide.overlays?.map((overlay) => (
          <Image
            key={`${overlay.src}-${overlay.alt}`}
            src={overlay.src}
            alt={overlay.alt}
            width={overlay.width}
            height={overlay.height}
            className={overlay.className}
          />
        ))}

        {slide.backButton && (
          <div className="absolute left-8 top-1/2 z-30 flex -translate-y-1/2 items-center gap-4 transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40">
            <button
              onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}
              disabled={isFirst}
              className="transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Image src="/back.svg" alt="back" width={44} height={44} />
            </button>
            <span className="font-semibold text-[#1A1B1C]" style={{ fontSize: "14px" }}>{slide.backButton.text}</span>
          </div>
        )}

        {slide.nextButton && (
          <div className="absolute right-8 top-1/2 z-30 flex -translate-y-1/2 items-center gap-4 transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40">
            <span className="font-semibold text-[#1A1B1C]" style={{ fontSize: "14px" }}>{slide.nextButton.text}</span>
            <button
              onClick={() =>
                setActiveIndex((index) =>
                  Math.min(slides.length - 1, index + 1)
                )
              }
              disabled={isLast}
              className="transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Image src="/next-slide.svg" alt="next" width={44} height={44} />
            </button>
          </div>
        )}

        {slide.kickerPosition === "top-left" && slide.kicker && (
          <p className="text-neutral-600" style={slide.kickerStyle}>
            {slide.kicker}
          </p>
        )}

        <main
          className={`flex flex-1 items-center justify-center pb-8 ${
            textAlign === "left" ? "pl-8" : "px-0"
          }`}
        >
          <div
            key={slide.id}
            className={`w-full ${
              textAlign === "left" ? "text-left" : "text-center"
            }`}
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
              <form
                onSubmit={handleNameSubmit}
                className="relative text-[#1A1B1C]"
                style={slide.bodyStyle}
              >
                <input
                  type="text"
                  value={isLocationSlide ? location : name}
                  onChange={(event) =>
                    isLocationSlide
                      ? setLocation(sanitizeText(event.target.value))
                      : setName(sanitizeText(event.target.value))
                  }
                  placeholder={slide.body}
                  autoComplete="name"
                  aria-label="Enter your name"
                  disabled={isSubmitting}
                  className={`h-full w-full bg-transparent text-center placeholder:text-[#1A1B1C]/60 focus:outline-none disabled:opacity-60 ${
                    isLoadingLocation ? "text-transparent caret-transparent" : ""
                  }`}
                />
                {isLoadingLocation && (
                  <>
                    <LoadingSkeleton />
                    <span
                      className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-[#A0A4AB] border-t-transparent"
                      aria-hidden="true"
                    />
                  </>
                )}
                {submitError && (
                  <span className="mt-3 block text-xs text-red-500">
                    {submitError}
                  </span>
                )}
              </form>
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

        {decorationsLayer !== "screen" && (
          <div className="relative flex items-center justify-between pb-8">
            {slide.decorations?.left && (
              <Image
                src={slide.decorations.left.src}
                alt={slide.decorations.left.alt}
                width={slide.decorations.left.width}
                height={slide.decorations.left.height}
                className={slide.decorations.left.className}
              />
            )}
            {slide.decorations?.right && (
              <Image
                src={slide.decorations.right.src}
                alt={slide.decorations.right.alt}
                width={slide.decorations.right.width}
                height={slide.decorations.right.height}
                className={slide.decorations.right.className}
              />
            )}
          </div>
        )}

        <Footer
          current={activeIndex + 1}
          total={slides.length}
          footerContent={slide.footerContent}
          onBack={() => setActiveIndex((index) => Math.max(0, index - 1))}
        />
      </div>
    </div>
  );
}
