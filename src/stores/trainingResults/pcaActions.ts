import type { StoreSet } from "./storeSetType";
import type { TrainingResultsActions } from "./actionTypes";
import { initialPCA } from "./initialStates";

export type PCAActions = Pick<
  TrainingResultsActions,
  | "setPCAState"
  | "setPCAMetrics"
  | "setPCAError"
  | "setPCANComponents"
  | "setPCAStandardize"
  | "resetPCA"
>;

export const createPCAActions = (set: StoreSet): PCAActions => ({
  setPCAState: (trainingState) =>
    set((s) => ({
      pca: { ...s.pca, trainingState },
    })),
  setPCAMetrics: (metrics) =>
    set((s) => ({
      pca: { ...s.pca, metrics },
    })),
  setPCAError: (error) =>
    set((s) => ({
      pca: { ...s.pca, error },
    })),
  setPCANComponents: (nComponents) =>
    set((s) => ({
      pca: { ...s.pca, nComponents },
    })),
  setPCAStandardize: (standardize) =>
    set((s) => ({
      pca: { ...s.pca, standardize },
    })),
  resetPCA: () => set({ pca: initialPCA }),
});
