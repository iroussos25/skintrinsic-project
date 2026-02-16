import Image from "next/image";
import { ButtonConfig } from "@/app/data/slides";

type NextButtonProps = {
  button: ButtonConfig;
  isLast: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
};

export default function NextButton({
  button,
  isLast,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: NextButtonProps) {
  return (
    <div
      className="absolute right-8 top-1/2 z-30 flex -translate-y-1/2 items-center gap-4 transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className="font-semibold text-[#1A1B1C]" style={{ fontSize: "14px" }}>
        {button.text}
      </span>
      <button
        onClick={onClick}
        disabled={isLast}
        className="cursor-pointer transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Image src="/next-slide.svg" alt="next" width={44} height={44} />
      </button>
    </div>
  );
}
