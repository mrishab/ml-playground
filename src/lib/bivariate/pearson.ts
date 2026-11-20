export function calculatePearsonCorrelation(x: number[], y: number[]): number {
  const n = Math.min(x.length, y.length);
  if (n < 2) return 0;

  let sumX = 0;
  let sumY = 0;
  for (let i = 0; i < n; i++) {
    const xi = typeof x[i] === "number" && !isNaN(x[i]) ? x[i] : 0;
    const yi = typeof y[i] === "number" && !isNaN(y[i]) ? y[i] : 0;
    sumX += xi;
    sumY += yi;
  }
  const meanX = sumX / n;
  const meanY = sumY / n;

  let numerator = 0;
  let denomX = 0;
  let denomY = 0;

  for (let i = 0; i < n; i++) {
    const xi = typeof x[i] === "number" && !isNaN(x[i]) ? x[i] : 0;
    const yi = typeof y[i] === "number" && !isNaN(y[i]) ? y[i] : 0;
    const dx = xi - meanX;
    const dy = yi - meanY;
    numerator += dx * dy;
    denomX += dx * dx;
    denomY += dy * dy;
  }

  const denominator = Math.sqrt(denomX * denomY);
  if (denominator === 0 || isNaN(denominator) || !isFinite(denominator))
    return 0;
  const r = numerator / denominator;
  return isNaN(r) || !isFinite(r) ? 0 : Math.max(-1, Math.min(1, r));
}

export function calculateCovariance(x: number[], y: number[]): number {
  const n = Math.min(x.length, y.length);
  if (n < 2) return 0;
  let sumX = 0;
  let sumY = 0;
  for (let i = 0; i < n; i++) {
    const xi = typeof x[i] === "number" && !isNaN(x[i]) ? x[i] : 0;
    const yi = typeof y[i] === "number" && !isNaN(y[i]) ? y[i] : 0;
    sumX += xi;
    sumY += yi;
  }
  const meanX = sumX / n;
  const meanY = sumY / n;
  let cov = 0;
  for (let i = 0; i < n; i++) {
    const xi = typeof x[i] === "number" && !isNaN(x[i]) ? x[i] : 0;
    const yi = typeof y[i] === "number" && !isNaN(y[i]) ? y[i] : 0;
    cov += (xi - meanX) * (yi - meanY);
  }
  const result = cov / (n - 1);
  return isNaN(result) || !isFinite(result) ? 0 : result;
}
