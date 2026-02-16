"use client";

import { useEffect, useState } from "react";

type ImageUploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (base64Image: string) => Promise<void>;
};

export default function ImageUploadModal({
  isOpen,
  onClose,
  onUpload,
}: ImageUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setError(null);
      return;
    }

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
  }, [isOpen, onClose]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    setSelectedFile(file);
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !previewUrl) return;

    setIsUploading(true);
    setError(null);

    try {
      // Extract base64 string (remove data:image/...;base64, prefix)
      const base64String = previewUrl.split(",")[1];
      await onUpload(base64String);
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
          Upload Image for Analysis
        </p>

        <div className="space-y-4">
          {/* File input */}
          <div>
            <label
              htmlFor="image-upload"
              className="block cursor-pointer rounded-lg border-2 border-dashed border-[#E5E7EB] p-6 text-center transition hover:border-[#1A1B1C]"
            >
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="text-xs uppercase tracking-[0.2em] text-[#6B7280]">
                Click to select image
              </span>
            </label>
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="relative h-48 overflow-hidden rounded-lg border border-[#E5E7EB]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Preview"
                className="h-full w-full object-contain"
              />
            </div>
          )}

          {/* Error message */}
          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="cursor-pointer rounded-full border border-[#1A1B1C] px-4 py-2 text-xs uppercase tracking-[0.2em] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
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
