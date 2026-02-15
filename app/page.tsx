"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import { slides } from "./data/slides";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const slide = useMemo(() => slides[activeIndex], [activeIndex]);
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === slides.length - 1;
  const textAlign = slide.textAlign ?? "center";
  const decorationsLayer = slide.decorationsLayer ?? "content";
  const isNameSlide = ["002", "504"].includes(slide.id);

  const handleNameSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: trimmedName,
        }
      );
    } catch (error) {
      console.error("Failed to submit name", error);
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
                className="text-[#1A1B1C]"
                style={slide.bodyStyle}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={slide.body}
                  autoComplete="name"
                  aria-label="Enter your name"
                  disabled={isSubmitting}
                  className="h-full w-full bg-transparent text-center placeholder:text-[#1A1B1C]/60 focus:outline-none disabled:opacity-60"
                />
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
