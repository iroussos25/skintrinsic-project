"use client";

type CircularConfidenceProps = {
  percentage: number | null;
};

export default function CircularConfidence({ percentage }: CircularConfidenceProps) {
  const displayPercentage = percentage ? Math.round(percentage * 100) : 0;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayPercentage / 100) * circumference;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
      <div style={{ position: "relative", width: "100%", height: "100%", maxWidth: "300px", maxHeight: "300px" }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#E1E1E2"
            strokeWidth="8"
          />
          {/* Animated progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#000000"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.8s ease-out",
            }}
          />
        </svg>
        {/* Percentage text in center */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "clamp(32px, 8vw, 48px)", fontWeight: 700, color: "#1A1B1C" }}>
            {displayPercentage}
          </div>
          <div style={{ fontSize: "clamp(10px, 2vw, 14px)", fontWeight: 500, color: "#666" }}>%</div>
        </div>
      </div>
    </div>
  );
}
