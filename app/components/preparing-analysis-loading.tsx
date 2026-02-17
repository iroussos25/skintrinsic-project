"use client";

import { useEffect } from "react";
import Image from "next/image";

type PreparingAnalysisLoadingProps = {
  isOpen: boolean;
  onComplete: () => void;
};

export default function PreparingAnalysisLoading({
  isOpen,
  onComplete,
}: PreparingAnalysisLoadingProps) {
  useEffect(() => {
    if (!isOpen) return;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Auto-close after 5 seconds (or adjust as needed)
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center">
        {/* Rombuses decoration */}
        <div className="relative">
          <div className="relative h-101.25 w-101.25 sm:h-80 sm:w-80 md:h-101.25 md:w-101.25">
            <Image
              src="/rombusescenter.svg"
              alt="decoration"
              width={405}
              height={405}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin brightness-[0.8] contrast-[1.1]"
              style={{ animationDuration: "8s" }}
            />
          </div>
        </div>

        {/* "PREPARING YOUR ANALYSIS..." text */}
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#1A1B1C]">
          Preparing Your Analysis...
        </p>
      </div>
    </div>
  );
}
