import React from "react";
import LoadingSkeleton from "./loading-skeleton";

type SlideFormProps = {
  value: string;
  placeholder: string;
  isLoading: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  bodyStyle?: React.CSSProperties;
};

export default function SlideForm({
  value,
  placeholder,
  isLoading,
  isSubmitting,
  submitError,
  onChange,
  onSubmit,
  bodyStyle,
}: SlideFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="relative text-[#1A1B1C] w-full flex flex-col items-center"
      style={bodyStyle}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="name"
        aria-label="Enter your information"
        disabled={isSubmitting}
        className={`h-full w-full max-w-sm bg-transparent text-center placeholder:text-[#1A1B1C]/60 focus:outline-none disabled:opacity-60 ${
          isLoading ? "text-transparent caret-transparent" : ""
        }`}
      />
      {/* Mobile submit button */}
      <button
        type="submit"
        disabled={isSubmitting || !value.trim()}
        className="sm:hidden mt-20 px-6 py-2 bg-[#1A1B1C] text-white text-xs uppercase tracking-[0.2em] rounded-full font-semibold transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
      </button>
      {isLoading && (
        <>
          <LoadingSkeleton />
          <span
            className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-[#A0A4AB] border-t-transparent"
            aria-hidden="true"
          />
        </>
      )}
      {submitError && (
        <span className="mt-3 block text-xs text-red-500">{submitError}</span>
      )}
    </form>
  );
}
