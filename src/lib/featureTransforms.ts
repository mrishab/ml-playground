import type { DataFrame } from "danfojs";
import type { SelectedFeature } from "@/stores/mlConfig";
import type { FeatureSeriesData } from "@/types/dataset";
import {
  encodeCategoricalSeries,
  isCategoricalValue,
} from "./categoricalEncoding";

export function applyTransformation(
  df: DataFrame,
  feature: SelectedFeature,
): { columns: Record<string, number[]>; name: string } {
  if (!df.columns.includes(feature.column)) {
    return {
      columns: { [feature.column]: new Array(df.shape[0] ?? 0).fill(0) },
      name: feature.column,
    };
  }

  const rawValues = df.column(feature.column).values as unknown[];
  const baseName = feature.column;
  const hasCategorical = rawValues.some(isCategoricalValue);

  // If nominal string categorical and not explicitly set to ordinal, default to One-Hot Encoding
  if (hasCategorical && feature.encoding !== "ordinal") {
    const uniqueCats = Array.from(
      new Set(
        rawValues.map((v) =>
          v === null || v === undefined ? "" : String(v).trim(),
        ),
      ),
    ).sort();

    const cols: Record<string, number[]> = {};
    for (const cat of uniqueCats) {
      const colName = `${baseName}_${cat}`;
      cols[colName] = rawValues.map((v) =>
        (v === null || v === undefined ? "" : String(v).trim()) === cat ? 1 : 0,
      );
    }
    return { columns: cols, name: baseName };
  }

  const values = encodeCategoricalSeries(rawValues).encoded;

  if (feature.transformation === "polynomial") {
    const degree = feature.polynomialDegree ?? 2;
    const name = `${baseName}^${degree}`;
    return {
      columns: { [name]: values.map((v) => Math.pow(v, degree)) },
      name,
    };
  }

  if (
    feature.transformation === "interaction" &&
    feature.interactionWith &&
    df.columns.includes(feature.interactionWith)
  ) {
    const otherRawValues = df.column(feature.interactionWith).values;
    const otherValues = encodeCategoricalSeries(otherRawValues).encoded;
    const name = `${baseName}*${feature.interactionWith}`;
    return {
      columns: {
        [name]: values.map((v, i) => v * (otherValues[i] ?? 0)),
      },
      name,
    };
  }

  return { columns: { [baseName]: values }, name: baseName };
}

export function buildFeatureColumns(
  df: DataFrame,
  features: SelectedFeature[],
): FeatureSeriesData {
  const data: FeatureSeriesData = {};
  for (const feature of features) {
    if (!df.columns.includes(feature.column)) continue;
    const { columns } = applyTransformation(df, feature);
    for (const [colName, colValues] of Object.entries(columns)) {
      let finalName = colName;
      let counter = 1;
      while (finalName in data) {
        finalName = `${colName}_${counter}`;
        counter++;
      }
      data[finalName] = colValues;
    }
  }
  return data;
}

export function standardizeMatrices(
  train: number[][],
  test: number[][],
): {
  scaledTrain: number[][];
  scaledTest: number[][];
  means: number[];
  stds: number[];
} {
  const nCols = train[0]?.length ?? 0;
  const means: number[] = new Array(nCols).fill(0);
  const stds: number[] = new Array(nCols).fill(0);

  for (let c = 0; c < nCols; c++) {
    let sum = 0;
    for (let r = 0; r < train.length; r++) {
      sum += train[r][c];
    }
    const mean = sum / Math.max(1, train.length);
    means[c] = mean;

    let varSum = 0;
    for (let r = 0; r < train.length; r++) {
      const diff = train[r][c] - mean;
      varSum += diff * diff;
    }
    const std = Math.sqrt(varSum / Math.max(1, train.length));
    stds[c] = std > 1e-7 ? std : 1;
  }

  const scaledTrain = train.map((row) =>
    row.map((val, c) => (val - means[c]) / stds[c]),
  );
  const scaledTest = test.map((row) =>
    row.map((val, c) => (val - means[c]) / stds[c]),
  );

  return { scaledTrain, scaledTest, means, stds };
}
