"use client";

import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react";
import AnalysisDataDisplay from "./analysis-data-display";

type DemographicsLayoutProps = {
  analysisData?: {
    race: Record<string, number>;
    age: Record<string, number>;
    gender: Record<string, number>;
  } | null;
  selectedEntries: Record<number, string>;
  setSelectedEntries: Dispatch<SetStateAction<Record<number, string>>>;
  resetDataRef?: MutableRefObject<(() => void) | null>;
  confirmDataRef?: MutableRefObject<(() => void) | null>;
};

export default function DemographicsLayout({ 
  analysisData, 
  selectedEntries,
  setSelectedEntries,
  resetDataRef, 
  confirmDataRef,
}: DemographicsLayoutProps) {
  const [selectedButton, setSelectedButton] = useState<number | null>(0);
  const panelHeight = "calc(3 * (clamp(80px, 100px, 120px) + 4px) - 4px)";
  const panelHeightStyle = { "--panel-height": panelHeight } as React.CSSProperties;

  // Wire up reset and confirm functions to refs
  useEffect(() => {
    if (resetDataRef) {
      resetDataRef.current = () => {
        setSelectedEntries({});
      };
    }
    if (confirmDataRef) {
      confirmDataRef.current = () => {
        // Create the confirmed selections object
        const confirmedSelections: Record<string, string> = {};
        
        // Map the selected entries to category names
        const categoryNames = ["race", "age", "gender"];
        Object.entries(selectedEntries).forEach(([buttonIndex, entryName]) => {
          const categoryName = categoryNames[parseInt(buttonIndex)];
          if (categoryName) {
            confirmedSelections[categoryName] = entryName;
          }
        });
        
        // Store in localStorage
        localStorage.setItem('confirmedAnalysisData', JSON.stringify(confirmedSelections));
        console.log('Confirmed selections:', confirmedSelections);
      };
    }
  }, [selectedEntries, setSelectedEntries, resetDataRef, confirmDataRef]);

  const getTopResult = (category: "race" | "age" | "gender") => {
    if (!analysisData || !analysisData[category]) return null;
    const topEntry = Object.entries(analysisData[category]).sort(([, a], [, b]) => b - a)[0];
    return topEntry ? topEntry[0] : null;
  };

  const getDisplayValue = (categoryIndex: number) => {
    // If user has made a selection for this category, show it
    if (selectedEntries[categoryIndex]) {
      return selectedEntries[categoryIndex];
    }
    // Otherwise show the AI's top result
    const categoryNames: ("race" | "age" | "gender")[] = ["race", "age", "gender"];
    return getTopResult(categoryNames[categoryIndex]);
  };

  const buttonStyle = (index: number) => ({
    backgroundColor: selectedButton === index ? "#000000" : "#F3F3F4",
    border: "1px solid #000000",
    cursor: "pointer",
    transition: "background-color 0.2s",
    position: "relative" as const,
  });

  return (
    <div className="relative flex flex-col sm:flex-row flex-1 items-center sm:items-start justify-center gap-1 px-4 sm:px-6 md:px-8" style={{ marginTop: "200px", marginBottom: "auto" }}>
      {/* Left column - 3 rectangles stacked as buttons */}
      <div
        className="flex flex-col gap-1 w-full sm:w-auto items-center sm:items-start h-(--panel-height) min-[900px]:h-[calc(var(--panel-height)*1.2)]"
        style={panelHeightStyle}
      >
        <button
          className="w-full sm:w-50 h-[calc((var(--panel-height)-8px)/3)] min-[900px]:h-[calc((var(--panel-height)*1.2-8px)/3)]"
          onClick={() => setSelectedButton(0)}
          style={{
            ...buttonStyle(0),
            backgroundColor: selectedButton === 0 ? "#000000" : "#F3F3F4",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "8px",
          }}
          onMouseOver={(e) => {
            if (selectedButton !== 0) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E1E1E2";
            }
          }}
          onMouseOut={(e) => {
            if (selectedButton !== 0) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F3F3F4";
            }
          }}
        >
          <span style={{
            fontSize: "16px",
            fontWeight: 600,
            color: selectedButton === 0 ? "#FFFFFF" : "#000000",
            textTransform: "capitalize",
          }}>
            {getDisplayValue(0) || "—"}
          </span>
          <span style={{
            fontSize: "16px",
            fontWeight: 600,
            color: selectedButton === 0 ? "#FFFFFF" : "#000000",
          }}>
            RACE
          </span>
        </button>
        <button
          className="w-full sm:w-50 h-[calc((var(--panel-height)-8px)/3)] min-[900px]:h-[calc((var(--panel-height)*1.2-8px)/3)]"
          onClick={() => setSelectedButton(1)}
          style={{
            ...buttonStyle(1),
            backgroundColor: selectedButton === 1 ? "#000000" : "#F3F3F4",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "8px",
          }}
          onMouseOver={(e) => {
            if (selectedButton !== 1) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E1E1E2";
            }
          }}
          onMouseOut={(e) => {
            if (selectedButton !== 1) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F3F3F4";
            }
          }}
        >
          <span style={{
            fontSize: "16px",
            fontWeight: 600,
            color: selectedButton === 1 ? "#FFFFFF" : "#000000",
            textTransform: "capitalize",
          }}>
            {getDisplayValue(1) || "—"}
          </span>
          <span style={{
            fontSize: "16px",
            fontWeight: 600,
            color: selectedButton === 1 ? "#FFFFFF" : "#000000",
          }}>
            AGE
          </span>
        </button>
        <button
          className="w-full sm:w-50 h-[calc((var(--panel-height)-8px)/3)] min-[900px]:h-[calc((var(--panel-height)*1.2-8px)/3)]"
          onClick={() => setSelectedButton(2)}
          style={{
            ...buttonStyle(2),
            backgroundColor: selectedButton === 2 ? "#000000" : "#F3F3F4",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "8px",
          }}
          onMouseOver={(e) => {
            if (selectedButton !== 2) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E1E1E2";
            }
          }}
          onMouseOut={(e) => {
            if (selectedButton !== 2) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F3F3F4";
            }
          }}
        >
          <span style={{
            fontSize: "16px",
            fontWeight: 600,
            color: selectedButton === 2 ? "#FFFFFF" : "#000000",
            textTransform: "capitalize",
          }}>
            {getDisplayValue(2) || "—"}
          </span>
          <span style={{
            fontSize: "16px",
            fontWeight: 600,
            color: selectedButton === 2 ? "#FFFFFF" : "#000000",
          }}>
            SEX
          </span>
        </button>
      </div>

      <AnalysisDataDisplay 
        analysisData={analysisData} 
        selectedButton={selectedButton}
        selectedEntries={selectedEntries}
        setSelectedEntries={setSelectedEntries}
        panelHeight={panelHeight}
      />
    </div>
  );
}
