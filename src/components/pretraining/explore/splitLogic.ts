import * as dfd from "danfojs";
import type { DataFrame } from "danfojs";
import { shuffleArray } from "@/lib/stats";
import { buildFeatureColumns } from "@/lib/featureTransforms";
import type { SelectedFeature } from "@/stores/mlConfig";
import type { FeatureSeriesData } from "@/types/dataset";

interface SplitParams {
  df: DataFrame;
  shuffle: boolean;
  stratified?: boolean;
  testSplitPercent: number;
  selectedFeatures: SelectedFeature[];
  targetColumn: string;
  problemType?: string;
}

export function executeDataSplit({
  df,
  shuffle,
  stratified = true,
  testSplitPercent,
  selectedFeatures,
  targetColumn,
  problemType,
}: SplitParams) {
  const nRows = df.shape[0];
  const sanitizedFeatures = selectedFeatures
    .filter((f) => f.column !== targetColumn && df.columns.includes(f.column))
    .map((f) => {
      if (
        f.transformation === "interaction" &&
        (f.interactionWith === targetColumn ||
          !f.interactionWith ||
          !df.columns.includes(f.interactionWith))
      ) {
        return {
          ...f,
          transformation: "none" as const,
          interactionWith: undefined,
        };
      }
      return f;
    });
  const yRawValues = df.column(targetColumn).values;

  let trainIdx: number[] = [];
  let testIdx: number[] = [];

  if (problemType === "classification" && stratified) {
    const classGroups = new Map<string, number[]>();
    for (let i = 0; i < nRows; i++) {
      const clsKey = String(yRawValues[i]);
      if (!classGroups.has(clsKey)) classGroups.set(clsKey, []);
      classGroups.get(clsKey)!.push(i);
    }

    for (const [, groupIndices] of classGroups) {
      const shuffledGroup = shuffle
        ? shuffleArray(groupIndices)
        : [...groupIndices];
      const gLen = shuffledGroup.length;
      if (gLen <= 1) {
        // Classes with a single sample must stay in the training set
        trainIdx.push(...shuffledGroup);
        continue;
      }
      const testCount = Math.min(
        gLen - 1,
        Math.max(0, Math.round(gLen * (testSplitPercent / 100))),
      );
      const splitPoint = gLen - testCount;
      const groupTrain = shuffledGroup.slice(0, splitPoint);
      const groupTest = shuffledGroup.slice(splitPoint);
      trainIdx.push(...groupTrain);
      testIdx.push(...groupTest);
    }

    // Ensure at least 1 test sample if testSplitPercent > 0 and nRows > 1
    if (testIdx.length === 0 && nRows > 1 && testSplitPercent > 0) {
      const moved = trainIdx.pop();
      if (moved !== undefined) testIdx.push(moved);
    }

    if (shuffle) {
      trainIdx = shuffleArray(trainIdx);
      testIdx = shuffleArray(testIdx);
    }
  } else {
    let indices = Array.from({ length: nRows }, (_, i) => i);
    if (shuffle) indices = shuffleArray(indices);

    const testSize = Math.floor(nRows * (testSplitPercent / 100));
    const trainSize = nRows - testSize;
    trainIdx = indices.slice(0, trainSize);
    testIdx = indices.slice(trainSize);
  }

  const featureData = buildFeatureColumns(df, sanitizedFeatures);
  const xTrainData: FeatureSeriesData = {};
  const xTestData: FeatureSeriesData = {};

  for (const col of Object.keys(featureData)) {
    xTrainData[col] = trainIdx.map((i) => featureData[col][i]);
    xTestData[col] = testIdx.map((i) => featureData[col][i]);
  }

  const yValues = yRawValues as number[];
  return {
    xTrain: new dfd.DataFrame(xTrainData),
    xTest: new dfd.DataFrame(xTestData),
    yTrain: new dfd.DataFrame({
      [targetColumn]: trainIdx.map((i) => yValues[i]),
    }),
    yTest: new dfd.DataFrame({
      [targetColumn]: testIdx.map((i) => yValues[i]),
    }),
  };
}
