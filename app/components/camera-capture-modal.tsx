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
  const detectionCanvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [timerSetting, setTimerSetting] = useState<"OFF" | "3s" | "10s">("OFF");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [showTimerOptions, setShowTimerOptions] = useState(false);

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

  // Simple face detection based on video analysis
  useEffect(() => {
    if (!stream || !videoRef.current || !detectionCanvasRef.current) return;

    let animationFrameId: number;
    const video = videoRef.current;
    const canvas = detectionCanvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });

    if (!context) return;

    const detectFace = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // Set canvas size to match video (smaller for performance)
        canvas.width = 320;
        canvas.height = 240;

        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Define oval region matching the UI (450x600 aspect ratio, scaled down)
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const ovalWidth = 100; // Smaller, more precise detection area
        const ovalHeight = 140;

        // Sample multiple points within the oval to check for centered face
        const samplePoints = [
          { x: centerX, y: centerY - ovalHeight * 0.25 }, // Upper face
          { x: centerX, y: centerY }, // Center face
          { x: centerX, y: centerY + ovalHeight * 0.15 }, // Lower face
          { x: centerX - ovalWidth * 0.2, y: centerY - ovalHeight * 0.1 }, // Left cheek
          { x: centerX + ovalWidth * 0.2, y: centerY - ovalHeight * 0.1 }, // Right cheek
        ];

        let skinTonePoints = 0;
        const sampleRadius = 15; // Check area around each point

        for (const point of samplePoints) {
          const imageData = context.getImageData(
            Math.max(0, point.x - sampleRadius),
            Math.max(0, point.y - sampleRadius),
            sampleRadius * 2,
            sampleRadius * 2
          );

          let skinPixelsInSample = 0;
          let totalPixelsInSample = 0;

          for (let i = 0; i < imageData.data.length; i += 4) {
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];

            totalPixelsInSample++;

            // Skin tone detection
            if (
              r > 95 &&
              g > 40 &&
              b > 20 &&
              r > g &&
              r > b &&
              Math.abs(r - g) > 15
            ) {
              skinPixelsInSample++;
            }
          }

          // If this sample point has significant skin tone (>30%), count it
          if (skinPixelsInSample / totalPixelsInSample > 0.3) {
            skinTonePoints++;
          }
        }

        // Face is detected only if at least 4 out of 5 sample points detect skin
        // This ensures the face is actually centered in the oval
        setIsFaceDetected(skinTonePoints >= 4);
      }

      animationFrameId = requestAnimationFrame(detectFace);
    };

    detectFace();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [stream]);

  const handleCaptureImmediate = () => {
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

  // Countdown timer effect
  useEffect(() => {
    if (countdown === null || countdown === 0) return;

    const timer = setTimeout(() => {
      if (countdown === 1) {
        // Trigger capture when countdown reaches 0
        setCountdown(null);
        // Use a small delay to ensure countdown is hidden before capture
        setTimeout(() => {
          handleCaptureImmediate();
        }, 100);
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleCapture = () => {
    if (timerSetting === "OFF") {
      handleCaptureImmediate();
    } else {
      const seconds = timerSetting === "3s" ? 3 : 10;
      setCountdown(seconds);
    }
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

  // Review screen (after capture)
  if (capturedImage) {
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
            Great Shot!
          </p>

          <div className="space-y-4">
            {/* Error message */}
            {error && <p className="text-xs text-red-600">{error}</p>}

            {/* Captured image preview */}
            <div className="relative h-80 overflow-hidden rounded-lg border border-[#E5E7EB] bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={capturedImage}
                alt="Captured"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3">
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Camera capture screen (full screen)
  return (
    <div 
      className="absolute inset-0 z-50 bg-black"
      onClick={() => showTimerOptions && setShowTimerOptions(false)}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: facingMode === "user" ? "scaleX(-1)" : "none" }}
      />
      <canvas ref={canvasRef} className="hidden" />
      <canvas ref={detectionCanvasRef} className="hidden" />

      {/* Header - Top Left */}
      <div className="absolute left-8 top-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
          SKINTRINSIC <span className="font-normal">[ ANALYSIS ]</span>
        </p>
      </div>

      {/* Flip camera button - Top Right */}
      <button
        type="button"
        onClick={handleFlipCamera}
        disabled={!stream || !!error}
        className="absolute right-8 top-8 cursor-pointer rounded-full bg-white/80 p-2 text-[#1A1B1C] backdrop-blur-sm transition hover:bg-white disabled:opacity-50"
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

      {/* Oval face guide - Center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className={`h-150 w-112.5 sm:h-125 sm:w-95 rounded-[50%] border-4 transition-all duration-300 ${
            isFaceDetected
              ? "border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.6)]"
              : "border-white/40"
          }`}
          style={{ boxShadow: isFaceDetected ? "0 0 0 9999px rgba(0, 0, 0, 0.3), 0 0 30px rgba(74, 222, 128, 0.6)" : "0 0 0 9999px rgba(0, 0, 0, 0.3)" }}
        >
          {/* Countdown dial - Top of oval */}
          {countdown !== null && countdown > 0 && (
            <div className="absolute left-1/2 top-8 -translate-x-1/2">
              <div className="relative flex h-24 w-32 items-center justify-center overflow-hidden">
                {/* Dial effect with rotating numbers */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Previous number (appears to rotate from right) */}
                  {countdown < 10 && (
                    <div
                      className="absolute text-4xl font-bold text-white transition-all duration-1000"
                      style={{
                        transform: `translateX(${countdown === (countdown + 1) ? '0px' : '70px'}) translateY(-10px) scale(0.6) rotateY(45deg)`,
                        opacity: 0.2,
                        filter: "blur(1px)",
                      }}
                    >
                      {countdown + 1}
                    </div>
                  )}
                  
                  {/* Current number (centered, large, bright) */}
                  <div
                    className="text-8xl font-bold text-white transition-all duration-500"
                    style={{
                      textShadow: "0 0 30px rgba(255,255,255,0.9), 0 0 60px rgba(255,255,255,0.5)",
                      transform: "scale(1)",
                    }}
                  >
                    {countdown}
                  </div>
                  
                  {/* Next number (appears to rotate from left) */}
                  {countdown > 1 && (
                    <div
                      className="absolute text-4xl font-bold text-white transition-all duration-1000"
                      style={{
                        transform: `translateX(-70px) translateY(-10px) scale(0.6) rotateY(-45deg)`,
                        opacity: 0.2,
                        filter: "blur(1px)",
                      }}
                    >
                      {countdown - 1}
                    </div>
                  )}
                </div>
              </div>
              
              {/* "Hold Still" text when face detected */}
              {isFaceDetected && (
                <div className="mt-2 text-center">
                  <p className="animate-pulse text-sm font-semibold uppercase tracking-[0.2em] text-green-400">
                    Hold Still
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Timer control - Left Side */}
      <div className="absolute bottom-1/2 left-8 flex translate-y-1/2 flex-row items-center gap-2">
        {/* Timer button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowTimerOptions(!showTimerOptions);
          }}
          disabled={countdown !== null}
          className="relative z-10 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition hover:bg-white disabled:opacity-50"
          title="Timer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </button>

        {/* Timer options oval */}
        {showTimerOptions && (
          <div 
            className="absolute left-12 flex h-16 items-center rounded-r-full bg-white/60 pl-8 pr-4 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-3">
              {(["OFF", "3s", "10s"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setTimerSetting(option);
                    setShowTimerOptions(false);
                  }}
                  className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition ${
                    timerSetting === option
                      ? "bg-[#1A1B1C] text-white"
                      : "bg-white/50 text-[#1A1B1C] hover:bg-white/80"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Capture button - Right Side */}
      <div className="absolute bottom-1/2 right-8 flex translate-y-1/2 flex-col items-center gap-2">
        <button
          type="button"
          onClick={handleCapture}
          disabled={!stream || !!error || countdown !== null}
          className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-white/20 backdrop-blur-sm transition hover:bg-white/30 disabled:opacity-50"
          title="Take Picture"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </button>
      </div>

      {/* Instructions - Bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm text-white/80">
          For best results, make sure you have
        </p>
        <p className="mt-2 text-sm text-white">
          <span className="inline-block">• Neutral Expression</span>
          <span className="mx-2">•</span>
          <span className="inline-block">Frontal Pose</span>
          <span className="mx-2">•</span>
          <span className="inline-block">Adequate Lighting</span>
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="absolute left-1/2 top-20 -translate-x-1/2">
          <p className="rounded-lg bg-red-600 px-4 py-2 text-xs text-white">
            {error}
          </p>
        </div>
      )}

      {/* Close button - can press ESC or click this */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-8 bottom-8 cursor-pointer text-xs uppercase tracking-[0.2em] text-white/80 transition hover:text-white"
      >
        Close (ESC)
      </button>
    </div>
  );
}
