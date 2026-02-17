import { useState, useCallback } from "react";

type AnalysisData = {
  race: Record<string, number>;
  age: Record<string, number>;
  gender: Record<string, number>;
};

type UsePhaseAnalysisReturn = {
  isLoading: boolean;
  error: string | null;
  data: AnalysisData | null;
  uploadImage: (base64Image: string) => Promise<AnalysisData>;
};

export function usePhaseAnalysis(): UsePhaseAnalysisReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalysisData | null>(null);

  const uploadImage = useCallback(
    async (base64Image: string): Promise<AnalysisData> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: base64Image }),
          }
        );

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.data) {
          setData(result.data);
          return result.data;
        }

        throw new Error("No analysis data returned from API");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    data,
    uploadImage,
  };
}
