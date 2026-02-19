import Image from "next/image";

type FooterProps = {
	footerContent?: "text" | "button" | "both" | "none";
	onBack?: () => void;
	onNext?: () => void;
	onReset?: () => void;
	onConfirm?: () => void;
	backButtonText?: string;
	nextButtonText?: string;
	resetButtonText?: string;
	confirmButtonText?: string;
	showAIWrongText?: boolean;
	isIntroSlide?: boolean;
};

export default function Footer({
	footerContent = "text",
	onBack,
	onNext,
	onReset,
	onConfirm,
	backButtonText = "BACK",
	nextButtonText = "NEXT",
	resetButtonText = "RESET",
	confirmButtonText = "CONFIRM",
	showAIWrongText = false,
	isIntroSlide = false,
}: FooterProps) {
	if (footerContent === "none") {
		return null;
	}

	// For intro slide, use fixed positioning so it doesn't affect layout
	const footerClass = isIntroSlide
		? "fixed bottom-0 left-0 right-0 px-4 sm:px-6 md:px-8 pb-4 sm:pb-5 md:pb-6 pt-2 bg-white z-20"
		: "px-4 sm:px-6 md:px-8 pb-4 sm:pb-5 md:pb-6 pt-2";

	return (
		<footer className={footerClass}>
			<div className="flex items-start justify-between gap-6">
				<div>
					{(footerContent === "text" || footerContent === "both") && (
						<div className="h-18 w-79 text-xs uppercase tracking-[0.2em] text-neutral-500">
							<span>SKINTRINSIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.</span>
						</div>
					)}
					{(footerContent === "button" || footerContent === "both") && onBack && (
						<button
							onClick={onBack}
							className="flex cursor-pointer items-center gap-2 transition hover:opacity-80"
						>
							<Image src="/back.svg" alt="back" width={44} height={44} />
							<span className="font-semibold text-[#1A1B1C]" style={{ fontSize: "14px" }}>
								{backButtonText}
							</span>
						</button>
					)}
				</div>
				{showAIWrongText && (
					<div className="flex-1 flex items-center justify-center">
						<span style={{ fontSize: "16px", fontWeight: 400, color: "#A0A4AB" }}>
							If A.I. is wrong, select the correct one.
						</span>
					</div>
				)}
				{(footerContent === "button" || footerContent === "both") && (onReset || onConfirm || onNext) && (
					<div className="flex items-center gap-6">
						{onReset && (
							<button
								onClick={onReset}
								className="flex h-8.75 w-18.25 cursor-pointer items-center justify-center gap-2 border border-[#1A1B1C] px-4 pb-2.5 pt-2.25 transition hover:opacity-80"
							>
								<span className="font-semibold text-[#1A1B1C]" style={{ fontSize: "14px" }}>
									{resetButtonText}
								</span>
							</button>
						)}
						{onConfirm && (
							<button
								onClick={onConfirm}
								className="flex h-8.75 w-23.75 cursor-pointer items-center justify-center gap-2 bg-[#1A1B1C] px-4 pb-2.5 pt-2.25 transition hover:opacity-80"
							>
								<span className="font-semibold text-white" style={{ fontSize: "14px" }}>
									{confirmButtonText}
								</span>
							</button>
						)}
						{!onReset && !onConfirm && onNext && (
							<button
								onClick={onNext}
								className="flex cursor-pointer items-center gap-2 transition hover:opacity-80"
							>
								<span className="font-semibold text-[#1A1B1C]" style={{ fontSize: "14px" }}>
									{nextButtonText}
								</span>
								<Image src="/next-slide.svg" alt="next" width={44} height={44} />
							</button>
						)}
					</div>
				)}
			</div>
		</footer>
	);
}
