import type { DataFrame } from "danfojs";

export interface FeatureDataResult {
  x: number[];
  y: number[];
  rawY: (number | string)[];
}

export function extractFeatureSeries(
  xTrain: DataFrame | null,
  yTrain: DataFrame | null,
  targetColumn: string | null,
  featureName: string,
): FeatureDataResult {
  if (!xTrain || !yTrain || !targetColumn) {
    return { x: [], y: [], rawY: [] };
  }
  if (
    !xTrain.columns.includes(featureName) ||
    !yTrain.columns.includes(targetColumn)
  ) {
    return { x: [], y: [], rawY: [] };
  }
  const rawX = xTrain.column(featureName).values as unknown[];
  const rawTarget = yTrain.column(targetColumn).values as unknown[];

  const isAllNumericX = rawX.every(
    (v) =>
      v !== null &&
      v !== undefined &&
      (typeof v === "number" || (!isNaN(Number(v)) && String(v).trim() !== "")),
  );

  let x: number[] = [];
  if (isAllNumericX) {
    x = rawX.map((v) => {
      const n = Number(v);
      return isNaN(n) ? 0 : n;
    });
  } else {
    const uniqueX = Array.from(
      new Set(
        rawX.map((v) =>
          v === null || v === undefined ? "" : String(v).trim(),
        ),
      ),
    ).sort();
    const mapX = new Map(uniqueX.map((val, idx) => [val, idx]));
    x = rawX.map(
      (v) =>
        mapX.get(v === null || v === undefined ? "" : String(v).trim()) ?? 0,
    );
  }

  const isAllNumericY = rawTarget.every(
    (v) =>
      v !== null &&
      v !== undefined &&
      (typeof v === "number" || (!isNaN(Number(v)) && String(v).trim() !== "")),
  );

  let y: number[] = [];
  if (isAllNumericY) {
    y = rawTarget.map((v) => {
      const n = Number(v);
      return isNaN(n) ? 0 : n;
    });
  } else {
    const unique = Array.from(
      new Set(
        rawTarget.map((v) =>
          v === null || v === undefined ? "" : String(v).trim(),
        ),
      ),
    ).sort();
    const map = new Map(unique.map((val, idx) => [val, idx]));
    y = rawTarget.map(
      (v) =>
        map.get(v === null || v === undefined ? "" : String(v).trim()) ?? 0,
    );
  }

  return {
    x,
    y,
    rawY: rawTarget as (number | string)[],
  };
}
