import { Input } from "@/components/ui/input";

export function SaveDatasetFormFields({
  name,
  setName,
  description,
  setDescription,
}: {
  name: string;
  setName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
}) {
  return (
    <div className="space-y-3 py-2">
      <div className="space-y-1.5">
        <label
          htmlFor="save-dataset-name"
          className="text-xs font-medium text-foreground"
        >
          Dataset Name
        </label>
        <Input
          id="save-dataset-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. iris_cleaned"
        />
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor="save-dataset-desc"
          className="text-xs font-medium text-foreground"
        >
          Notes / Description (Optional)
        </label>
        <Input
          id="save-dataset-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Imputed null ages, dropped outliers"
        />
      </div>
    </div>
  );
}
