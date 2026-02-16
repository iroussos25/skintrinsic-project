"use client";

import { useEffect } from "react";

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  isOpen,
  title,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onCancel}
    >
      <div
        className="w-90 rounded-lg border border-[#E5E7EB] bg-white p-6 text-[#1A1B1C] shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-sm uppercase tracking-[0.2em]">{title}</p>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-full border border-[#1A1B1C] px-4 py-2 text-xs uppercase tracking-[0.2em]"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded-full bg-[#1A1B1C] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
