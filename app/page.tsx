"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import ConfirmDialog from "./components/confirm-dialog";
import GoodbyeDialog from "./components/goodbye-dialog";
import ScreenDecorations from "./components/screen-decorations";
import OverlayImages from "./components/overlay-images";
import BackButton from "./components/back-button";
import NextButton from "./components/next-button";
import SlideContent from "./components/slide-content";
import ContentDecorations from "./components/content-decorations";
import TwoColumnImageLayout from "./components/two-column-image-layout";
import AnalysisCategoriesLayout from "./components/analysis-categories-layout";
import DemographicsLayout from "./components/demographics-layout";
import CosmeticConcernsLayout from "./components/cosmetic-concerns-layout";
import SlideTransitionWrapper from "./components/slide-transition-wrapper";
import { slides } from "./data/slides";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasSubmittedData, setHasSubmittedData] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showGoodbyeDialog, setShowGoodbyeDialog] = useState(false);
  const [showNextButtonChevrons, setShowNextButtonChevrons] = useState(false);
  const [introHoverSide, setIntroHoverSide] = useState<"left" | "right" | null>(null);
  const [pendingNavigation, setPendingNavigation] = useState<{
    callback: () => void;
  } | null>(null);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [analysisData, setAnalysisData] = useState<{
    race: Record<string, number>;
    age: Record<string, number>;
    gender: Record<string, number>;
  } | null>(null);
  const [selectedAnalysisEntries, setSelectedAnalysisEntries] = useState<Record<number, string>>({});
  const resetAnalysisDataRef = useRef<(() => void) | null>(null);
  const confirmAnalysisDataRef = useRef<(() => void) | null>(null);

  const slide = useMemo(() => slides[activeIndex], [activeIndex]);
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === slides.length - 1;
  const navigationDirection: "forward" | "backward" =
    activeIndex > previousIndex ? "forward" : "backward";
  const textAlign = slide.textAlign ?? "center";
  const decorationsLayer = slide.decorationsLayer ?? "content";
  const hasFooterButtons = slide.footerContent === "button" || slide.footerContent === "both";
  const isNameSlide = ["002", "504"].includes(slide.id);
  const isLocationSlide = slide.id === "504";
  const isLoadingLocation = isLocationSlide && isSubmitting;
  const hasUnsavedData = name.trim().length > 0 && !isSubmitting && !hasSubmittedData;
  const showAIWrongText = ["007", "008", "009", "010"].includes(slide.id);
  const sanitizeText = (value: string) =>
    value.replace(/[^a-zA-Z\s'-]/g, "");
  const isIntroSlide = slide.id === "000";
  const effectiveTextAlign = isIntroSlide
    ? introHoverSide === "right"
      ? "left"
      : introHoverSide === "left"
        ? "right"
        : "center"
    : textAlign;
  const introTitleStyleOverride = useMemo(
    () =>
      isIntroSlide
        ? {
            transform:
              introHoverSide === "right"
                ? "translateX(-40px)"
                : introHoverSide === "left"
                  ? "translateX(40px)"
                  : "translateX(0)",
          }
        : undefined,
    [isIntroSlide, introHoverSide]
  );
  const decoratedSlide = isIntroSlide
    ? {
        ...slide,
        decorations: {
          left:
            introHoverSide === "right" ? undefined : slide.decorations?.left,
          right:
            introHoverSide === "left" ? undefined : slide.decorations?.right,
        },
      }
    : slide;

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedData) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedData]);

  useEffect(() => {
    setPreviousIndex(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    if (showGoodbyeDialog && pendingNavigation) {
      const timer = setTimeout(() => {
        pendingNavigation.callback();
        setPendingNavigation(null);
        setShowGoodbyeDialog(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showGoodbyeDialog, pendingNavigation]);

  const handleNavigationConfirm = () => {
    setShowConfirmDialog(false);
    setShowGoodbyeDialog(true);
  };

  const handleNavigationCancel = () => {
    setShowConfirmDialog(false);
    setPendingNavigation(null);
  };

  const handleStayFromGoodbye = () => {
    setShowGoodbyeDialog(false);
    setPendingNavigation(null);
  };

  const maybeNavigate = (callback: () => void) => {
    if (hasUnsavedData) {
      setShowConfirmDialog(true);
      setPendingNavigation({ callback });
    } else {
      callback();
    }
  };

  const getBackNavigationIndex = () => {
    if (slide.backButton?.navigateTo) {
      const targetIndex = slides.findIndex(
        (item) => item.id === slide.backButton?.navigateTo
      );
      return targetIndex !== -1 ? targetIndex : Math.max(0, activeIndex - 1);
    }
    return Math.max(0, activeIndex - 1);
  };

  const navigateToSlideId = (targetId: string) => {
    const targetIndex = slides.findIndex((item) => item.id === targetId);
    if (targetIndex !== -1) {
      setActiveIndex(targetIndex);
    }
  };

  const handleNameSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = (isLocationSlide ? location : name).trim();

    if (!trimmedValue || isSubmitting) {
      return;
    }

    setSubmitError(null);

    if (!isLocationSlide) {
      setName(trimmedValue);
      const targetIndex = slides.findIndex((item) => item.id === "504");
      if (targetIndex !== -1) {
        setActiveIndex(targetIndex);
      }
      return;
    }

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: trimmedName, location: trimmedValue }),
        }
      );
      if (response.ok) {
        setHasSubmittedData(true);
        const slide005Index = slides.findIndex((item) => item.id === "005");
        if (slide005Index !== -1) {
          setActiveIndex(slide005Index);
        } else {
          setActiveIndex((index) => Math.min(slides.length - 1, index + 1));
        }
      } else {
        const reason = await response.text();
        setSubmitError(
          reason ? `Submission failed: ${reason}` : "Submission failed."
        );
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown error";
      setSubmitError(`Submission failed: ${reason}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-[#1A1B1C]">
      <ScreenDecorations slide={decoratedSlide} show={decorationsLayer === "screen"} />

      <div className="relative z-10 flex min-h-screen w-full flex-col">
        <Header onLogoClick={() => setActiveIndex(0)} slideId={slide.id} />

        <OverlayImages overlays={slide.overlays} />

        {slide.backButton && !hasFooterButtons && !(isIntroSlide && introHoverSide === "right") && (
          <BackButton
            button={slide.backButton}
            isFirst={isFirst && !isIntroSlide}
            onClick={() =>
              maybeNavigate(() =>
                setActiveIndex(getBackNavigationIndex())
              )
            }
            onMouseEnter={() => isIntroSlide && setIntroHoverSide("left")}
            onMouseLeave={() => isIntroSlide && setIntroHoverSide(null)}
          />
        )}

        {slide.nextButton && !hasFooterButtons && !(isIntroSlide && introHoverSide === "left") && (
          <NextButton
            button={slide.nextButton}
            isLast={isLast}
            onMouseEnter={() => {
              if (isIntroSlide) {
                setIntroHoverSide("right");
              }
              if (slide.id === "001") {
                setShowNextButtonChevrons(true);
              }
            }}
            onMouseLeave={() => {
              if (isIntroSlide) {
                setIntroHoverSide(null);
              }
              setShowNextButtonChevrons(false);
            }}
            onClick={() => {
              const targetId = slide.nextButton?.navigateTo;
              if (targetId) {
                maybeNavigate(() => navigateToSlideId(targetId));
                return;
              }
              const newIndex = Math.min(slides.length - 1, activeIndex + 1);
              maybeNavigate(() => setActiveIndex(newIndex));
            }}
          />
        )}

        <SlideTransitionWrapper key={activeIndex} direction={navigationDirection}>
          {slide.kickerPosition === "top-left" && slide.kicker && (
            <p className="text-neutral-600" style={slide.kickerStyle}>
              {slide.kicker}
            </p>
          )}

          {slide.customComponent === "analysisCategories" ? (
            <>
              {slide.title && (
                <h3
                  className="text-neutral-600 uppercase tracking-[0.15em] px-8"
                  style={slide.titleStyle}
                >
                  {slide.title}
                </h3>
              )}
              <AnalysisCategoriesLayout
                onSelectDemographics={() =>
                  maybeNavigate(() => navigateToSlideId("007"))
                }
                onSelectSkinTypeDetails={() =>
                  maybeNavigate(() => navigateToSlideId("008"))
                }
                onSelectCosmeticConcerns={() =>
                  maybeNavigate(() => navigateToSlideId("009"))
                }
                onSelectWeather={() =>
                  maybeNavigate(() => navigateToSlideId("010"))
                }
              />
            </>
          ) : slide.customComponent === "demographics" ? (
            <>
              {slide.kicker && slide.kickerPosition === "top-left" && (
                <p className="text-neutral-600" style={slide.kickerStyle}>
                  {slide.kicker}
                </p>
              )}
              {slide.title && (
                <h1 className="text-[#1A1B1C]" style={slide.titleStyle}>
                  {slide.title}
                </h1>
              )}
              {slide.body && (
                <p className="text-[#1A1B1C]" style={slide.bodyStyle}>
                  {slide.body}
                </p>
              )}
              <DemographicsLayout 
                analysisData={analysisData}
                selectedEntries={selectedAnalysisEntries}
                setSelectedEntries={setSelectedAnalysisEntries}
                resetDataRef={resetAnalysisDataRef}
                confirmDataRef={confirmAnalysisDataRef}
              />
            </>
          ) : slide.customComponent === "cosmeticConcerns" ? (
            <>
              {slide.kicker && slide.kickerPosition === "top-left" && (
                <p className="text-neutral-600" style={slide.kickerStyle}>
                  {slide.kicker}
                </p>
              )}
              {slide.title && (
                <h1 className="text-[#1A1B1C]" style={slide.titleStyle}>
                  {slide.title}
                </h1>
              )}
              {slide.body && (
                <p className="text-[#1A1B1C]" style={slide.bodyStyle}>
                  {slide.body}
                </p>
              )}
              <CosmeticConcernsLayout
                analysisData={analysisData}
                selectedEntries={selectedAnalysisEntries}
                setSelectedEntries={setSelectedAnalysisEntries}
              />
            </>
          ) : slide.twoColumnImages ? (
            <TwoColumnImageLayout
              leftImageSrc={slide.twoColumnImages.leftImageSrc}
              leftImageAlt={slide.twoColumnImages.leftImageAlt}
              rightImageSrc={slide.twoColumnImages.rightImageSrc}
              rightImageAlt={slide.twoColumnImages.rightImageAlt}
              onAnalysisDataReceived={(data) => setAnalysisData(data)}
              onNavigateToNext={() => {
                maybeNavigate(() =>
                  setActiveIndex((prev) => Math.min(slides.length - 1, prev + 1))
                );
              }}
            />
          ) : (
            <SlideContent
              slide={slide}
              textAlign={effectiveTextAlign}
              isNameSlide={isNameSlide}
              isLoadingLocation={isLoadingLocation}
              isSubmitting={isSubmitting}
              submitError={submitError}
              inputValue={isLocationSlide ? location : name}
              titleStyleOverride={introTitleStyleOverride}
              onInputChange={(event) => {
                const sanitized = sanitizeText(event.target.value);
                if (isLocationSlide) {
                  setLocation(sanitized);
                } else {
                  setName(sanitized);
                }
              }}
              onFormSubmit={handleNameSubmit}
            />
          )}

          <ContentDecorations
            slide={decoratedSlide}
            show={decorationsLayer !== "screen"}
            showChevrons={showNextButtonChevrons}
          />
        </SlideTransitionWrapper>

        <Footer
          footerContent={slide.footerContent}
          showAIWrongText={showAIWrongText}
          onBack={
            hasFooterButtons && slide.backButton
              ? () =>
                  maybeNavigate(() =>
                    setActiveIndex(getBackNavigationIndex())
                  )
              : undefined
          }
          onNext={
            hasFooterButtons && slide.nextButton
              ? () =>
                  maybeNavigate(() =>
                    slide.nextButton?.navigateTo
                      ? navigateToSlideId(slide.nextButton.navigateTo)
                      : setActiveIndex(
                          Math.min(slides.length - 1, activeIndex + 1)
                        )
                  )
              : undefined
          }
          onReset={
            hasFooterButtons && slide.resetButton
              ? () => {
                  if (resetAnalysisDataRef.current) {
                    resetAnalysisDataRef.current();
                  }
                }
              : undefined
          }
          onConfirm={
            hasFooterButtons && slide.confirmButton
              ? () => {
                  if (confirmAnalysisDataRef.current) {
                    confirmAnalysisDataRef.current();
                  }
                  maybeNavigate(() =>
                    slide.confirmButton?.navigateTo
                      ? navigateToSlideId(slide.confirmButton.navigateTo)
                      : setActiveIndex(
                          Math.min(slides.length - 1, activeIndex + 1)
                        )
                  );
                }
              : undefined
          }
          backButtonText={slide.backButton?.text}
          nextButtonText={slide.nextButton?.text}
          resetButtonText={slide.resetButton?.text}
          confirmButtonText={slide.confirmButton?.text}
        />

        <ConfirmDialog
          isOpen={showConfirmDialog}
          title="You are about to leave analysis. Are you sure?"
          onConfirm={handleNavigationConfirm}
          onCancel={handleNavigationCancel}
          confirmText="Leave"
          cancelText="Stay"
        />

        <GoodbyeDialog
          isOpen={showGoodbyeDialog}
          onStay={handleStayFromGoodbye}
        />
      </div>
    </div>
  );
}
