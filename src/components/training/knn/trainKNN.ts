import { initScikitjs, sk } from "@/lib/scikitjs";
import { calculateClassificationMetrics } from "@/lib/classificationMetrics";
import { calculateMetrics as calculateRegressionMetrics } from "@/components/training/linear-regression/calculateMetrics";
import { encodeNumericMatrix } from "@/lib/categoricalEncoding";
import type { DataFrame } from "danfojs";
import type { ClassificationMetrics } from "@/types/classification";
import type { RegressionMetrics } from "@/types/regression";

export type KNNResult =
  | { kind: "classification"; metrics: ClassificationMetrics }
  | { kind: "regression"; metrics: RegressionMetrics };

export async function trainKNN(
  xTrain: DataFrame,
  yTrain: DataFrame,
  xTest: DataFrame,
  yTest: DataFrame,
  targetColumn: string,
  k: number,
  task: "classification" | "regression" = "classification",
): Promise<KNNResult> {
  await initScikitjs();

  const rawTrain = xTrain.values as unknown[][];
  const { encodedMatrix: XTrainData, mappings } = encodeNumericMatrix(rawTrain);
  const rawTest = xTest.values as unknown[][];
  const { encodedMatrix: XTestData } = encodeNumericMatrix(rawTest, mappings);

  const yTrainData = yTrain.column(targetColumn).values as (string | number)[];
  const yTestData = yTest.column(targetColumn).values as (string | number)[];

  if (task === "regression") {
    const yTrainNum = yTrainData.map(Number);
    const yTestNum = yTestData.map(Number);

    const model = new sk.KNeighborsRegressor({ nNeighbors: k });
    await model.fit(XTrainData, yTrainNum);

    const predictionsResult = await model.predict(XTestData);
    const syncObj = predictionsResult as { arraySync?: () => number[] };
    const predictedArr: number[] = Array.isArray(predictionsResult)
      ? (predictionsResult as number[])
      : typeof syncObj?.arraySync === "function"
        ? syncObj.arraySync()
        : Array.from(predictionsResult as unknown as ArrayLike<number>);

    const metrics = calculateRegressionMetrics(predictedArr, yTestNum);
    return { kind: "regression", metrics };
  }

  // Classification
  const yTrainStr = yTrainData.map(String);
  const yTestStr = yTestData.map(String);
  const uniqueLabels = Array.from(new Set(yTrainStr)).sort();

  // Guard: if continuous numbers were fed to classification
  const isAllNumbers = uniqueLabels.every((l) => !isNaN(Number(l)));
  if (isAllNumbers && uniqueLabels.length > 25) {
    throw new Error(
      `Cannot run KNN Classification: Target "${targetColumn}" has ${uniqueLabels.length} unique numeric values and appears continuous. Please switch Problem Type to Regression to use KNN Regressor.`,
    );
  }

  const labelToIndex = new Map(uniqueLabels.map((l, i) => [l, i]));
  const yTrainEncoded = yTrainStr.map((l) => labelToIndex.get(l)!);

  const model = new sk.KNeighborsClassifier({ nNeighbors: k });
  await model.fit(XTrainData, yTrainEncoded);

  const predictionsResult = await model.predict(XTestData);
  const syncObj = predictionsResult as { arraySync?: () => number[] };
  const predictedIndices: number[] = Array.isArray(predictionsResult)
    ? (predictionsResult as number[])
    : typeof syncObj?.arraySync === "function"
      ? syncObj.arraySync()
      : Array.from(predictionsResult as unknown as ArrayLike<number>);

  const predictions = predictedIndices.map(
    (idx) => uniqueLabels[Math.round(idx)] ?? uniqueLabels[0],
  );
  const metrics = calculateClassificationMetrics(predictions, yTestStr);

  return { kind: "classification", metrics };
}
