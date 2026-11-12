"use client";

import { useCallback, useEffect, useState } from "react";
import type { DirectionContent, DirectionKey, StageMeta } from "../app/quiz-data";
import AnimatedCompass from "./AnimatedCompass";

type ResultRevealProps = {
  resultKey: DirectionKey;
  result: DirectionContent;
  stage: StageMeta;
  firstName: string;
};

export default function ResultReveal({ resultKey, result, stage, firstName }: ResultRevealProps) {
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
          <p className="result-intro">You&apos;re working with…</p>
          <h1>{result.archetype}</h1>
          <p className="result-label">{result.direction.toUpperCase()} · {result.element.toUpperCase()}</p>
          <div className="stage-badge" style={{ background: stage.color, color: stage.ink }}>
            <span className="stage-plain">{stage.plain}</span>
            <span className="stage-latin">{stage.latin}</span>
          </div>
          <button className="primary-button" onClick={continueToReading}>Read My Reading <span>↓</span></button>
        </div>
        {animate && !complete && <button className="skip-animation" onClick={skipAnimation}>Skip Animation</button>}
      </section>
    </>
  );
}
