export interface EigenResult {
  eigenvalues: number[];
  eigenvectors: number[][]; // eigenvectors[col] is the vector for eigenvalue[col]
}

export function jacobiEigenvalues(
  A: number[][],
  maxIter = 100,
  eps = 1e-12,
): EigenResult {
  const n = A.length;
  if (n === 0) return { eigenvalues: [], eigenvectors: [] };
  if (n === 1) {
    return {
      eigenvalues: [Math.max(0, A[0][0])],
      eigenvectors: [[1]],
    };
  }

  // Deep clone matrix A
  const a = A.map((r) => [...r]);

  // Initialize V as identity matrix of size n x n
  const V: number[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  );

  for (let iter = 0; iter < maxIter; iter++) {
    let maxOff = 0;
    let p = 0;
    let q = 1;

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const val = Math.abs(a[i][j]);
        if (val > maxOff) {
          maxOff = val;
          p = i;
          q = j;
        }
      }
    }

    if (maxOff < eps) break;

    const diff = a[q][q] - a[p][p];
    let t = 0;
    if (Math.abs(a[p][q]) < eps) {
      t = 0;
    } else {
      const phi = diff / (2 * a[p][q]);
      t = 1 / (Math.abs(phi) + Math.sqrt(phi * phi + 1));
      if (phi < 0) t = -t;
    }

    const c = 1 / Math.sqrt(t * t + 1);
    const s = t * c;
    const tau = s / (1 + c);
    const apq = a[p][q];

    a[p][q] = 0;
    a[q][p] = 0;
    a[p][p] -= t * apq;
    a[q][q] += t * apq;

    for (let i = 0; i < n; i++) {
      if (i !== p && i !== q) {
        const aip = a[i][p];
        const aiq = a[i][q];
        a[i][p] = aip - s * (aiq + tau * aip);
        a[p][i] = a[i][p];
        a[i][q] = aiq + s * (aip - tau * aiq);
        a[q][i] = a[i][q];
      }
      const Vip = V[i][p];
      const Viq = V[i][q];
      V[i][p] = Vip - s * (Viq + tau * Vip);
      V[i][q] = Viq + s * (Vip - tau * Viq);
    }
  }

  const eigenvalues: number[] = [];
  const eigenvectors: number[][] = [];
  for (let col = 0; col < n; col++) {
    eigenvalues.push(Math.max(0, a[col][col]));
    eigenvectors.push(V.map((row) => row[col]));
  }

  return { eigenvalues, eigenvectors };
}
