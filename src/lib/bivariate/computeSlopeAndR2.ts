export function computeSlopeAndR2(
  x: number[],
  y: number[],
  meanX: number,
  meanY: number,
  n: number,
) {
  let num = 0;
  let den = 0;
  let ssTot = 0;
  for (let i = 0; i < n; i++) {
    const xi = typeof x[i] === "number" && !isNaN(x[i]) ? x[i] : 0;
    const yi = typeof y[i] === "number" && !isNaN(y[i]) ? y[i] : 0;
    const dx = xi - meanX;
    const dy = yi - meanY;
    num += dx * dy;
    den += dx * dx;
    ssTot += dy * dy;
  }
  const rawSlope = den !== 0 ? num / den : 0;
  const slope = isNaN(rawSlope) || !isFinite(rawSlope) ? 0 : rawSlope;
  const rawIntercept = meanY - slope * meanX;
  const intercept =
    isNaN(rawIntercept) || !isFinite(rawIntercept) ? 0 : rawIntercept;

  let ssRes = 0;
  for (let i = 0; i < n; i++) {
    const xi = typeof x[i] === "number" && !isNaN(x[i]) ? x[i] : 0;
    const yi = typeof y[i] === "number" && !isNaN(y[i]) ? y[i] : 0;
    const res = yi - (slope * xi + intercept);
    ssRes += res * res;
  }
  const rawR2 = ssTot !== 0 ? Math.max(0, 1 - ssRes / ssTot) : 0;
  const r2 = isNaN(rawR2) || !isFinite(rawR2) ? 0 : rawR2;
  return { slope, intercept, r2 };
}
