// A small version of the Vortex Somatic Compass, matching the brand artwork.
const star = "M0 -1L0.16 -0.16L1 0L0.16 0.16L0 1L-0.16 0.16L-1 0L-0.16 -0.16Z";

export default function CompassMark({ className = "" }: { className?: string }) {
  return (
    <div className={className} role="img" aria-label="The Vortex Somatic Compass">
      <svg viewBox="-40 -40 1080 1080" aria-hidden="true">
        <circle className="cm-line" cx="500" cy="500" r="470" strokeWidth="5" />
        <circle className="cm-line" cx="500" cy="500" r="455" strokeWidth="2" />
        <circle className="cm-ticks" cx="500" cy="500" r="430" />
        <circle className="cm-dots" cx="500" cy="500" r="400" />
        <path className="cm-gold" d="M646 187 A345 345 0 0 1 813 354M354 187 A345 345 0 0 0 187 354M813 646 A345 345 0 0 1 646 813M187 646 A345 345 0 0 0 354 813" />
        <circle className="cm-dots" cx="500" cy="500" r="170" />
        <g className="cm-spin">
          <path className="cm-spiral" d="M500 500 a7 7 0 0 1 14 0 a14 14 0 0 1 -28 0 a21 21 0 0 1 42 0 a28 28 0 0 1 -56 0 a35 35 0 0 1 70 0 a42 42 0 0 1 -84 0" />
        </g>
        {[
          { cx: 500, cy: 150, sym: <><polygon points="500,122 528,170 472,170" /><line x1="474" y1="152" x2="526" y2="152" /></> },
          { cx: 850, cy: 500, sym: <polygon points="850,472 878,520 822,520" /> },
          { cx: 500, cy: 850, sym: <polygon points="472,830 528,830 500,878" /> },
          { cx: 150, cy: 500, sym: <><polygon points="122,480 178,480 150,528" /><line x1="124" y1="496" x2="176" y2="496" /></> },
        ].map((medallion) => (
          <g key={`${medallion.cx}-${medallion.cy}`}>
            <circle className="cm-med" cx={medallion.cx} cy={medallion.cy} r="62" />
            <g className="cm-sym">{medallion.sym}</g>
          </g>
        ))}
        {[[500, 30], [970, 500], [500, 970], [30, 500]].map(([x, y]) => (
          <path key={`${x}-${y}`} className="cm-star" transform={`translate(${x} ${y}) scale(30)`} d={star} />
        ))}
      </svg>
    </div>
  );
}
