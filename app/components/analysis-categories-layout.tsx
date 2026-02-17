"use client";

import Image from "next/image";

type AnalysisCategoriesLayoutProps = {
  onSelectDemographics?: () => void;
  onSelectSkinTypeDetails?: () => void;
  onSelectCosmeticConcerns?: () => void;
  onSelectWeather?: () => void;
};

export default function AnalysisCategoriesLayout({
  onSelectDemographics,
  onSelectSkinTypeDetails,
  onSelectCosmeticConcerns,
  onSelectWeather,
}: AnalysisCategoriesLayoutProps) {
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
          <button
            type="button"
            onClick={onSelectDemographics}
            className="flex h-38.5 w-38.5 -rotate-45 items-center justify-center border-2 border-[#1A1B1C] bg-[#F3F3F4] transition hover:bg-[#E1E1E2] cursor-pointer"
            aria-label="Demographics"
          >
            <span className="rotate-45 text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1B1C]">
              Demographics
            </span>
          </button>
        </div>

        {/* Left rombus - Skin Type Details */}
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <button
            type="button"
            onClick={onSelectSkinTypeDetails}
            className="flex h-38.5 w-38.5 -rotate-45 items-center justify-center border-2 border-[#1A1B1C] bg-[#F3F3F4] transition hover:bg-[#E1E1E2] cursor-pointer"
            aria-label="Skin Type Details"
          >
            <span className="rotate-45 text-center text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1B1C] px-2">
              Skin Type<br />Details
            </span>
          </button>
        </div>

        {/* Right rombus - Cosmetic Concerns */}
        <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
          <button
            type="button"
            onClick={onSelectCosmeticConcerns}
            className="flex h-38.5 w-38.5 -rotate-45 items-center justify-center border-2 border-[#1A1B1C] bg-[#F3F3F4] transition hover:bg-[#E1E1E2] cursor-pointer"
            aria-label="Cosmetic Concerns"
          >
            <span className="rotate-45 text-center text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1B1C] px-2">
              Cosmetic<br />Concerns
            </span>
          </button>
        </div>

        {/* Bottom rombus - Weather */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">
          <button
            type="button"
            onClick={onSelectWeather}
            className="flex h-38.5 w-38.5 -rotate-45 items-center justify-center border-2 border-[#1A1B1C] bg-[#F3F3F4] transition hover:bg-[#E1E1E2] cursor-pointer"
            aria-label="Weather"
          >
            <span className="rotate-45 text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1B1C]">
              Weather
            </span>
          </button>
        </div>

        {/* Container for proper spacing */}
        <div className="h-55.5 w-55.5" />
      </div>
    </div>
  );
}
