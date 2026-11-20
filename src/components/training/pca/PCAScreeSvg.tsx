import type { PCAComponent } from "@/types/pca";

export function PCAScreeSvg({ comps }: { comps: PCAComponent[] }) {
  const n = comps.length;
  const barW = (70 / Math.max(1, n)) * 0.75;
  const step = 80 / Math.max(1, n);

  return (
    <svg className="w-full h-full" viewBox="0 0 100 100">
      {[25, 50, 75, 100].map((v) => (
        <line
          key={v}
          x1="8"
          y1={90 - v * 0.8}
          x2="96"
          y2={90 - v * 0.8}
          stroke="currentColor"
          className="opacity-10"
        />
      ))}
      {comps.map((c, i) => {
        const x = 12 + i * step;
        const h = (c.explainedVariance / 100) * 80;
        return (
          <g key={c.name}>
            <rect
              x={x}
              y={90 - h}
              width={barW}
              height={h}
              className="fill-primary/70 hover:fill-primary transition-colors"
              rx="1"
            />
            <text
              x={x + barW / 2}
              y="96"
              textAnchor="middle"
              className="text-[4px] fill-muted-foreground"
            >
              {c.name}
            </text>
          </g>
        );
      })}
      <polyline
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        points={comps
          .map(
            (c, i) =>
              `${12 + i * step + barW / 2},${90 - (c.cumulativeVariance / 100) * 80}`,
          )
          .join(" ")}
      />
    </svg>
  );
}
