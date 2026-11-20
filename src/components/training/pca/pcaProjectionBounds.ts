import type { PCAPoint2D } from "@/types/pca";

export function computeProjectionBounds(coords: PCAPoint2D[]) {
  const xVals = coords.map((c) => c.pc1);
  const yVals = coords.map((c) => c.pc2);

  const minX = Math.min(...xVals, -1);
  const maxX = Math.max(...xVals, 1);
  const minY = Math.min(...yVals, -1);
  const maxY = Math.max(...yVals, 1);

  return {
    minX,
    maxX,
    minY,
    maxY,
    rangeX: Math.max(0.001, maxX - minX),
    rangeY: Math.max(0.001, maxY - minY),
  };
}
