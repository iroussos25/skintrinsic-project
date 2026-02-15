type FooterProps = {
	current: number;
	total: number;
};

export default function Footer({  }: FooterProps) {

	return (
		<footer className="px-8 pb-6 pt-2 ">
			<div className="flex items-start gap-6">
				<div className="h-18 w-79 text-xs uppercase tracking-[0.2em] text-neutral-500">
					<span>SKINTRINSIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.</span>
				</div>
			</div>
		
		</footer>
	);
	}
