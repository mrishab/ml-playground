import type { SavedModel } from "@/types/savedModel";

export const STORAGE_KEY = "ml_playground_saved_models_v1";
export { calculateStorageUsage } from "./storageUsage";

export function isModelValid(model: SavedModel): boolean {
  if (!model || !model.id || !model.algorithm) return false;
  if (model.regressionMetrics) {
    const { mse, rSquared } = model.regressionMetrics;
    if (
      mse === null ||
      mse === undefined ||
      !isFinite(mse) ||
      isNaN(mse) ||
      rSquared === null ||
      rSquared === undefined ||
      !isFinite(rSquared) ||
      isNaN(rSquared)
    ) {
      return false;
    }
  }
  if (model.classificationMetrics) {
    const { accuracy } = model.classificationMetrics;
    if (
      accuracy === null ||
      accuracy === undefined ||
      !isFinite(accuracy) ||
      isNaN(accuracy)
    ) {
      return false;
    }
  }
  if (model.kmeansMetrics) {
    const { inertia, k } = model.kmeansMetrics;
    if (
      inertia === null ||
      inertia === undefined ||
      !isFinite(inertia) ||
      isNaN(inertia) ||
      !k ||
      k < 1
    ) {
      return false;
    }
  }
  if (model.isolationForestMetrics) {
    const { thresholdScore } = model.isolationForestMetrics;
    if (
      thresholdScore === null ||
      thresholdScore === undefined ||
      !isFinite(thresholdScore) ||
      isNaN(thresholdScore)
    ) {
      return false;
    }
  }
  return true;
}

export function getSavedModels(): SavedModel[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isModelValid);
  } catch {
    return [];
  }
}

export function saveModelToStorage(model: SavedModel): void {
  if (!isModelValid(model)) {
    console.warn(
      "[storage] Refusing to persist invalid model with NaN/Infinity metrics:",
      model,
    );
    return;
  }
  const models = getSavedModels().filter((m) => m.id !== model.id);
  models.unshift(model);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
  window.dispatchEvent(new Event("ml-models-storage-update"));
}

export function deleteModelFromStorage(id: string): void {
  const models = getSavedModels().filter((m) => m.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
  window.dispatchEvent(new Event("ml-models-storage-update"));
}

export function updateModelInStorage(
  id: string,
  updates: Partial<SavedModel>,
): SavedModel | null {
  const models = getSavedModels();
  const idx = models.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  const updated: SavedModel = {
    ...models[idx],
    ...updates,
    updatedAt: Date.now(),
  };
  updated.sizeBytes = new Blob([JSON.stringify(updated)]).size;
  models[idx] = updated;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
  window.dispatchEvent(new Event("ml-models-storage-update"));
  return updated;
}

export function clearAllModelsFromStorage(): void {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("ml-models-storage-update"));
}
