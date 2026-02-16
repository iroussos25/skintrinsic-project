type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

export default function ConfirmDialog({
  isOpen,
  title,
  onConfirm,
  onCancel,
  confirmText = "Leave",
  cancelText = "Stay",
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="rounded bg-white px-8 py-6 shadow-lg">
        <p className="mb-6 text-center text-[#1A1B1C]">{title}</p>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="cursor-pointer rounded border border-[#1A1B1C] px-4 py-2 font-semibold text-[#1A1B1C] transition hover:bg-[#F3F4F6]"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer rounded bg-[#1A1B1C] px-4 py-2 font-semibold text-white transition hover:bg-[#333]"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
