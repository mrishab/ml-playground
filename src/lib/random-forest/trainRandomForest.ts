import type { DataFrame } from "danfojs";
import { RandomForest } from "./randomForest";
import { calculateClassificationMetrics } from "@/lib/classificationMetrics";
import { calculateMetrics as calculateRegressionMetrics } from "@/components/training/linear-regression/calculateMetrics";
import { encodeNumericMatrix } from "@/lib/categoricalEncoding";
import type { ClassificationMetrics } from "@/types/classification";
import type { RegressionMetrics } from "@/types/regression";
import type { StepCallback } from "@/types/loss";

export type RandomForestResult =
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

export async function trainRandomForest(
  xTrain: DataFrame,
  yTrain: DataFrame,
  xTest: DataFrame,
  yTest: DataFrame,
  targetColumn: string,
  problemType: "classification" | "regression",
  params: { nEstimators: number; maxDepth: number },
  onStep?: StepCallback,
): Promise<RandomForestResult> {
  const rawTrain = xTrain.values as unknown[][];
  const { encodedMatrix: XTrainData, mappings } = encodeNumericMatrix(rawTrain);
  const rawTest = xTest.values as unknown[][];
  const { encodedMatrix: XTestData } = encodeNumericMatrix(rawTest, mappings);

  const yTrainData = yTrain.column(targetColumn).values as (string | number)[];
  const yTestData = yTest.column(targetColumn).values as (string | number)[];
  const featureNames = xTrain.columns as string[];

  const task = problemType === "regression" ? "regression" : "classification";
  const rf = new RandomForest({
    nEstimators: params.nEstimators,
    maxDepth: params.maxDepth,
    task,
  });

  const totalSteps = params.nEstimators;
  const regActuals = task === "regression" ? yTestData.map(Number) : [];
  const clsActuals = task === "classification" ? yTestData.map(String) : [];

  // Fit trees with real-time progressive evaluation
  rf.fit(XTrainData, yTrainData, (treeIdx) => {
    if (onStep) {
      if (task === "regression") {
        const curPreds = rf.predict(XTestData) as number[];
        const curMse =
          curPreds.reduce((sum, p, i) => sum + (regActuals[i] - p) ** 2, 0) /
          Math.max(1, regActuals.length);
        const yMean =
          regActuals.reduce((a, b) => a + b, 0) /
          Math.max(1, regActuals.length);
        const tss = regActuals.reduce((a, b) => a + (b - yMean) ** 2, 0);
        const r2 =
          tss > 0 ? Math.max(0, 1 - (curMse * regActuals.length) / tss) : 0;
        onStep(
          {
            step: treeIdx,
            loss: Number(curMse.toFixed(4)),
            secondary: Number((r2 * 100).toFixed(1)),
          },
          treeIdx === totalSteps,
        );
      } else {
        const curPreds = rf.predict(XTestData).map(String);
        const correct = curPreds.filter((p, i) => p === clsActuals[i]).length;
        const acc = clsActuals.length > 0 ? correct / clsActuals.length : 0;
        onStep(
          {
            step: treeIdx,
            loss: Number(Math.max(0.01, 1 - acc).toFixed(4)),
            secondary: Number((acc * 100).toFixed(1)),
          },
          treeIdx === totalSteps,
        );
      }
    }
  });

  const featureImportance = featureNames.map((name, i) => ({
    feature: name,
    score: Number((rf.featureImportances[i] ?? 0).toFixed(4)),
  }));

  if (task === "regression") {
    const rawPreds = rf.predict(XTestData) as number[];
    const actuals = yTestData.map(Number);
    const regMetrics = calculateRegressionMetrics(rawPreds, actuals);

    return {
      kind: "regression",
      metrics: {
        ...regMetrics,
        weights: {
          coefficients: featureImportance.map((f) => f.score),
          intercept: 0,
        },
      },
      featureImportance,
    };
  }

  // Classification
  const yTestStr = yTestData.map(String);
  const rawPreds = rf.predict(XTestData).map(String);
  const classProbas = rf.predictProba(XTestData);

  // Convert array of maps to format expected by ROC / calculateClassificationMetrics
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
