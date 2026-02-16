type LoadingSkeletonProps = {
  className?: string;
};

export default function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <span
      className={`pointer-events-none absolute inset-0 skeleton-shimmer ${
        className ?? ""
      }`}
      aria-hidden="true"
    />
  );
}
