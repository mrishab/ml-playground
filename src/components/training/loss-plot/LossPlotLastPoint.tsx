import type { ScaledPoint } from "./lossPlotScales";

export function LossPlotLastPoint({
  point,
  color,
}: {
  point?: ScaledPoint;
  color: string;
}) {
  if (!point) return null;
  return (
    <g>
      <circle cx={point.x} cy={point.y} r={6} fill={color} fillOpacity={0.25} />
      <circle cx={point.x} cy={point.y} r={3.5} fill={color} />
    </g>
  );
}
