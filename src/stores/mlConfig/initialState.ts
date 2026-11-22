import type { MLConfigState } from "./types";

export const initialMLConfigState: MLConfigState = {
  problemType: "regression",
  shuffle: true,
  stratified: true,
  standardizeFeatures: true,
  randomSeed: undefined,
  testSplitPercent: 20,
  targetColumn: "",
  selectedFeatures: [],
  xTrain: null,
  xTest: null,
  yTrain: null,
  yTest: null,
  isSplit: false,
};
