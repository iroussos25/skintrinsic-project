import Image from "next/image";
import { Slide } from "@/app/data/slides";

type OverlayImagesProps = {
  overlays: Slide["overlays"];
};

export default function OverlayImages({ overlays }: OverlayImagesProps) {
  if (!overlays) return null;

  return (
    <>
      {overlays.map((overlay) => (
        <Image
          key={`${overlay.src}-${overlay.alt}`}
          src={overlay.src}
          alt={overlay.alt}
          width={overlay.width}
          height={overlay.height}
          className={overlay.className}
        />
      ))}
    </>
  );
}
