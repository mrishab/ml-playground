export function FeatureEncodingBadge({
  id,
  encoding,
  onChange,
}: {
  id: string;
  encoding?: "one-hot" | "ordinal";
  onChange?: (id: string, encoding: "one-hot" | "ordinal") => void;
}) {
  if (!onChange) return null;

  return (
    <button
      type="button"
      onClick={() =>
        onChange(id, encoding === "ordinal" ? "one-hot" : "ordinal")
      }
      title="Toggle categorical encoding"
      className="text-[10px] px-1.5 py-0.5 rounded border border-border/80 bg-background/50 hover:bg-muted font-mono transition-colors text-muted-foreground hover:text-foreground"
    >
      {encoding === "ordinal" ? "Enc: Ordinal" : "Enc: One-Hot"}
    </button>
  );
}
