/**
 * Utility for detecting and auto-encoding categorical / string columns
 * into numeric values suitable for numerical ML algorithms (Isolation Forest,
 * K-Means, Logistic Regression, LDA, etc.).
 */

export interface CategoricalEncodingResult {
  encoded: number[];
  mapping: Map<string, number>;
  wasEncoded: boolean;
}

export function isCategoricalValue(val: unknown): boolean {
  if (val === null || val === undefined) return false;
  if (typeof val === "boolean") return true;
  if (typeof val === "string") {
    // If it's a numeric string like "42" or "3.14", it's not strictly categorical
    const trimmed = val.trim();
    if (trimmed === "") return false;
    return isNaN(Number(trimmed));
  }
  return false;
}

export function encodeCategoricalSeries(
  values: unknown[],
  existingMap?: Map<string, number>,
): CategoricalEncodingResult {
  const hasStringCats = values.some(isCategoricalValue);
  // Column is categorical if existing mapping is non-empty, or if establishing new mapping and has non-numeric strings
  const isCategorical =
    (existingMap !== undefined && existingMap.size > 0) ||
    (existingMap === undefined && hasStringCats);

  if (!isCategorical) {
    const encoded = values.map((v) => {
      if (typeof v === "number" && !isNaN(v)) return v;
      if (v === null || v === undefined) return 0;
      if (typeof v === "string" && v.trim() === "") return 0;
      const num = Number(v);
      return isNaN(num) ? 0 : num;
    });
    return {
      encoded,
      mapping: existingMap ? new Map(existingMap) : new Map(),
      wasEncoded: false,
    };
  }

  const mapping = existingMap
    ? new Map(existingMap)
    : new Map<string, number>();

  // Assign distinct integers to categories if establishing a new mapping
  if (!existingMap || existingMap.size === 0) {
    const uniqueCats = Array.from(
      new Set(
        values.map((v) =>
          v === null || v === undefined ? "" : String(v).trim(),
        ),
      ),
    ).sort();
    uniqueCats.forEach((cat, idx) => {
      mapping.set(cat, idx);
    });
  }

  const encoded = values.map((v) => {
    const key = v === null || v === undefined ? "" : String(v).trim();
    if (mapping.has(key)) {
      return mapping.get(key)!;
    }
    // If unseen in test set, assign next index
    const newIdx = mapping.size;
    mapping.set(key, newIdx);
    return newIdx;
  });

  return { encoded, mapping, wasEncoded: true };
}

export interface MatrixEncodingResult {
  encodedMatrix: number[][];
  mappings: Map<string, number>[];
  hasCategoricals: boolean;
  encodedColumnIndices: number[];
}

export function encodeNumericMatrix(
  matrix: unknown[][],
  existingMappings?: Map<string, number>[],
): MatrixEncodingResult {
  const nRows = matrix.length;
  if (nRows === 0) {
    return {
      encodedMatrix: [],
      mappings: [],
      hasCategoricals: false,
      encodedColumnIndices: [],
    };
  }

  const nCols = matrix[0]?.length ?? 0;
  const colEncodings: CategoricalEncodingResult[] = [];
  const mappings: Map<string, number>[] = [];
  const encodedColumnIndices: number[] = [];

  for (let c = 0; c < nCols; c++) {
    const colValues = matrix.map((row) => (row ? row[c] : undefined));
    const result = encodeCategoricalSeries(colValues, existingMappings?.[c]);
    colEncodings.push(result);
    mappings.push(result.mapping);
    if (result.wasEncoded) {
      encodedColumnIndices.push(c);
    }
  }

  const encodedMatrix: number[][] = [];
  for (let r = 0; r < nRows; r++) {
    const row: number[] = [];
    for (let c = 0; c < nCols; c++) {
      const val = colEncodings[c].encoded[r];
      row.push(typeof val === "number" && !isNaN(val) ? val : 0);
    }
    encodedMatrix.push(row);
  }

  return {
    encodedMatrix,
    mappings,
    hasCategoricals: encodedColumnIndices.length > 0,
    encodedColumnIndices,
  };
}
