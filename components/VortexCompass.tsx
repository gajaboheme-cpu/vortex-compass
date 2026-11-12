"use client";

import { useEffect, type CSSProperties, type ReactNode } from "react";
import type { DirectionKey } from "../app/quiz-data";

// Gaja Bohème's Vortex Somatic Compass, animated for the result reveal:
// 1. the compass inks itself in, 2. a gold light circles the ring searching,
// 3. it lands on the person's direction, which fills with Oxblood while the rest softens.

type Props = { result: DirectionKey; animate?: boolean; onComplete?: () => void };

const star = "M0 -1L0.16 -0.16L1 0L0.16 0.16L0 1L-0.16 0.16L-1 0L-0.16 -0.16Z";
const DURATION = 4300;

// Degrees the gold light travels clockwise from North before it settles.
const travel: Record<DirectionKey, number> = { connect: 360, shine: 450, nourish: 540, release: 630, expand: 720 };

const spoken: Record<DirectionKey, string> = {
  connect: "North, Connect",
  shine: "East, Shine",
  nourish: "South, Nourish",
  release: "West, Release",
  expand: "the Center, Expand",
};

type Medallion = { key: DirectionKey; x: number; y: number; label: string; lx: number; ly: number; symbol: ReactNode };

const medallions: Medallion[] = [
  { key: "connect", x: 500, y: 150, label: "CONNECT", lx: 500, ly: 252, symbol: <><polygon points="500,124 526,170 474,170" /><line x1="476" y1="154" x2="524" y2="154" /></> },
  { key: "shine", x: 850, y: 500, label: "SHINE", lx: 850, ly: 602, symbol: <polygon points="850,474 876,520 824,520" /> },
  { key: "nourish", x: 500, y: 850, label: "NOURISH", lx: 500, ly: 768, symbol: <polygon points="474,830 526,830 500,876" /> },
  { key: "release", x: 150, y: 500, label: "RELEASE", lx: 150, ly: 602, symbol: <><polygon points="124,480 176,480 150,526" /><line x1="126" y1="496" x2="174" y2="496" /></> },
];

export default function VortexCompass({ result, animate = true, onComplete }: Props) {
  useEffect(() => {
    if (!animate) {
      onComplete?.();
      return;
    }
    const timer = window.setTimeout(() => onComplete?.(), DURATION);
    return () => window.clearTimeout(timer);
  }, [animate, onComplete]);

  const isCenter = result === "expand";

  return (
    <div
      className={`vc ${animate ? "is-animating" : "is-settled"} ${isCenter ? "lands-center" : ""}`}
      style={{ "--travel": `${travel[result]}deg` } as CSSProperties}
      role="img"
      aria-label={`The Vortex Compass, pointing to ${spoken[result]}.`}
    >
      <svg viewBox="-60 -60 1120 1120" aria-hidden="true">
        <circle className="vc-ring vc-draw" pathLength={1} cx="500" cy="500" r="470" />
        <circle className="vc-ring-thin vc-draw" pathLength={1} cx="500" cy="500" r="458" />
        <circle className="vc-ticks vc-fade" cx="500" cy="500" r="438" />
        <circle className="vc-dots vc-fade" cx="500" cy="500" r="408" />
        <path className="vc-arc vc-draw" pathLength={1} d="M646 187 A345 345 0 0 1 813 354" />
        <path className="vc-arc vc-draw" pathLength={1} d="M354 187 A345 345 0 0 0 187 354" />
        <path className="vc-arc vc-draw" pathLength={1} d="M813 646 A345 345 0 0 1 646 813" />
        <path className="vc-arc vc-draw" pathLength={1} d="M187 646 A345 345 0 0 0 354 813" />
        <line className="vc-dots vc-fade" x1="378" y1="378" x2="214" y2="214" />
        <line className="vc-dots vc-fade" x1="622" y1="378" x2="786" y2="214" />
        <line className="vc-dots vc-fade" x1="622" y1="622" x2="786" y2="786" />
        <line className="vc-dots vc-fade" x1="378" y1="622" x2="214" y2="786" />
        <circle className="vc-dots vc-fade" cx="500" cy="500" r="172" />

        {[[500, 22], [978, 500], [500, 978], [22, 500]].map(([x, y]) => (
          <path key={`${x}-${y}`} className="vc-star vc-fade" transform={`translate(${x} ${y}) scale(30)`} d={star} />
        ))}

        {medallions.map((m, i) => (
          <g key={m.key} className={`vc-dir ${m.key === result ? "is-selected" : ""}`} style={{ "--i": i } as CSSProperties}>
            <circle className="vc-halo" cx={m.x} cy={m.y} r="76" />
            <circle className="vc-med" cx={m.x} cy={m.y} r="58" />
            <g className="vc-sym">{m.symbol}</g>
            <text className="vc-label" x={m.lx} y={m.ly}>{m.label}</text>
          </g>
        ))}

        <g className={`vc-dir vc-center ${isCenter ? "is-selected" : ""}`} style={{ "--i": 4 } as CSSProperties}>
          <circle className="vc-halo" cx="500" cy="500" r="88" />
          <circle className="vc-med" cx="500" cy="500" r="70" />
          <g className="vc-spiral-spin">
            <path className="vc-spiral" d="M500 500 a5 5 0 0 1 10 0 a10 10 0 0 1 -20 0 a15 15 0 0 1 30 0 a20 20 0 0 1 -40 0 a25 25 0 0 1 50 0 a30 30 0 0 1 -60 0" />
          </g>
          <text className="vc-label" x="500" y="612">EXPAND</text>
        </g>

        <g className="vc-seeker">
          <circle className="vc-seeker-glow" cx="500" cy="92" r="26" />
          <circle className="vc-seeker-dot" cx="500" cy="92" r="11" />
        </g>
      </svg>
    </div>
  );
}
