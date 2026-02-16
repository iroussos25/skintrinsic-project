"use client";

import Image from "next/image";

export default function AnalysisCategoriesLayout() {
  return (
    <div className="relative flex flex-1 items-center justify-center">
      {/* Background rombus decoration - static */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-125">
        <Image
          src="/rombusescenter.svg"
          alt="background decoration"
          width={602}
          height={602}
          className="brightness-[0.8] contrast-[1.1]"
        />
      </div>

      {/* Four rombuses forming a diamond */}
      <div className="relative">
        {/* Top rombus - Demographics */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-38.5 w-38.5 -rotate-45 items-center justify-center border-2 border-[#1A1B1C] bg-[#F3F3F4] hover:bg-[#E1E1E2] transition cursor-pointer">
            <span className="rotate-45 text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1B1C]">
              Demographics
            </span>
          </div>
        </div>

        {/* Left rombus - Skin Type Details */}
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-38.5 w-38.5 -rotate-45 items-center justify-center border-2 border-[#1A1B1C] bg-[#F3F3F4] hover:bg-[#E1E1E2] transition cursor-pointer">
            <span className="rotate-45 text-center text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1B1C] px-2">
              Skin Type<br />Details
            </span>
          </div>
        </div>

        {/* Right rombus - Cosmetic Concerns */}
        <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
          <div className="flex h-38.5 w-38.5 -rotate-45 items-center justify-center border-2 border-[#1A1B1C] bg-[#F3F3F4] hover:bg-[#E1E1E2] transition cursor-pointer">
            <span className="rotate-45 text-center text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1B1C] px-2">
              Cosmetic<br />Concerns
            </span>
          </div>
        </div>

        {/* Bottom rombus - Weather */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">
          <div className="flex h-38.5 w-38.5 -rotate-45 items-center justify-center border-2 border-[#1A1B1C] bg-[#F3F3F4] hover:bg-[#E1E1E2] transition cursor-pointer">
            <span className="rotate-45 text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1B1C]">
              Weather
            </span>
          </div>
        </div>

        {/* Container for proper spacing */}
        <div className="h-54.75 w-54.75" />
      </div>
    </div>
  );
}
