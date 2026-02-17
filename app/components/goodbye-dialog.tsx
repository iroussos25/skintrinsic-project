type GoodbyeDialogProps = {
  isOpen: boolean;
  onStay: () => void;
};

export default function GoodbyeDialog({ isOpen, onStay }: GoodbyeDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xs rounded bg-white px-4 py-6 sm:px-6 md:px-8 shadow-lg">
        <p className="mb-6 text-center text-[#1A1B1C]">Sorry to see you go</p>
        <button
          onClick={onStay}
          className="cursor-pointer rounded bg-[#1A1B1C] px-4 py-2 font-semibold text-white transition hover:bg-[#333]"
        >
          Changed my mind
        </button>
      </div>
    </div>
  );
}
