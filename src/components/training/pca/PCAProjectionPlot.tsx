import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PCAMetrics } from "@/types/pca";
import { computeProjectionBounds } from "./pcaProjectionBounds";

export function PCAProjectionPlot({ metrics }: { metrics: PCAMetrics }) {
  const coords = metrics.coordinates2D;
  const { minX, minY, rangeX, rangeY } = computeProjectionBounds(coords);
  const zeroX = 5 + ((0 - minX) / rangeX) * 90;
  const zeroY = 95 - ((0 - minY) / rangeY) * 90;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">
          2D Principal Component Projection (PC1 vs PC2)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full relative bg-muted/20 rounded-md border border-border/50 p-3">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <line
              x1={zeroX}
              y1="5"
              x2={zeroX}
              y2="95"
              stroke="currentColor"
              className="opacity-20"
              strokeDasharray="2"
            />
            <line
              x1="5"
              y1={zeroY}
              x2="95"
              y2={zeroY}
              stroke="currentColor"
              className="opacity-20"
              strokeDasharray="2"
            />
            {coords.map((pt) => (
              <circle
                key={pt.index}
                cx={5 + ((pt.pc1 - minX) / rangeX) * 90}
                cy={95 - ((pt.pc2 - minY) / rangeY) * 90}
                r="1.6"
                className="fill-primary/80 hover:fill-primary hover:scale-150 transition-[transform,fill] duration-150 ease-out"
              >
                <title>{`#${pt.index}: PC1=${pt.pc1}, PC2=${pt.pc2}`}</title>
              </circle>
            ))}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
