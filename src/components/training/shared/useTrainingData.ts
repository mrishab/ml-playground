import { useMemo } from "react";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useDatasetStore } from "@/stores/dataset";
import { deriveUnsupervisedData } from "./deriveUnsupervisedData";

export function useTrainingData() {
  const df = useDatasetStore((state) => state.df);
  const xTrain = useMLConfigStore((state) => state.xTrain);
  const xTest = useMLConfigStore((state) => state.xTest);
  const yTrain = useMLConfigStore((state) => state.yTrain);
  const yTest = useMLConfigStore((state) => state.yTest);
  const targetColumn = useMLConfigStore((state) => state.targetColumn);
  const isSplit = useMLConfigStore((state) => state.isSplit);
  const problemType = useMLConfigStore((state) => state.problemType);

  const featureNames = useMemo(() => {
    if (xTrain) return xTrain.columns as string[];
    if (df) return (df.columns as string[]).filter((c) => c !== targetColumn);
    return [];
  }, [xTrain, df, targetColumn]);

  const { names: unsupervisedFeatureNames, df: unsupervisedDf } = useMemo(
    () => deriveUnsupervisedData(df, xTrain, targetColumn),
    [df, xTrain, targetColumn],
  );

  const canTrain = useMemo(() => {
    return Boolean(
      isSplit && xTrain && xTest && yTrain && yTest && targetColumn,
    );
  }, [isSplit, xTrain, xTest, yTrain, yTest, targetColumn]);

  const canTrainUnsupervised = useMemo(() => {
    return Boolean(unsupervisedDf && unsupervisedFeatureNames.length > 0);
  }, [unsupervisedDf, unsupervisedFeatureNames]);

  return {
    df,
    xTrain,
    unsupervisedX: unsupervisedDf,
    unsupervisedFeatureNames,
    xTest,
    yTrain,
    yTest,
    targetColumn,
    isSplit,
    problemType,
    featureNames,
    canTrain,
    canTrainUnsupervised,
  };
}
