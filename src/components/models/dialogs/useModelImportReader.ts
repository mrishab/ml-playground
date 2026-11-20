import { useState, useRef } from "react";

export function useModelImportReader(
  onImport: (json: string) => number,
  onClose: () => void,
) {
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const count = onImport(text);
        if (count > 0) onClose();
        else setError("No valid model definitions found in file.");
      } catch {
        setError("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
  };

  return { error, fileRef, handleFileChange };
}
