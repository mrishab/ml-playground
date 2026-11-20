export async function extractProbaScores(
  model: { predictProba: (x: number[][]) => unknown },
  xTestData: number[][],
  uniqueLabels: string[],
): Promise<Map<string, number[]> | undefined> {
  try {
    const res = await (model.predictProba(xTestData) as
      | Promise<unknown>
      | { arraySync: () => number[][] }
      | number[][]);
    const arr: number[][] = Array.isArray(res)
      ? res
      : (res as { arraySync: () => number[][] }).arraySync();
    if (arr.length > 0 && arr[0].length === uniqueLabels.length) {
      const map = new Map<string, number[]>();
      uniqueLabels.forEach((l, i) =>
        map.set(
          l,
          arr.map((r) => r[i]),
        ),
      );
      return map;
    } else if (
      arr.length > 0 &&
      arr[0].length === 1 &&
      uniqueLabels.length === 2
    ) {
      const map = new Map<string, number[]>();
      map.set(
        uniqueLabels[0],
        arr.map((r) => 1 - r[0]),
      );
      map.set(
        uniqueLabels[1],
        arr.map((r) => r[0]),
      );
      return map;
    }
  } catch {
    // predictProba failed or not supported
  }
  return undefined;
}
