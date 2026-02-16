type HeaderProps = {
  onLogoClick?: () => void;
};

export default function Header({ onLogoClick }: HeaderProps) {
	return (
    <header className="flex flex-wrap items-center justify-between gap-4 bg-white px-8 py-5">
      <button
        onClick={onLogoClick}
        className="flex cursor-pointer items-center gap-3 transition hover:opacity-80"
      >
        <div>
          <p className="text-xs uppercase tracking-[-0.02em] text-neutral-600">
            <b>Skintrinsic</b>  [ INTRO ]
          </p>
        </div>
      </button>
      <nav className="hidden items-center gap-6 text-sm text-neutral-700 md:flex">
       
        <button
          className="cursor-pointer rounded bg-black px-4 py-2 font-semibold leading-4 tracking-tighter text-white transition hover:bg-neutral-800"
          style={{ fontSize: "10px" }}
        >
          ENTER CODE
        </button>
      </nav>
    </header>
  );
}
