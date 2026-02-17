import Image from "next/image";
import { Slide } from "@/app/data/slides";

type ContentDecorationsProps = {
  slide: Slide;
  show: boolean;
  showChevrons: boolean;
};

export default function ContentDecorations({
  slide,
  show,
  showChevrons,
}: ContentDecorationsProps) {
  if (!show) return null;

  // Hide decorations on intro slide for mobile
  const isIntroSlide = slide.id === "000";
  const hideDecorations = isIntroSlide ? "hidden sm:flex" : "flex";

  return (
    <div className={`relative ${hideDecorations} items-center justify-between pb-8`}>
      {slide.decorations?.left && (
        <Image
          src={slide.decorations.left.src}
          alt={slide.decorations.left.alt}
          width={slide.decorations.left.width}
          height={slide.decorations.left.height}
          className={slide.decorations.left.className}
        />
      )}
      {showChevrons && slide.id === "001" && (
        <>
          <Image
            src="/rombuses.svg"
            alt="chevron pulse 1"
            width={301}
            height={301}
            className="chevron-pulse-1 pointer-events-none absolute right-0 top-1/2 -translate-y-[calc(50%+293px)]"
          />
          <Image
            src="/rombuses.svg"
            alt="chevron pulse 2"
            width={301}
            height={301}
            className="chevron-pulse-2 pointer-events-none absolute right-0 top-1/2 -translate-y-[calc(50%+293px)]"
          />
          <Image
            src="/rombuses.svg"
            alt="chevron pulse 3"
            width={301}
            height={301}
            className="chevron-pulse-3 pointer-events-none absolute right-0 top-1/2 -translate-y-[calc(50%+293px)]"
          />
        </>
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
