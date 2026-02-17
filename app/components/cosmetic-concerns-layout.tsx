"use client";

import { Dispatch, SetStateAction, useState } from "react";
import AnalysisDataDisplay from "./analysis-data-display";

type CosmeticConcernsLayoutProps = {
  analysisData?: {
    race: Record<string, number>;
    age: Record<string, number>;
    gender: Record<string, number>;
  } | null;
  selectedEntries: Record<number, string>;
  setSelectedEntries: Dispatch<SetStateAction<Record<number, string>>>;
};

const cosmeticConcernLabels = [
  "CROW'S FEET WRINKLE",
  "FROWN LINES",
  "FOREHEAD LINES",
  "SMILE LINES",
  "EYE BAGS",
  "TEAR TROUGH DEPRESSION",
  "UNDEREYE DARK CIRCLES",
  "UNDEREYE FAT PAD",
];

const cosmeticConcernPercentages: Array<number | string> = [
  "98%",
  "32%",
  "2%",
  "0%",
  "46%",
  "21%",
  "1%",
  "0%",
];

const cosmeticConcernDefinitions = [
  "Fine lines at the outer corners of the eyes caused by repetitive movement and collagen loss.",
  "Vertical lines between the eyebrows that appear from muscle tension and expression patterns.",
  "Horizontal lines across the forehead linked to facial movement and skin elasticity decline.",
  "Lines that form from the nose to the corners of the mouth, often deepening with age.",
  "Puffiness beneath the eyes caused by fluid retention, fat displacement, or tissue laxity.",
  "A hollow under the eyes from volume loss that creates a sunken appearance.",
  "Darkened skin beneath the eyes due to pigmentation, vascular visibility, or shadowing.",
  "A noticeable bulge under the eyes from protruding fat pads.",
];

export default function CosmeticConcernsLayout({
  analysisData,
  selectedEntries,
  setSelectedEntries,
}: CosmeticConcernsLayoutProps) {
  const [selectedButton, setSelectedButton] = useState<number | null>(0);
  const panelHeight = "calc(4 * (clamp(80px, 100px, 120px) + 4px) - 4px)";

  const formatPercentage = (value: number | string) => {
    if (typeof value === "number") {
      const normalized = value > 1 ? value : value * 100;
      return `${Math.round(normalized)}%`;
    }
    return value;
  };

  const parsePercentage = (value: number | string) => {
    if (typeof value === "number") {
      return value > 1 ? value / 100 : value;
    }
    const hasPercent = value.includes("%");
    const numeric = Number.parseFloat(value.replace("%", ""));
    if (Number.isNaN(numeric)) {
      return null;
    }
    if (hasPercent) {
      return numeric / 100;
    }
    return numeric > 1 ? numeric / 100 : numeric;
  };

  const buttonStyle = (index: number) => ({
    width: "200px",
    height: "clamp(80px, 100px, 120px)",
    backgroundColor: selectedButton === index ? "#000000" : "#F3F3F4",
    border: "1px solid #000000",
    cursor: "pointer",
    transition: "background-color 0.2s",
    position: "relative" as const,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
    alignItems: "flex-start" as const,
    padding: "8px",
  });

  return (
    <div
      className="relative flex flex-1 items-start justify-center gap-1 px-4 sm:px-6 md:px-8"
      style={{ marginTop: "200px", marginBottom: "auto" }}
    >
      {/* Left column - 2 columns of 4 boxes each */}
      <div className="flex gap-1">
        <div className="flex flex-col gap-1">
          {cosmeticConcernLabels.slice(0, 4).map((label, index) => (
            <button
              key={label}
              onClick={() => setSelectedButton(index)}
              style={buttonStyle(index)}
              onMouseOver={(e) => {
                if (selectedButton !== index) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E1E1E2";
                }
              }}
              onMouseOut={(e) => {
                if (selectedButton !== index) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F3F3F4";
                }
              }}
            >
              <span style={{
                fontSize: "16px",
                fontWeight: 600,
                color: selectedButton === index ? "#FFFFFF" : "#000000",
                width: "100%",
                textAlign: "left",
              }}>
                {label}
              </span>
              <span style={{
                fontSize: "16px",
                fontWeight: 600,
                color: selectedButton === index ? "#FFFFFF" : "#000000",
                width: "100%",
                textAlign: "left",
              }}>
                {formatPercentage(cosmeticConcernPercentages[index])}
              </span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {cosmeticConcernLabels.slice(4, 8).map((label, index) => {
            const buttonIndex = index + 4;
            return (
              <button
                key={label}
                onClick={() => setSelectedButton(buttonIndex)}
                style={buttonStyle(buttonIndex)}
                onMouseOver={(e) => {
                  if (selectedButton !== buttonIndex) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E1E1E2";
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedButton !== buttonIndex) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F3F3F4";
                  }
                }}
              >
                <span style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: selectedButton === buttonIndex ? "#FFFFFF" : "#000000",
                  width: "100%",
                  textAlign: "left",
                }}>
                  {label}
                </span>
                <span style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: selectedButton === buttonIndex ? "#FFFFFF" : "#000000",
                  width: "100%",
                  textAlign: "left",
                }}>
                  {formatPercentage(cosmeticConcernPercentages[buttonIndex])}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnalysisDataDisplay
        analysisData={analysisData}
        selectedButton={selectedButton}
        selectedEntries={selectedEntries}
        setSelectedEntries={setSelectedEntries}
        panelHeight={panelHeight}
        centerLabelOverride={
          selectedButton !== null ? cosmeticConcernLabels[selectedButton] : null
        }
        centerValueOverride={
          selectedButton !== null
            ? parsePercentage(cosmeticConcernPercentages[selectedButton])
            : null
        }
        rightPanelHeadingOverride={
          selectedButton !== null ? cosmeticConcernLabels[selectedButton] : null
        }
        rightPanelBodyOverride={
          selectedButton !== null
            ? cosmeticConcernDefinitions[selectedButton]
            : null
        }
      />
    </div>
  );
}
