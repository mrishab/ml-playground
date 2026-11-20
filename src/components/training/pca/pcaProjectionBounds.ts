import type { PCAPoint2D } from "@/types/pca";

export function computeProjectionBounds(coords: PCAPoint2D[]) {
  let minX = -1;
  let maxX = 1;
  let minY = -1;
  let maxY = 1;

  for (let i = 0; i < coords.length; i++) {
    const { pc1, pc2 } = coords[i];
    if (pc1 < minX) minX = pc1;
    if (pc1 > maxX) maxX = pc1;
    if (pc2 < minY) minY = pc2;
    if (pc2 > maxY) maxY = pc2;
  }

  return {
    minX,
    maxX,
    minY,
    maxY,
    rangeX: Math.max(0.001, maxX - minX),
    rangeY: Math.max(0.001, maxY - minY),
  };
}
