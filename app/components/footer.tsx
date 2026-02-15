import Image from "next/image";

type FooterProps = {
	current: number;
	total: number;
	footerContent?: "text" | "button" | "both" | "none";
	onBack?: () => void;
};

export default function Footer({ current, total, footerContent = "text", onBack }: FooterProps) {
	if (footerContent === "none") {
		return null;
	}

	return (
		<footer className="px-8 pb-6 pt-2 ">
			<div className="flex items-start gap-6">
				{(footerContent === "text" || footerContent === "both") && (
					<div className="h-18 w-79 text-xs uppercase tracking-[0.2em] text-neutral-500">
						<span>SKINTRINSIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.</span>
					</div>
				)}
				{(footerContent === "button" || footerContent === "both") && onBack && (
					<button
						onClick={onBack}
						className="flex items-center gap-2 transition hover:opacity-80"
					>
						<Image src="/back.svg" alt="back" width={44} height={44} />
						<span className="font-semibold text-[#1A1B1C]" style={{ fontSize: "14px" }}>
							BACK
						</span>
					</button>
				)}
			</div>
		</footer>
	);
}
