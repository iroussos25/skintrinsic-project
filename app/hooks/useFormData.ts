/**
 * Custom hook for managing form data submission with validation
 * Handles name/location input, error states, and data persistence
 */

import { useState, useCallback } from "react";

export function useFormData() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [hasSubmittedData, setHasSubmittedData] = useState(false);

  const hasUnsavedData = useCallback(() => {
    return name.trim().length > 0 && !isSubmitting && !hasSubmittedData;
  }, [name, isSubmitting, hasSubmittedData]);

  const resetForm = useCallback(() => {
    setName("");
    setLocation("");
    setSubmitError("");
    setHasSubmittedData(false);
  }, []);

  const clearError = useCallback(() => {
    setSubmitError("");
  }, []);

  return {
    name,
    setName,
    location,
    setLocation,
    isSubmitting,
    setIsSubmitting,
    submitError,
    setSubmitError,
    hasSubmittedData,
    setHasSubmittedData,
    hasUnsavedData,
    resetForm,
    clearError,
  };
}
