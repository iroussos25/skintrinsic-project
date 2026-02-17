import React, { ReactNode } from "react";
import { MODAL_OVERLAY, MODAL_CONTENT, cn } from "@/app/utils/tailwind";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
};

/**
 * Base Modal Component
 * Provides consistent modal structure and styling across the app
 */
export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  className,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={MODAL_OVERLAY}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={cn(MODAL_CONTENT, className)}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {title && (
          <h2 className="mb-4 text-lg font-semibold text-[#1A1B1C]">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
