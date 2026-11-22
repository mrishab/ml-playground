export type SplitStats = {
  trainRows: number;
  testRows: number;
  featureCount: number;
  featureNames: string[];
  trainClassCounts?: Record<string, number>;
  testClassCounts?: Record<string, number>;
};

export function useSplitResults(stats: SplitStats | null) {
  const totalRows = stats ? stats.trainRows + stats.testRows : 0;
  const trainPercent = totalRows
    ? ((stats!.trainRows / totalRows) * 100).toFixed(1)
    : "0";
  const testPercent = totalRows
    ? ((stats!.testRows / totalRows) * 100).toFixed(1)
    : "0";

  return {
    stats,
    trainPercent,
    testPercent,
  };
}
