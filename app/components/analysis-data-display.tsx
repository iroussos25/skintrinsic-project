"use client";

import AnalysisCenterPanel from "./analysis-center-panel";

type AnalysisDataDisplayProps = {
  analysisData?: {
    race: Record<string, number>;
    age: Record<string, number>;
    gender: Record<string, number>;
  } | null;
  selectedButton: number | null;
  selectedEntries: Record<number, string>;
  setSelectedEntries: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  panelHeight?: string;
  centerLabelOverride?: string | null;
  centerValueOverride?: number | null;
  centerLabelAlign?: "left" | "right";
  rightPanelHeadingOverride?: string | null;
  rightPanelBodyOverride?: string | null;
};

export default function AnalysisDataDisplay({
  analysisData,
  selectedButton,
  selectedEntries,
  setSelectedEntries,
  panelHeight,
  centerLabelOverride,
  centerValueOverride,
  centerLabelAlign,
  rightPanelHeadingOverride,
  rightPanelBodyOverride,
}: AnalysisDataDisplayProps) {
  const resolvedPanelHeight =
    panelHeight ?? "clamp(400px, calc(3 * (100px + 4px) + 4px), 600px)";
  const getSelectedCategoryData = () => {
    if (!analysisData) return null;
    switch (selectedButton) {
      case 0:
        return analysisData.race;
      case 1:
        return analysisData.age;
      case 2:
        return analysisData.gender;
      default:
        return null;
    }
  };

  const getCategoryName = () => {
    switch (selectedButton) {
      case 0:
        return "RACE";
      case 1:
        return "AGE";
      case 2:
        return "GENDER";
      default:
        return "";
    }
  };

  const handleSelectEntry = (entryName: string) => {
    if (selectedButton !== null) {
      setSelectedEntries((prev) => ({
        ...prev,
        [selectedButton]: entryName,
      }));
    }
  };

  const selectedData = getSelectedCategoryData();
  const currentSelectedEntry = selectedButton !== null ? selectedEntries[selectedButton] : null;
  const selectedEntryValue = currentSelectedEntry && selectedData ? selectedData[currentSelectedEntry] || null : null;
  
  // Get the top result for the current category (highest percentage)
  const getTopResultForCategory = () => {
    if (!selectedData) return null;
    const topEntry = Object.entries(selectedData).sort(([, a], [, b]) => b - a)[0];
    return topEntry ? topEntry[0] : null;
  };
  
  const topResultKey = getTopResultForCategory();
  const topResultValue = topResultKey && selectedData ? selectedData[topResultKey] : null;
  
  // Use selected entry if exists, otherwise use top result
  const displayEntryName = currentSelectedEntry || topResultKey;
  const displayEntryValue = currentSelectedEntry ? selectedEntryValue : topResultValue;
  const resolvedCenterLabel = centerLabelOverride ?? displayEntryName;
  const resolvedCenterValue = centerValueOverride ?? displayEntryValue;

  return (
    <>
      <AnalysisCenterPanel 
        selectedData={selectedData}
        selectedEntryName={resolvedCenterLabel}
        selectedEntryValue={resolvedCenterValue}
        panelHeight={resolvedPanelHeight}
        labelAlign={centerLabelAlign}
      />

      {/* Right rectangle - shows selected category data with headers */}
      <div
        className="border border-black flex flex-col overflow-y-auto p-4"
        style={{
          width: "28%",
          height: resolvedPanelHeight,
          backgroundColor: "#F3F3F4",
        }}
      >
        {/* Header row with two columns */}
        {!rightPanelHeadingOverride && !rightPanelBodyOverride && (
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid #E1E1E2" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 500, margin: 0 }}>
              {getCategoryName() || "—"}
            </h3>
            <h3 style={{ fontSize: "16px", fontWeight: 500, margin: 0 }}>
              A.I. CONFIDENCE
            </h3>
          </div>
        )}

        {/* Data entries or definition content */}
        {rightPanelHeadingOverride || rightPanelBodyOverride ? (
          <div>
            <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>
              {rightPanelHeadingOverride || "—"}
            </div>
            <div style={{ fontSize: "14px", lineHeight: "22px", color: "#1A1B1C" }}>
              {rightPanelBodyOverride || ""}
            </div>
          </div>
        ) : selectedData ? (
          <div>
            {Object.entries(selectedData).map(([key, value]) => {
              const isSelected = currentSelectedEntry === key;
              const isTopResult = key === topResultKey;
              const shouldHighlight = isSelected || (!currentSelectedEntry && isTopResult);
              return (
                <div
                  key={key}
                  onClick={() => handleSelectEntry(key)}
                  style={{
                    marginBottom: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    padding: shouldHighlight ? "8px 12px" : "0",
                    backgroundColor: shouldHighlight ? "#000000" : "transparent",
                    borderRadius: shouldHighlight ? "4px" : "0",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease, color 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      textTransform: "capitalize",
                      fontWeight: 500,
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: shouldHighlight ? "#FFFFFF" : "inherit",
                    }}
                  >
                    <svg
                      width="6"
                      height="6"
                      viewBox="0 0 6 6"
                      style={{ flexShrink: 0 }}
                    >
                      <polygon
                        points="3,0 6,3 3,6 0,3"
                        fill={shouldHighlight ? "#FFFFFF" : "#000000"}
                      />
                    </svg>
                    {key}
                  </div>
                  <div
                    style={{
                      color: shouldHighlight ? "#FFFFFF" : "#1A1B1C",
                      fontWeight: 600,
                      minWidth: "60px",
                      textAlign: "right",
                    }}
                  >
                    {(value * 100).toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ color: "#999", fontSize: "14px" }}>
            Select a category to view data
          </div>
        )}
      </div>
    </>
  );
}
