import type { DataFrame } from "danfojs";
import { XGBoost } from "./gradientBoosting";
import { calculateClassificationMetrics } from "@/lib/classificationMetrics";
import { calculateMetrics as calculateRegressionMetrics } from "@/components/training/linear-regression/calculateMetrics";
import { encodeNumericMatrix } from "@/lib/categoricalEncoding";
import type { ClassificationMetrics } from "@/types/classification";
import type { RegressionMetrics } from "@/types/regression";
import type { StepCallback } from "@/types/loss";

export type XGBoostResult =
  | {
      kind: "classification";
      metrics: ClassificationMetrics;
      featureImportance: { feature: string; score: number }[];
    }
  | {
      kind: "regression";
      metrics: RegressionMetrics;
      featureImportance: { feature: string; score: number }[];
    };

export async function trainXGBoost(
  xTrain: DataFrame,
  yTrain: DataFrame,
  xTest: DataFrame,
  yTest: DataFrame,
  targetColumn: string,
  problemType: "classification" | "regression",
  params: { nEstimators: number; maxDepth: number; learningRate?: number },
  onStep?: StepCallback,
): Promise<XGBoostResult> {
  const rawTrain = xTrain.values as unknown[][];
  const { encodedMatrix: XTrainData, mappings } = encodeNumericMatrix(rawTrain);
  const rawTest = xTest.values as unknown[][];
  const { encodedMatrix: XTestData } = encodeNumericMatrix(rawTest, mappings);

  const yTrainData = yTrain.column(targetColumn).values as (string | number)[];
  const yTestData = yTest.column(targetColumn).values as (string | number)[];
  const featureNames = xTrain.columns as string[];

  const task = problemType === "regression" ? "regression" : "classification";
  const xgb = new XGBoost({
    nEstimators: params.nEstimators,
    maxDepth: params.maxDepth,
    learningRate: params.learningRate ?? 0.1,
    task,
  });

  const totalSteps = params.nEstimators;
  const regActuals = task === "regression" ? yTestData.map(Number) : [];
  const regTrainActuals = task === "regression" ? yTrainData.map(Number) : [];
  const clsActuals = task === "classification" ? yTestData.map(String) : [];
  const clsTrainActuals =
    task === "classification" ? yTrainData.map(String) : [];

  xgb.fit(XTrainData, yTrainData, (round) => {
    if (onStep) {
      if (task === "regression") {
        const trainPreds = xgb.predict(XTrainData) as number[];
        const trainMse =
          trainPreds.reduce(
            (sum, p, i) => sum + (regTrainActuals[i] - p) ** 2,
            0,
          ) / Math.max(1, regTrainActuals.length);

        const curPreds = xgb.predict(XTestData) as number[];
        const curMse =
          curPreds.reduce((sum, p, i) => sum + (regActuals[i] - p) ** 2, 0) /
          Math.max(1, regActuals.length);

        onStep(
          {
            step: round,
            loss: Number(trainMse.toFixed(4)),
            valLoss: Number(curMse.toFixed(4)),
          },
          round === totalSteps,
        );
      } else {
        const trainPreds = xgb.predict(XTrainData).map(String);
        const trainCorrect = trainPreds.filter(
          (p, i) => p === clsTrainActuals[i],
        ).length;
        const trainAcc =
          clsTrainActuals.length > 0
            ? trainCorrect / clsTrainActuals.length
            : 0;

        const curPreds = xgb.predict(XTestData).map(String);
        const correct = curPreds.filter((p, i) => p === clsActuals[i]).length;
        const acc = clsActuals.length > 0 ? correct / clsActuals.length : 0;
        onStep(
          {
            step: round,
            loss: Number(Math.max(0.01, 1 - trainAcc).toFixed(4)),
            valLoss: Number(Math.max(0.01, 1 - acc).toFixed(4)),
          },
          round === totalSteps,
        );
      }
    }
  });

  const featureImportance = featureNames.map((name, i) => ({
    feature: name,
    score: Number((xgb.featureImportances[i] ?? 0).toFixed(4)),
  }));

  if (task === "regression") {
    const rawPreds = xgb.predict(XTestData) as number[];
    const actuals = yTestData.map(Number);
    const regMetrics = calculateRegressionMetrics(rawPreds, actuals);

    const trainPreds = xgb.predict(XTrainData) as number[];
    const finalTrainMse =
      trainPreds.reduce((sum, p, i) => sum + (regTrainActuals[i] - p) ** 2, 0) /
      Math.max(1, regTrainActuals.length);
    const yTrainMean =
      regTrainActuals.reduce((a, b) => a + b, 0) /
      Math.max(1, regTrainActuals.length);
    const trainTss = regTrainActuals.reduce(
      (a, b) => a + (b - yTrainMean) ** 2,
      0,
    );
    const finalTrainRSquared =
      trainTss > 0
        ? Math.max(0, 1 - (finalTrainMse * regTrainActuals.length) / trainTss)
        : 0;

    return {
      kind: "regression",
      metrics: {
        ...regMetrics,
        trainMse: Number(finalTrainMse.toFixed(4)),
        trainRSquared: Number(finalTrainRSquared.toFixed(4)),
        weights: {
          coefficients: featureImportance.map((f) => f.score),
          intercept: xgb.baseScore,
        },
      },
      featureImportance,
    };
  }

  // Classification
  const yTestStr = yTestData.map(String);
  const rawPreds = xgb.predict(XTestData).map(String);
  const classProbas = xgb.predictProba(XTestData);

  const uniqueLabels = Array.from(
    new Set([...yTrainData.map(String), ...yTestStr]),
  ).sort();
  const classScores = new Map<string, number[]>();
  for (const label of uniqueLabels) {
    classScores.set(
      label,
      classProbas.map((p) => p[label] ?? 0),
    );
  }

  const clsMetrics = calculateClassificationMetrics(
    rawPreds,
    yTestStr,
    classScores,
  );

  return {
    kind: "classification",
    metrics: clsMetrics,
    featureImportance,
  };
}
