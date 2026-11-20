import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CleanupTabsList({ historyCount }: { historyCount: number }) {
  return (
    <TabsList className="grid grid-cols-3 sm:grid-cols-6 h-auto p-1 gap-1">
      <TabsTrigger value="impute" className="text-xs py-1.5">
        Impute
      </TabsTrigger>
      <TabsTrigger value="drop-null" className="text-xs py-1.5">
        Drop Nulls
      </TabsTrigger>
      <TabsTrigger value="duplicates" className="text-xs py-1.5">
        Duplicates
      </TabsTrigger>
      <TabsTrigger value="filter" className="text-xs py-1.5">
        Row Filter
      </TabsTrigger>
      <TabsTrigger value="columns" className="text-xs py-1.5">
        Columns
      </TabsTrigger>
      <TabsTrigger value="history" className="text-xs py-1.5">
        History ({historyCount})
      </TabsTrigger>
    </TabsList>
  );
}
