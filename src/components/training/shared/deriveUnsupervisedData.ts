import type { DataFrame } from "danfojs";

export function deriveUnsupervisedData(
  df: DataFrame | null,
  xTrain: DataFrame | null,
  targetColumn: string,
) {
  if (df) {
    const cols = (df.columns as string[]).filter((c) => c !== targetColumn);
    const names = cols.length > 0 ? cols : (df.columns as string[]);
    const d = cols.length > 0 ? (df.loc({ columns: cols }) as DataFrame) : df;
    return { names, df: d };
  }
  if (xTrain) {
    return { names: xTrain.columns as string[], df: xTrain };
  }
  return { names: [], df: null };
}
