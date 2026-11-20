import { initScikitjs, sk } from "@/lib/scikitjs";
import type { DataFrame } from "danfojs";
import { encodeNumericMatrix } from "@/lib/categoricalEncoding";
import { calculateMetrics } from "./calculateMetrics";
import { toNumericArray } from "./baselineMSE";
import type { RegressionMetrics } from "@/types/regression";

export async function trainLinearRegression(
  xTrain: DataFrame,
  yTrain: DataFrame,
  xTest: DataFrame,
  yTest: DataFrame,
  targetColumn: string,
): Promise<RegressionMetrics> {
  await initScikitjs();

  const rawTrain = xTrain.values as unknown[][];
  const { encodedMatrix: XTrainData, mappings } = encodeNumericMatrix(rawTrain);
  const rawTest = xTest.values as unknown[][];
  const { encodedMatrix: XTestData } = encodeNumericMatrix(rawTest, mappings);

  const yTrainData = yTrain.column(targetColumn).values as number[];
  const yTestData = yTest.column(targetColumn).values as number[];

  const model = new sk.LinearRegression({ fitIntercept: true });
  await model.fit(XTrainData, yTrainData);

  const trainPreds = toNumericArray(await model.predict(XTrainData));
  const finalTrainMSE =
    trainPreds.reduce((acc, p, i) => acc + (yTrainData[i] - p) ** 2, 0) /
    yTrainData.length;

  const yTrainMean = yTrainData.reduce((a, b) => a + b, 0) / yTrainData.length;
  const trainTss = yTrainData.reduce((a, b) => a + (b - yTrainMean) ** 2, 0);
  const trainRSquared =
    trainTss > 0 ? 1 - (finalTrainMSE * yTrainData.length) / trainTss : 0;

  let coefs: number[] = [];
  let intercept = 0;
  try {
    const c = (model as unknown as { coef?: { arraySync?: () => number[] } })
      .coef;
    const arr = c?.arraySync ? c.arraySync() : c;
    coefs = Array.isArray(arr) ? (arr as number[]).flat() : [];
    const intc = (
      model as unknown as {
        intercept?: number | { arraySync?: () => number[] };
      }
    ).intercept;
    const iArr =
      intc && typeof intc === "object" && intc.arraySync
        ? intc.arraySync()
        : intc;
    intercept =
      typeof iArr === "number" ? iArr : Array.isArray(iArr) ? iArr[0] : 0;
  } catch {
    coefs = [];
    intercept = 0;
  }

  const predictions = toNumericArray(await model.predict(XTestData));
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
