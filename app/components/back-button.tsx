import Image from "next/image";
import { ButtonConfig } from "@/app/data/slides";

type BackButtonProps = {
  button: ButtonConfig;
  isFirst: boolean;
  onClick: () => void;
};

export default function BackButton({ button, isFirst, onClick }: BackButtonProps) {
  const getPositionClass = () => {
    switch (button.position) {
      case "bottom-left":
        return "absolute left-8 bottom-8 z-30 flex items-center gap-4";
      case "bottom-right":
        return "absolute right-8 bottom-8 z-30 flex items-center gap-4 flex-row-reverse";
      default:
        return "absolute left-8 top-1/2 z-30 flex -translate-y-1/2 items-center gap-4";
    }
  };

  return (
    <div className={`${getPositionClass()} transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40`}>
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
