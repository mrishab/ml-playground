import { Upload } from "lucide-react";

export function ModelImportDropzone({
  fileRef,
  onChange,
}: {
  fileRef: React.RefObject<HTMLInputElement | null>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <button
      type="button"
      className="flex flex-col items-center justify-center border-2 border-dashed border-border/80 rounded-lg p-6 hover:bg-muted/10 cursor-pointer w-full transition-[background-color] duration-150 ease-out"
      onClick={() => fileRef.current?.click()}
    >
      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
      <p className="text-xs font-medium text-foreground">
        Click to upload JSON file
      </p>
      <input
        ref={fileRef}
        type="file"
        accept=".json"
        onChange={onChange}
        className="hidden"
      />
    </button>
  );
}
