export function computeAnomalyBounds(coords: { x: number; y: number }[]) {
  if (coords.length === 0) {
    return { minX: 0, maxX: 1, minY: 0, maxY: 1, rangeX: 1, rangeY: 1 };
  }
  let minX = coords[0].x;
  let maxX = coords[0].x;
  let minY = coords[0].y;
  let maxY = coords[0].y;

  for (let i = 1; i < coords.length; i++) {
    const { x, y } = coords[i];
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
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
