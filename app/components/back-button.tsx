import Image from "next/image";
import { ButtonConfig } from "@/app/data/slides";

type BackButtonProps = {
  button: ButtonConfig;
  isFirst: boolean;
  onClick: () => void;
};

export default function BackButton({ button, isFirst, onClick }: BackButtonProps) {
  return (
    <div className="absolute left-8 top-1/2 z-30 flex -translate-y-1/2 items-center gap-4 transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40">
      <button
        onClick={onClick}
        disabled={isFirst}
        className="cursor-pointer transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Image src="/back.svg" alt="back" width={44} height={44} />
      </button>
      <span className="font-semibold text-[#1A1B1C]" style={{ fontSize: "14px" }}>
        {button.text}
      </span>
    </div>
  );
}
