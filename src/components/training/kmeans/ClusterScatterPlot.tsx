import Plot from "react-plotly.js";
import { useTheme } from "next-themes";
import type { KMeansMetrics } from "@/types/kmeans";
import { useClusterPlotTraces } from "./useClusterPlotTraces";

export function ClusterScatterPlot({
  data,
  metrics,
}: {
  data: number[][];
  metrics: KMeansMetrics;
}) {
  const { resolvedTheme } = useTheme();
  void resolvedTheme;
  const traces = useClusterPlotTraces(data, metrics);

  const xName = metrics.featureNames[0] ?? "Feature 1";
  const yName =
    metrics.featureNames[1] ?? metrics.featureNames[0] ?? "Feature 2";
  const gridColor = "var(--color-border)";

  return (
    <div className="w-full">
      <Plot
        data={traces}
        layout={{
          height: 340,
          autosize: true,
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          font: { color: "var(--color-muted-foreground)", size: 11 },
          margin: { t: 20, r: 20, b: 44, l: 54 },
          xaxis: { title: { text: xName }, gridcolor: gridColor },
          yaxis: { title: { text: yName }, gridcolor: gridColor },
          legend: { orientation: "h", y: -0.25, x: 0.5, xanchor: "center" },
        }}
        config={{ displayModeBar: false, responsive: true }}
        useResizeHandler
        className="w-full"
      />
    </div>
  );
}
