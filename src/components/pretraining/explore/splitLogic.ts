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
  randomSeed?: number;
}

function createPRNG(seed: number) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWithPRNG<T>(array: T[], prng: () => number): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function executeDataSplit({
  df,
  shuffle,
  stratified = true,
  testSplitPercent,
  selectedFeatures,
  targetColumn,
  problemType,
  randomSeed,
}: SplitParams) {
  const prng = randomSeed !== undefined ? createPRNG(randomSeed) : undefined;
  const doShuffle = <T>(arr: T[]): T[] =>
    prng ? shuffleWithPRNG(arr, prng) : shuffleArray(arr);

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
        ? doShuffle(groupIndices)
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
      trainIdx = doShuffle(trainIdx);
      testIdx = doShuffle(testIdx);
    }
  } else {
    let indices = Array.from({ length: nRows }, (_, i) => i);
    if (shuffle) indices = doShuffle(indices);

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
