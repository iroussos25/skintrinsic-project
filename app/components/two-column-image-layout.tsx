"use client";

import Image from "next/image";
import { useState } from "react";
import ConfirmModal from "./confirm-modal";
import ImageUploadModal from "./image-upload-modal";
import CameraCaptureModal from "./camera-capture-modal";
import CameraSetupLoading from "./camera-setup-loading";
import PreparingAnalysisLoading from "./preparing-analysis-loading";

type TwoColumnImageLayoutProps = {
  leftImageSrc: string;
  leftImageAlt: string;
  rightImageSrc: string;
  rightImageAlt: string;
  onNavigateToNext?: () => void;
};

export default function TwoColumnImageLayout({
  leftImageSrc,
  leftImageAlt,
  rightImageSrc,
  rightImageAlt,
  onNavigateToNext,
}: TwoColumnImageLayoutProps) {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
  const [showCameraDialog, setShowCameraDialog] = useState(false);
  const [showGalleryDialog, setShowGalleryDialog] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCameraSetupLoading, setShowCameraSetupLoading] = useState(false);
  const [showCameraCapture, setShowCameraCapture] = useState(false);
  const [showPreparingAnalysis, setShowPreparingAnalysis] = useState(false);

  const handleImageUpload = async (base64Image: string) => {
    const response = await fetch(
      "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    
    // Show preparing analysis screen after successful upload
    setShowPreparingAnalysis(true);
    
    return result;
  };
  const isLeftHovered = hoveredSide === "left";
  const isRightHovered = hoveredSide === "right";
  const isLeftDimmed = hoveredSide === "right";
  const isRightDimmed = hoveredSide === "left";

  return (
    <div className="relative flex flex-1 items-center justify-center gap-0">
      <ConfirmModal
        isOpen={showCameraDialog}
        title="ALLOW A.I. TO ACCESS YOUR CAMERA?"
        confirmText="ALLOW"
        cancelText="DENY"
        onConfirm={() => {
          setShowCameraDialog(false);
          setShowCameraSetupLoading(true);
        }}
        onCancel={() => setShowCameraDialog(false)}
      />
      <ConfirmModal
        isOpen={showGalleryDialog}
        title="ALLOW A.I. TO ACCESS YOUR GALLERY?"
        confirmText="ALLOW"
        cancelText="DENY"
        onConfirm={() => {
          setShowGalleryDialog(false);
          setShowUploadModal(true);
        }}
        onCancel={() => setShowGalleryDialog(false)}
      />
      <ImageUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleImageUpload}
      />
      <CameraSetupLoading
        isOpen={showCameraSetupLoading}
        onComplete={() => {
          setShowCameraSetupLoading(false);
          setShowCameraCapture(true);
        }}
      />
      <CameraCaptureModal
        isOpen={showCameraCapture}
        onClose={() => setShowCameraCapture(false)}
        onCapture={handleImageUpload}
      />
      <PreparingAnalysisLoading
        isOpen={showPreparingAnalysis}
        onComplete={() => {
          setShowPreparingAnalysis(false);
          if (onNavigateToNext) {
            onNavigateToNext();
          }
        }}
      />
      <Image
        src="/select-way.svg"
        alt="select way"
        width={143}
        height={122}
        className="pointer-events-none absolute left-1/2 top-[75%] -translate-x-1/2 -translate-y-1/2"
      />
      {/* Left Half */}
      <div
        className="relative flex w-1/2 items-center justify-center"
        onMouseEnter={() => setHoveredSide("left")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Background rombus decoration */}
          <Image
            src="/rombusescenter.svg"
            alt="left background decoration"
            width={405}
            height={405}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 brightness-80 contrast-110"
          />
          <div
            className="absolute left-1/2 top-1/2 h-px w-21.5 translate-x-[calc(-50%+61px)] translate-y-[calc(-50%-61px)] rotate-135 origin-center bg-[#1A1B1C]"
            aria-hidden="true"
          />
          <span
            className={`absolute left-1/2 top-1/2 translate-x-[calc(-50%+102px)] translate-y-[calc(-50%-102px)] text-[10px] uppercase tracking-[0.35em] text-[#1A1B1C] transition duration-300 ${
              isLeftDimmed ? "opacity-40" : "opacity-100"
            }`}
          >
            ALLOW A.I. TO
            <br />
            SCAN YOUR FACE
          </span>
          {/* Center image */}
          <Image
            src={leftImageSrc}
            alt={leftImageAlt}
            width={136}
            height={136}
            onClick={() => setShowCameraDialog(true)}
            className={`relative z-10 cursor-pointer transition duration-300 ${
              isLeftHovered ? "scale-110" : "scale-100"
            } ${isLeftDimmed ? "opacity-40" : "opacity-100"}`}
          />
        </div>
      </div>

      {/* Right Half */}
      <div
        className="relative flex w-1/2 items-center justify-center"
        onMouseEnter={() => setHoveredSide("right")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Background rombus decoration */}
          <Image
            src="/rombusescenter.svg"
            alt="right background decoration"
            width={405}
            height={405}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 brightness-80 contrast-110"
          />
          <div
            className="absolute left-1/2 top-1/2 h-px w-21.5 translate-x-[calc(-50%-88px)] translate-y-[calc(-50%+48px)] rotate-135 origin-center bg-[#1A1B1C]"
            aria-hidden="true"
          />
          <span
            className={`absolute left-1/2 top-1/2 translate-x-[calc(-50%-167px)] translate-y-[calc(-50%+92px)] text-[10px] uppercase tracking-[0.35em] text-[#1A1B1C] transition duration-300 ${
              isRightDimmed ? "opacity-40" : "opacity-100"
            }`}
          >
            ALLOW A.I. TO
            <br />
            ACCESS GALLERY
          </span>
          {/* Center image */}
          <Image
            src={rightImageSrc}
            alt={rightImageAlt}
            width={136}
            height={136}
            onClick={() => setShowGalleryDialog(true)}
            className={`relative z-10 cursor-pointer transition duration-300 ${
              isRightHovered ? "scale-110" : "scale-100"
            } ${isRightDimmed ? "opacity-40" : "opacity-100"}`}
          />
        </div>
      </div>
    </div>
  );
}
