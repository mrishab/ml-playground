import type { DataFrame } from "danfojs";
import { encodeNumericMatrix } from "@/lib/categoricalEncoding";
import { calculateMetrics } from "./calculateMetrics";
import { solveOLS, predictOLS } from "@/lib/linear-regression/solveOLS";
import type { RegressionMetrics } from "@/types/regression";

export async function trainLinearRegression(
  xTrain: DataFrame,
  yTrain: DataFrame,
  xTest: DataFrame,
  yTest: DataFrame,
  targetColumn: string,
): Promise<RegressionMetrics> {
  const rawTrain = xTrain.values as unknown[][];
  const { encodedMatrix: XTrainData, mappings } = encodeNumericMatrix(rawTrain);
  const rawTest = xTest.values as unknown[][];
  const { encodedMatrix: XTestData } = encodeNumericMatrix(rawTest, mappings);

  const yTrainData = yTrain.column(targetColumn).values as number[];
  const yTestData = yTest.column(targetColumn).values as number[];

  // Analytical closed-form Ordinary Least Squares solution (Normal Equations)
  const { coefs, intercept } = solveOLS(XTrainData, yTrainData, true);

  const trainPreds = predictOLS(XTrainData, coefs, intercept);
  const finalTrainMSE =
    trainPreds.reduce((acc, p, i) => acc + (yTrainData[i] - p) ** 2, 0) /
    Math.max(1, yTrainData.length);

  const yTrainMean =
    yTrainData.reduce((a, b) => a + b, 0) / Math.max(1, yTrainData.length);
  const trainTss = yTrainData.reduce((a, b) => a + (b - yTrainMean) ** 2, 0);
  const trainRSquared =
    trainTss > 0 ? 1 - (finalTrainMSE * yTrainData.length) / trainTss : 0;

  const predictions = predictOLS(XTestData, coefs, intercept);
  const metrics = calculateMetrics(predictions, yTestData, {
    coefficients: coefs,
    intercept,
  });

  return {
    ...metrics,
    trainMse: finalTrainMSE,
    trainRSquared,
  };
}
