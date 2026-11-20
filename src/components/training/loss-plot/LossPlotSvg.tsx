import type { Palette } from "./lossPlotColors";
import { LossPlotTraces } from "./LossPlotTraces";
import { LossPlotGrid } from "./LossPlotGrid";
import { LossPlotTooltip } from "./LossPlotTooltip";
import { DEFAULT_DIM } from "./lossPlotScales";
import type { buildLossPaths } from "./lossPlotPathBuilder";
import type { useLossPlotHover } from "./useLossPlotHover";

export function LossPlotSvg({
  gradId,
  palette,
  paths,
  hover,
  shortMetric,
}: {
  gradId: string;
  palette: Palette;
  paths: ReturnType<typeof buildLossPaths>;
  hover: ReturnType<typeof useLossPlotHover>;
  shortMetric: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${DEFAULT_DIM.width} ${DEFAULT_DIM.height}`}
      className="w-full h-auto overflow-visible cursor-crosshair"
      onMouseMove={hover.handleMouseMove}
      onMouseLeave={hover.handleMouseLeave}
    >
      <LossPlotTraces
        gradId={gradId}
        palette={palette}
        areaPath={paths.areaPath}
        linePath={paths.linePath}
        valLinePath={paths.valLinePath}
        lastPoint={paths.points[paths.points.length - 1]}
      />
      <LossPlotGrid
        dim={DEFAULT_DIM}
        minLoss={paths.minLoss}
        maxLoss={paths.maxLoss}
        maxStep={paths.maxStep}
        shortMetric={shortMetric}
      />
      {hover.hovered && (
        <LossPlotTooltip
          point={hover.hovered}
          palette={palette}
          dimHeight={DEFAULT_DIM.height}
          shortMetric={shortMetric}
        />
      )}
    </svg>
  );
}
