type FooterProps = {
	current: number;
	total: number;
};

export default function Footer({ current, total }: FooterProps) {
	const progress = total > 0 ? (current / total) * 100 : 0;

	return (
		<footer className="px-14 pb-6 pt-2 ">
			<div className="flex items-start gap-6">
				<div className="h-[72px] w-[316px] text-xs uppercase tracking-[0.2em] text-neutral-500">
					<span>SKINTRINSIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.</span>
				</div>
			</div>
		
		</footer>
	);
	}
