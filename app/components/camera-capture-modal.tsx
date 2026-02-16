"use client";

import { useEffect, useRef, useState } from "react";

type CameraCaptureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (base64Image: string) => Promise<void>;
};

export default function CameraCaptureModal({
  isOpen,
  onClose,
  onCapture,
}: CameraCaptureModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  useEffect(() => {
    if (!isOpen) {
      // Clean up stream when modal closes
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      setCapturedImage(null);
      setError(null);
      return;
    }

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode },
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to access camera. Please check permissions."
        );
      }
    };

    startCamera();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onClose, facingMode]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to base64
    const imageData = canvas.toDataURL("image/jpeg", 0.95);
    setCapturedImage(imageData);
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleFlipCamera = async () => {
    // Stop current stream
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    // Toggle facing mode
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const handleUpload = async () => {
    if (!capturedImage) return;

    setIsUploading(true);
    setError(null);

    try {
      // Extract base64 string (remove data:image/...;base64, prefix)
      const base64String = capturedImage.split(",")[1];
      await onCapture(base64String);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-100 rounded-lg border border-[#E5E7EB] bg-white p-6 text-[#1A1B1C] shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="mb-4 text-sm uppercase tracking-[0.2em]">
          {capturedImage ? "Review Your Photo" : "Capture Photo"}
        </p>

        <div className="space-y-4">
          {/* Error message */}
          {error && <p className="text-xs text-red-600">{error}</p>}

          {/* Camera preview or captured image */}
          <div className="relative h-80 overflow-hidden rounded-lg border border-[#E5E7EB] bg-black">
            {!capturedImage ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                  style={{ transform: facingMode === "user" ? "scaleX(-1)" : "none" }}
                />
                {/* Flip camera button */}
                <button
                  type="button"
                  onClick={handleFlipCamera}
                  disabled={!stream || !!error}
                  className="absolute right-4 top-4 cursor-pointer rounded-full bg-white/80 p-2 text-[#1A1B1C] backdrop-blur-sm transition hover:bg-white disabled:opacity-50"
                  title="Flip camera"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 2v6h-6" />
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                    <path d="M3 22v-6h6" />
                    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                  </svg>
                </button>
              </>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={capturedImage}
                alt="Captured"
                className="h-full w-full object-cover"
              />
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3">
            {!capturedImage ? (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer rounded-full border border-[#1A1B1C] px-4 py-2 text-xs uppercase tracking-[0.2em]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCapture}
                  disabled={!stream || !!error}
                  className="cursor-pointer rounded-full bg-[#1A1B1C] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white disabled:opacity-50"
                >
                  Capture
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleRetake}
                  disabled={isUploading}
                  className="cursor-pointer rounded-full border border-[#1A1B1C] px-4 py-2 text-xs uppercase tracking-[0.2em] disabled:opacity-50"
                >
                  Retake
                </button>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="cursor-pointer rounded-full bg-[#1A1B1C] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white disabled:opacity-50"
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
