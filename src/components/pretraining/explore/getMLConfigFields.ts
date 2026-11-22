import type { MLConfigStore } from "@/stores/mlConfig/types";

export function getMLConfigFields(ml: MLConfigStore) {
  return {
    problemType: ml.problemType,
    shuffle: ml.shuffle,
    stratified: ml.stratified,
    standardizeFeatures: ml.standardizeFeatures,
    randomSeed: ml.randomSeed,
    testSplitPercent: ml.testSplitPercent,
    targetColumn: ml.targetColumn,
    selectedFeatures: ml.selectedFeatures,
    isSplit: ml.isSplit,
    setProblemType: ml.setProblemType,
    setShuffle: ml.setShuffle,
    setStratified: ml.setStratified,
    setStandardizeFeatures: ml.setStandardizeFeatures,
    setRandomSeed: ml.setRandomSeed,
    setTestSplitPercent: ml.setTestSplitPercent,
    setTargetColumn: ml.setTargetColumn,
    addFeature: ml.addFeature,
    removeFeature: ml.removeFeature,
    updateFeatureTransformation: ml.updateFeatureTransformation,
    updateFeatureEncoding: ml.updateFeatureEncoding,
    clearFeatures: ml.clearFeatures,
  };
}
