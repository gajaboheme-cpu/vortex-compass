"use client";

import { useEffect } from "react";
import type { DirectionKey } from "../app/quiz-data";

type AnimatedCompassProps = {
  result: DirectionKey;
  animate?: boolean;
  onComplete?: () => void;
};

const accessibleDirection: Record<DirectionKey, string> = {
  nourish: "South toward Nourish",
  release: "West toward Release",
  shine: "East toward Shine",
  connect: "North toward Connect",
  expand: "the Center toward Expand",
};

export default function AnimatedCompass({ result, animate = true, onComplete }: AnimatedCompassProps) {
  useEffect(() => {
    if (!animate) {
      onComplete?.();
      return;
    }
    const timer = window.setTimeout(() => onComplete?.(), 2150);
    return () => window.clearTimeout(timer);
  }, [animate, onComplete]);

  const isSelected = (key: DirectionKey) => key === result;

  return (
    <div
      className={`animated-compass compass-${result} ${animate ? "is-animating" : "is-settled"}`}
      role="img"
      aria-label={`Your Vortex Compass is pointing ${accessibleDirection[result]}.`}
    >
      <svg viewBox="0 0 360 360" aria-hidden="true">
        <circle className="compass-outer" cx="180" cy="180" r="154" />
        <circle className="compass-ring" cx="180" cy="180" r="126" />
        <circle className="compass-ring compass-ring-inner" cx="180" cy="180" r="82" />
        <path className="compass-botanical" d="M85 114c18-2 31-11 39-27M90 103c5 5 10 7 17 7M102 93c-1-6 0-11 3-16M275 246c-18 2-31 11-39 27M270 257c-5-5-10-7-17-7M258 267c1 6 0 11-3 16" />
        <path className="compass-cross" d="M180 45v270M45 180h270" />

        <g className={`compass-marker marker-north ${isSelected("connect") ? "is-selected" : ""}`}>
          <path d="M180 31l6 12h-12z" /><text x="180" y="68">N</text>
        </g>
        <g className={`compass-marker marker-east ${isSelected("shine") ? "is-selected" : ""}`}>
          <path d="M329 180l-12 6v-12z" /><text x="300" y="185">E</text>
        </g>
        <g className={`compass-marker marker-south ${isSelected("nourish") ? "is-selected" : ""}`}>
          <path d="M180 329l-6-12h12z" /><text x="180" y="301">S</text>
        </g>
        <g className={`compass-marker marker-west ${isSelected("release") ? "is-selected" : ""}`}>
          <path d="M31 180l12-6v12z" /><text x="60" y="185">W</text>
        </g>

        <g className="compass-needle">
          <path className="needle-result" d="M180 68l10 112h-20z" />
          <path className="needle-tail" d="M180 292l-8-112h16z" />
        </g>
        <circle className={`compass-center ${result === "expand" ? "is-selected" : ""}`} cx="180" cy="180" r="15" />
        <circle className="compass-pin" cx="180" cy="180" r="5" />
      </svg>
      <span className="compass-visible-label">{accessibleDirection[result]}</span>
    </div>
  );
}
