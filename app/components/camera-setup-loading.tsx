"use client";

import { useEffect } from "react";
import Image from "next/image";

type CameraSetupLoadingProps = {
  isOpen: boolean;
  onComplete: () => void;
};

export default function CameraSetupLoading({
  isOpen,
  onComplete,
}: CameraSetupLoadingProps) {
  useEffect(() => {
    if (!isOpen) return;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Auto-close after 5 seconds
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
        {/* Camera icon with rombuses */}
        <div className="relative">
          {/* Rombuses decoration */}
          <div className="relative h-101.25 w-101.25">
            <Image
              src="/rombusescenter.svg"
              alt="decoration"
              width={405}
              height={405}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin brightness-[0.8] contrast-[1.1]"
              style={{ animationDuration: "8s" }}
            />
            {/* Camera icon centered */}
            <Image
              src="/camera.svg"
              alt="camera"
              width={136}
              height={136}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>

        {/* "SETTING UP CAMERA..." text */}
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#1A1B1C]">
          Setting Up Camera...
        </p>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#6B7280]">
            For best results, make sure you have
          </p>
          <p className="mt-2 text-sm text-[#1A1B1C]">
            <span className="inline-block">• Neutral Expression</span>
            <span className="mx-2">•</span>
            <span className="inline-block">Frontal Pose</span>
            <span className="mx-2">•</span>
            <span className="inline-block">Adequate Lighting</span>
          </p>
        </div>
      </div>
    </div>
  );
}
