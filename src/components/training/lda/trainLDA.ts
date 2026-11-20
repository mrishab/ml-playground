import { fitLDA, predictLDA, predictProbaLDA } from "@/lib/lda";
import { calculateClassificationMetrics } from "@/lib/classificationMetrics";
import { encodeNumericMatrix } from "@/lib/categoricalEncoding";
import type { DataFrame } from "danfojs";
import type { ClassificationMetrics } from "@/types/classification";

export async function trainLDA(
  xTrain: DataFrame,
  yTrain: DataFrame,
  xTest: DataFrame,
  yTest: DataFrame,
  targetColumn: string,
): Promise<ClassificationMetrics> {
  const rawTrain = xTrain.values as unknown[][];
  const { encodedMatrix: XTrainData, mappings } = encodeNumericMatrix(rawTrain);
  const rawTest = xTest.values as unknown[][];
  const { encodedMatrix: XTestData } = encodeNumericMatrix(rawTest, mappings);

  const yTrainData = yTrain.column(targetColumn).values as (string | number)[];
  const yTestData = yTest.column(targetColumn).values as (string | number)[];

  const yTrainStr = yTrainData.map(String);
  const yTestStr = yTestData.map(String);

  const model = fitLDA(XTrainData, yTrainStr);
  const predictions = predictLDA(model, XTestData);
  const classScores = predictProbaLDA(model, XTestData);
  const metrics = calculateClassificationMetrics(
    predictions,
    yTestStr,
    classScores,
  );

  // Attach LDA weights for model artifacts and prediction
  (
    metrics as ClassificationMetrics & { weights?: unknown; ldaModel?: unknown }
  ).weights = {
    coefficients: model.weights,
    intercept: model.intercepts,
  };
  (metrics as ClassificationMetrics & { ldaModel?: unknown }).ldaModel = model;

  return metrics;
}
