import Image from "next/image";
import { Slide } from "@/app/data/slides";

type OverlayImagesProps = {
  overlays: Slide["overlays"];
  slideId?: string;
};

export default function OverlayImages({ overlays, slideId }: OverlayImagesProps) {
  if (!overlays) return null;

  // Hide overlays on intro slide for mobile
  const isIntroSlide = slideId === "000";
  const hideClass = isIntroSlide ? "hidden sm:block" : "";

  return (
    <>
      {overlays.map((overlay) => (
        <Image
          key={`${overlay.src}-${overlay.alt}`}
          src={overlay.src}
          alt={overlay.alt}
          width={overlay.width}
          height={overlay.height}
          className={`${overlay.className} ${hideClass}`}
        />
      ))}
    </>
  );
}
