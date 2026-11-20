export interface OLSResult {
  coefs: number[];
  intercept: number;
}

export function solveOLS(
  X: number[][],
  y: number[],
  fitIntercept = true,
): OLSResult {
  const n = X.length;
  if (n === 0) return { coefs: [], intercept: 0 };
  const p = X[0]?.length ?? 0;
  if (p === 0) {
    const mean = y.reduce((a, b) => a + b, 0) / (n || 1);
    return { coefs: [], intercept: fitIntercept ? mean : 0 };
  }
  const k = fitIntercept ? p + 1 : p;

  const XtX = Array.from({ length: k }, () => new Float64Array(k));
  const Xty = new Float64Array(k);

  for (let r = 0; r < n; r++) {
    const row = X[r];
    const yVal = y[r] ?? 0;

    for (let i = 0; i < p; i++) {
      const xi = row[i] ?? 0;
      for (let j = 0; j < p; j++) {
        XtX[i][j] += xi * (row[j] ?? 0);
      }
      if (fitIntercept) {
        XtX[i][p] += xi;
        XtX[p][i] += xi;
      }
      Xty[i] += xi * yVal;
    }
    if (fitIntercept) {
      XtX[p][p] += 1;
      Xty[p] += yVal;
    }
  }

  // Tikhonov regularizer for collinearity / stability
  const lambda = 1e-10;
  for (let i = 0; i < k; i++) {
    XtX[i][i] += lambda;
  }

  // Augmented matrix [XtX | Xty]
  const M = XtX.map((row, i) => {
    const r = new Float64Array(k + 1);
    r.set(row);
    r[k] = Xty[i];
    return r;
  });

  // Gauss-Jordan elimination with partial pivoting
  for (let i = 0; i < k; i++) {
    let maxRow = i;
    for (let r = i + 1; r < k; r++) {
      if (Math.abs(M[r][i]) > Math.abs(M[maxRow][i])) maxRow = r;
    }
    const tmp = M[i];
    M[i] = M[maxRow];
    M[maxRow] = tmp;

    const pivot = M[i][i];
    if (Math.abs(pivot) < 1e-12) continue;

    for (let j = i; j <= k; j++) M[i][j] /= pivot;
    for (let r = 0; r < k; r++) {
      if (r !== i) {
        const factor = M[r][i];
        if (factor !== 0) {
          for (let j = i; j <= k; j++) {
            M[r][j] -= factor * M[i][j];
          }
        }
      }
    }
  }

  const beta = Array.from({ length: k }, (_, i) =>
    isNaN(M[i][k]) ? 0 : M[i][k],
  );
  const coefs = fitIntercept ? beta.slice(0, p) : beta;
  const intercept = fitIntercept ? beta[p] : 0;
  return { coefs, intercept };
}

export function predictOLS(
  X: number[][],
  coefs: number[],
  intercept: number,
): number[] {
  return X.map((row) => {
    let val = intercept;
    for (let i = 0; i < row.length; i++) {
      val += (row[i] ?? 0) * (coefs[i] ?? 0);
    }
    return val;
  });
}
