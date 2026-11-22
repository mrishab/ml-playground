import { create } from "zustand";
import type {
  MLConfigStore,
  TransformationType,
  ProblemType,
  SelectedFeature,
  SplitData,
  CategoricalEncodingMode,
} from "./mlConfig/types";
import { initialMLConfigState } from "./mlConfig/initialState";
import {
  createFeature,
  updateFeature,
  updateFeatureEncoding,
  resetFeatureCounter,
} from "./mlConfig/featureActions";

export type {
  TransformationType,
  ProblemType,
  SelectedFeature,
  SplitData,
  CategoricalEncodingMode,
};

export const useMLConfigStore = create<MLConfigStore>()((set) => ({
  ...initialMLConfigState,
  setProblemType: (problemType) => set({ problemType }),
  setShuffle: (shuffle) => set({ shuffle }),
  setStratified: (stratified) => set({ stratified }),
  setStandardizeFeatures: (standardizeFeatures) => set({ standardizeFeatures }),
  setRandomSeed: (randomSeed) => set({ randomSeed }),
  setTestSplitPercent: (percent) => set({ testSplitPercent: percent }),
  setTargetColumn: (targetColumn) =>
    set((s) => ({
      targetColumn,
      selectedFeatures: s.selectedFeatures
        .filter((f) => f.column !== targetColumn)
        .map((f) => {
          if (
            f.transformation === "interaction" &&
            f.interactionWith === targetColumn
          ) {
            return {
              ...f,
              transformation: "none" as const,
              interactionWith: undefined,
            };
          }
          return f;
        }),
    })),
  addFeature: (col) =>
    set((s) => {
      if (s.targetColumn && col === s.targetColumn) return s;
      return {
        selectedFeatures: [...s.selectedFeatures, createFeature(col)],
      };
    }),
  removeFeature: (id) =>
    set((s) => ({
      selectedFeatures: s.selectedFeatures.filter((f) => f.id !== id),
    })),
  updateFeatureTransformation: (id, trans, opts) =>
    set((s) => {
      const sanitizedOpts =
        opts?.interactionWith === s.targetColumn
          ? { ...opts, interactionWith: undefined }
          : opts;
      return {
        selectedFeatures: updateFeature(
          s.selectedFeatures,
          id,
          trans,
          sanitizedOpts,
        ),
      };
    }),
  updateFeatureEncoding: (id, encoding) =>
    set((s) => ({
      selectedFeatures: updateFeatureEncoding(s.selectedFeatures, id, encoding),
    })),
  clearFeatures: () => set({ selectedFeatures: [] }),
  setFeatures: (features) =>
    set((s) => ({
      selectedFeatures: features
        .filter((f) => !s.targetColumn || f.column !== s.targetColumn)
        .map((f) => {
          if (
            f.transformation === "interaction" &&
            f.interactionWith === s.targetColumn
          ) {
            return {
              ...f,
              transformation: "none" as const,
              interactionWith: undefined,
            };
          }
          return f;
        }),
    })),
  setSplitData: (d) => set({ ...d, isSplit: true }),
  clearSplitData: () =>
    set({
      xTrain: null,
      xTest: null,
      yTrain: null,
      yTest: null,
      isSplit: false,
    }),
  reset: () => {
    resetFeatureCounter();
    set(initialMLConfigState);
  },
}));
