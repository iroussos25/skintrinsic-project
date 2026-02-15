"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import { slides } from "./data/slides";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = useMemo(() => slides[activeIndex], [activeIndex]);
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === slides.length - 1;

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-[#1A1B1C]">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col">
        <Header />

        {slide.backButton && (
          <div className="absolute left-6 top-1/2 z-20 flex -translate-y-1/2 items-center gap-4 transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40">
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
          <div className="absolute right-6 top-1/2 z-20 flex -translate-y-1/2 items-center gap-4 transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40">
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

        <main className="flex flex-1 items-center justify-center px-6 pb-8">
          <div key={slide.id} className="animate-slide-reveal w-full text-center">
            <p className="mb-12 text-sm uppercase tracking-[0.35em] text-neutral-600">
              {slide.kicker}
            </p>
            <h1
              className="mx-auto max-w-5xl leading-none"
              style={{
                fontFamily: '"Roobert TRIAL", sans-serif',
                fontWeight: 300,
                fontSize: "128px",
                lineHeight: "120px",
                letterSpacing: "-0.07em",
                textAlign: "center",
                color: "#1A1B1C",
              }}
            >
              {slide.title}
            </h1>
            <p className="mx-auto mt-12 max-w-2xl text-base leading-relaxed text-neutral-700">
              {slide.body}
            </p>
          </div>
        </main>

        <div className="relative flex items-center justify-between px-6 pb-8">
          <Image src="/left-rect.svg" alt="decoration" width={64} height={64} className="absolute left-0" />
          <Image src="/right-rect.svg" alt="decoration" width={64} height={64} className="absolute right-0" />
        </div>

        <Footer current={activeIndex + 1} total={slides.length} />
      </div>
    </div>
  );
}
