import { useId } from "react";
import type { LossTelemetry } from "@/types/loss";
import { COLOR_PALETTES } from "./lossPlotColors";
import { buildLossPaths } from "./lossPlotPathBuilder";
import { useLossPlotHover } from "./useLossPlotHover";
import { LossPlotLegend } from "./LossPlotLegend";
import { LossPlotSvg } from "./LossPlotSvg";
import { DEFAULT_DIM } from "./lossPlotScales";

export function LossPlotChart({ telemetry }: { telemetry: LossTelemetry }) {
  const rawId = useId();
  const gradId = `loss-grad-${rawId.replace(/:/g, "")}`;
  const palette = COLOR_PALETTES[telemetry.kind];
  const paths = buildLossPaths(
    telemetry.history,
    telemetry.totalSteps,
    DEFAULT_DIM,
  );
  const hover = useLossPlotHover(paths.points, DEFAULT_DIM.width);

  return (
    <div className="w-full space-y-2">
      <LossPlotSvg
        gradId={gradId}
        palette={palette}
        paths={paths}
        hover={hover}
        shortMetric={telemetry.shortMetric}
      />
      <LossPlotLegend
        palette={palette}
        shortMetric={telemetry.shortMetric}
        hasVal={Boolean(paths.valLinePath)}
        secondaryName={telemetry.secondaryName}
      />
    </div>
  );
}
