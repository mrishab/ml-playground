export function validateKMeansData(
  xTrain: unknown | null,
  encodedCount: number,
  k: number,
): string | null {
  if (!xTrain) {
    return "Please select and split dataset features before clustering.";
  }
  if (encodedCount < 2) {
    return "K-Means clustering requires at least 2 samples.";
  }
  if (encodedCount < k) {
    return `Fewer samples (${encodedCount}) than clusters k (${k}).`;
  }
  return null;
}
