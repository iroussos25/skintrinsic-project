import Image from "next/image";
import { Slide } from "@/app/data/slides";

type ScreenDecorationsProps = {
  slide: Slide;
  show: boolean;
};

export default function ScreenDecorations({ slide, show }: ScreenDecorationsProps) {
  if (!show) return null;

  // Hide decorations on intro slide for mobile
  const isIntroSlide = slide.id === "000";

  return (
    <div className={`pointer-events-none absolute inset-0 z-0 ${isIntroSlide ? "hidden sm:block" : ""}`}>
      {slide.decorations?.left && (
        <Image
          src={slide.decorations.left.src}
          alt={slide.decorations.left.alt}
          width={slide.decorations.left.width}
          height={slide.decorations.left.height}
          className={slide.decorations.left.className}
        />
      )}
      {slide.decorations?.right && (
        <Image
          src={slide.decorations.right.src}
          alt={slide.decorations.right.alt}
          width={slide.decorations.right.width}
          height={slide.decorations.right.height}
          className={slide.decorations.right.className}
        />
      )}
    </div>
  );
}
