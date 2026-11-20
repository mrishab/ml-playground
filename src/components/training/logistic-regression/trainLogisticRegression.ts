import { initScikitjs, sk } from "@/lib/scikitjs";
import { calculateClassificationMetrics } from "@/lib/classificationMetrics";
import type { DataFrame } from "danfojs";
import type { ClassificationMetrics } from "@/types/classification";
import type { StepCallback } from "@/types/loss";
import { encodeNumericMatrix } from "@/lib/categoricalEncoding";
import { extractProbaScores } from "./extractProbaScores";
import { simulateLogisticSteps } from "./simulateLogisticLoss";
import { encodeTrainLabels, mapPredictions } from "./logisticEncoding";

export async function trainLogisticRegression(
  xTrain: DataFrame,
  yTrain: DataFrame,
  xTest: DataFrame,
  yTest: DataFrame,
  targetColumn: string,
  onStep?: StepCallback,
): Promise<ClassificationMetrics> {
  await initScikitjs();

  const rawTrain = xTrain.values as unknown[][];
  const { encodedMatrix: XTrainData, mappings } = encodeNumericMatrix(rawTrain);
  const rawTest = xTest.values as unknown[][];
  const { encodedMatrix: XTestData } = encodeNumericMatrix(rawTest, mappings);

  const yTrainData = yTrain.column(targetColumn).values as (string | number)[];
  const yTestData = yTest.column(targetColumn).values as (string | number)[];

  const { uniqueLabels, yTrainEncoded } = encodeTrainLabels(yTrainData);
  const yTestStr = yTestData.map(String);

  // Standardize features (Z-score scaling) using training distribution bounds
  const nCols = XTrainData[0]?.length ?? 0;
  const means: number[] = new Array(nCols).fill(0);
  const stds: number[] = new Array(nCols).fill(0);

  for (let c = 0; c < nCols; c++) {
    let sum = 0;
    for (let r = 0; r < XTrainData.length; r++) {
      sum += XTrainData[r][c];
    }
    const mean = sum / Math.max(1, XTrainData.length);
    means[c] = mean;

    let varSum = 0;
    for (let r = 0; r < XTrainData.length; r++) {
      const diff = XTrainData[r][c] - mean;
      varSum += diff * diff;
    }
    const std = Math.sqrt(varSum / Math.max(1, XTrainData.length));
    stds[c] = std > 1e-7 ? std : 1;
  }

  const scaledTrain = XTrainData.map((row) =>
    row.map((val, c) => (val - means[c]) / stds[c]),
  );
  const scaledTest = XTestData.map((row) =>
    row.map((val, c) => (val - means[c]) / stds[c]),
  );

  const model = new sk.LogisticRegression({ penalty: "l2" });
  await model.fit(scaledTrain, yTrainEncoded);

  const rawPreds = await model.predict(scaledTest);
  const predictions = mapPredictions(rawPreds, uniqueLabels);
  const classScores = await extractProbaScores(model, scaledTest, uniqueLabels);
  const metrics = calculateClassificationMetrics(
    predictions,
    yTestStr,
    classScores,
  );

  let coefs: number[] = [];
  let intercept = 0;
  try {
    const c = (model as unknown as { coef?: { arraySync?: () => number[] } })
      .coef;
    const arr = c?.arraySync ? c.arraySync() : (c as unknown as number[]);
    const rawScaledCoefs = Array.isArray(arr) ? (arr as number[]).flat() : [];
    const b = (
      model as unknown as { intercept?: { arraySync?: () => number[] } }
    ).intercept;
    const barr = b?.arraySync ? b.arraySync() : (b as unknown as number[]);
    const rawScaledIntercept = Array.isArray(barr)
      ? (barr[0] ?? 0)
      : Number(barr ?? 0);

    // Transform weights back to unscaled space for interpretability
    coefs = rawScaledCoefs.map((w, i) => w / (stds[i] || 1));
    const offset = rawScaledCoefs.reduce(
      (acc, w, i) => acc + (w * means[i]) / (stds[i] || 1),
      0,
    );
    intercept = rawScaledIntercept - offset;
  } catch {
    coefs = [];
  }

  (metrics as ClassificationMetrics & { weights?: unknown }).weights = {
    coefficients: coefs,
    intercept,
  };

  const finalLoss = Math.max(0.05, -Math.log(Math.max(0.01, metrics.accuracy)));
  const initialLoss = Math.max(
    finalLoss + 0.35,
    Math.log(Math.max(2, uniqueLabels.length)),
  );
  const initialAcc = Math.min(
    Math.max(0.1, 1 / Math.max(2, uniqueLabels.length)),
    metrics.accuracy * 0.6,
  );
  await simulateLogisticSteps(
    initialLoss,
    finalLoss,
    initialAcc,
    metrics.accuracy,
    30,
    onStep,
  );

  return metrics;
}
