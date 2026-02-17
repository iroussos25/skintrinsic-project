"use client";

import CircularConfidence from "./circular-confidence";

type AnalysisCenterPanelProps = {
  selectedData: Record<string, number> | null;
  selectedEntryName?: string | null;
  selectedEntryValue?: number | null;
  panelHeight?: string;
  labelAlign?: "left" | "right";
};

export default function AnalysisCenterPanel({ 
  selectedData, 
  selectedEntryName, 
  selectedEntryValue,
  panelHeight,
  labelAlign,
}: AnalysisCenterPanelProps) {
  const getTopResult = () => {
    if (!selectedData) return null;
    const topEntry = Object.entries(selectedData).sort(([, a], [, b]) => b - a)[0];
    return topEntry ? topEntry[0] : null;
  };

  const getTopConfidenceValue = () => {
    if (!selectedData) return null;
    const topEntry = Object.entries(selectedData).sort(([, a], [, b]) => b - a)[0];
    return topEntry ? topEntry[1] : null;
  };

  const topResult = getTopResult();
  const topConfidence = getTopConfidenceValue();
  
  // Use selected entry if provided, otherwise use top result
  const displayResult = selectedEntryName || topResult;
  const displayConfidence = selectedEntryValue !== undefined && selectedEntryValue !== null ? selectedEntryValue : topConfidence;
  const resolvedPanelHeight =
    panelHeight ?? "clamp(400px, calc(3 * (100px + 4px) + 4px), 600px)";
  const shouldRenderContent =
    Boolean(displayResult) || displayConfidence !== undefined && displayConfidence !== null;

  return (
    <div
      className="border border-black flex-none sm:flex-1 p-4 w-full sm:w-auto overflow-hidden center-panel-height"
      style={{
        "--panel-height": resolvedPanelHeight,
        "--mobile-multiplier": "0.75",
        "--desktop-multiplier": "1.2",
        backgroundColor: "#F3F3F4",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      } as React.CSSProperties}
    >
      {shouldRenderContent ? (
        <>
          <div
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 600,
              color: "#1A1B1C",
              textTransform: "capitalize",
              alignSelf: labelAlign === "right" ? "flex-end" : "flex-start",
              textAlign: labelAlign === "right" ? "right" : "left",
              maxWidth: "70%",
            }}
          >
            {displayResult}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              width: "clamp(120px, 20vw, 300px)",
              height: "clamp(120px, 20vw, 300px)",
              maxWidth: "calc(100% - 40px)",
              overflow: "hidden",
            }}
          >
            <CircularConfidence percentage={displayConfidence} />
          </div>
        </>
      ) : (
        <div style={{ color: "#999", fontSize: "14px" }}>
          Select a category to view results
        </div>
      )}
    </div>
  );
}
