import type { DataFrame } from "danfojs";
import type { SelectedFeature } from "@/stores/mlConfig";
import type { FeatureSeriesData } from "@/types/dataset";
import { encodeCategoricalSeries } from "./categoricalEncoding";

export function applyTransformation(
  df: DataFrame,
  feature: SelectedFeature,
): { column: number[]; name: string } {
  if (!df.columns.includes(feature.column)) {
    return {
      column: new Array(df.shape[0] ?? 0).fill(0),
      name: feature.column,
    };
  }

  const rawValues = df.column(feature.column).values;
  const values = encodeCategoricalSeries(rawValues).encoded;
  const baseName = feature.column;

  if (feature.transformation === "polynomial") {
    const degree = feature.polynomialDegree ?? 2;
    return {
      column: values.map((v) => Math.pow(v, degree)),
      name: `${baseName}^${degree}`,
    };
  }

  if (
    feature.transformation === "interaction" &&
    feature.interactionWith &&
    df.columns.includes(feature.interactionWith)
  ) {
    const otherRawValues = df.column(feature.interactionWith).values;
    const otherValues = encodeCategoricalSeries(otherRawValues).encoded;
    return {
      column: values.map((v, i) => v * (otherValues[i] ?? 0)),
      name: `${baseName}*${feature.interactionWith}`,
    };
  }

  return { column: values, name: baseName };
}

export function buildFeatureColumns(
  df: DataFrame,
  features: SelectedFeature[],
): FeatureSeriesData {
  const data: FeatureSeriesData = {};
  for (const feature of features) {
    if (!df.columns.includes(feature.column)) continue;
    const { column, name } = applyTransformation(df, feature);
    let finalName = name;
    let counter = 1;
    while (finalName in data) {
      finalName = `${name}_${counter}`;
      counter++;
    }
    data[finalName] = column;
  }
  return data;
}
