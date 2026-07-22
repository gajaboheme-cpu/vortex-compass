"use client";

import { useCallback, useEffect, useState } from "react";
import type { DirectionKey, ResultContent } from "../app/quiz-data";
import AnimatedCompass from "./AnimatedCompass";

type ResultRevealProps = {
  resultKey: DirectionKey;
  result: ResultContent;
  firstName: string;
};

export default function ResultReveal({ resultKey, result, firstName }: ResultRevealProps) {
  const [initialized, setInitialized] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const initialize = window.setTimeout(() => {
      const alreadyRevealed = localStorage.getItem("vortexResultRevealed") === "true";
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const shouldAnimate = !alreadyRevealed && !reducedMotion;
      setAnimate(shouldAnimate);
      setComplete(!shouldAnimate);
      setInitialized(true);
      if (!shouldAnimate) localStorage.setItem("vortexResultRevealed", "true");
    }, 0);
    return () => window.clearTimeout(initialize);
  }, []);

  const finishReveal = useCallback(() => {
    localStorage.setItem("vortexResultRevealed", "true");
    setComplete(true);
  }, []);

  function skipAnimation() {
    setAnimate(false);
    finishReveal();
  }

  function continueToReading() {
    document.getElementById("full-reading")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <section className={`result-reveal screen ${initialized ? "is-ready" : ""}`}>
        <p className="eyebrow">{firstName ? `${firstName.toUpperCase()}, YOUR` : "YOUR"} VORTEX COMPASS</p>
        {initialized ? (
          <AnimatedCompass result={resultKey} animate={animate} onComplete={finishReveal} />
        ) : (
          <div className="compass-placeholder" aria-hidden="true" />
        )}
        <div className={`reveal-copy ${complete ? "is-visible" : ""}`} aria-live="polite">
          <p className="result-label">YOUR VORTEX DIRECTION</p>
          <h1>{result.direction}</h1>
          <p className="result-label">YOUR CURRENT ARCHETYPE</p>
          <p className="reveal-archetype">{result.archetype}</p>
          <p className="current-alchemy">{result.currentAlchemy}</p>
          <button className="primary-button" onClick={continueToReading}>Continue to My Reading <span>↓</span></button>
        </div>
        {animate && !complete && <button className="skip-animation" onClick={skipAnimation}>Skip Animation</button>}
      </section>
    </>
  );
}
