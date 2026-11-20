import { isMissingValue } from "./missingCheck";

export function renameColumn(
  columns: string[],
  oldName: string,
  newName: string,
): string[] {
  const cleanNew = newName.trim();
  if (!cleanNew || cleanNew === oldName) return columns;
  return columns.map((col) => (col === oldName ? cleanNew : col));
}

export function castColumnType(
  values: unknown[][],
  colIdx: number,
  targetType: "numeric" | "string" | "boolean",
): unknown[][] {
  return values.map((row) => {
    const newRow = [...row];
    const val = newRow[colIdx];
    if (isMissingValue(val)) return newRow;

    if (targetType === "numeric") {
      const num = Number(val);
      newRow[colIdx] = isNaN(num) ? null : num;
    } else if (targetType === "boolean") {
      const str = String(val).toLowerCase().trim();
      newRow[colIdx] = str === "true" || str === "1" || str === "yes";
    } else {
      newRow[colIdx] = String(val);
    }
    return newRow;
  });
}

export function replaceValue(
  values: unknown[][],
  colIdx: number,
  findVal: string,
  replaceVal: string,
): unknown[][] {
  const findLower = findVal.trim().toLowerCase();
  return values.map((row) => {
    const newRow = [...row];
    const val = newRow[colIdx];
    const isTargetMissing =
      findLower === "null" ||
      findLower === "na" ||
      findLower === "nan" ||
      findLower === "";

    if (isTargetMissing && isMissingValue(val)) {
      newRow[colIdx] = replaceVal;
    } else if (String(val).toLowerCase() === findLower) {
      newRow[colIdx] = replaceVal;
    }
    return newRow;
  });
}

export function labelEncodeColumn(
  values: unknown[][],
  colIdx: number,
): unknown[][] {
  const nonNulls = values
    .map((r) => r[colIdx])
    .filter((v) => !isMissingValue(v))
    .map((v) => String(v).trim());
  const unique = Array.from(new Set(nonNulls)).sort();
  const map = new Map<string, number>(unique.map((u, i) => [u, i]));

  return values.map((row) => {
    const newRow = [...row];
    const val = newRow[colIdx];
    if (isMissingValue(val)) {
      newRow[colIdx] = null;
    } else {
      const key = String(val).trim();
      newRow[colIdx] = map.get(key) ?? 0;
    }
    return newRow;
  });
}

export function oneHotEncodeColumn(
  columns: string[],
  values: unknown[][],
  colIdx: number,
): { newColumns: string[]; newValues: unknown[][] } {
  const colName = columns[colIdx];
  const nonNulls = values
    .map((r) => r[colIdx])
    .filter((v) => !isMissingValue(v))
    .map((v) => String(v).trim());
  const unique = Array.from(new Set(nonNulls)).sort();

  if (unique.length === 0) {
    return { newColumns: columns, newValues: values };
  }

  const dummyCols = unique.map((cat) => `${colName}_${cat}`);
  const newColumns = [
    ...columns.slice(0, colIdx),
    ...dummyCols,
    ...columns.slice(colIdx + 1),
  ];

  const newValues = values.map((row) => {
    const val = row[colIdx];
    const strVal = isMissingValue(val) ? "" : String(val).trim();
    const dummies = unique.map((cat) => (strVal === cat ? 1 : 0));
    return [...row.slice(0, colIdx), ...dummies, ...row.slice(colIdx + 1)];
  });

  return { newColumns, newValues };
}
