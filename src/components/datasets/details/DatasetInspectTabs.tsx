import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatasetRowsPreview } from "./DatasetRowsPreview";
import { DatasetSchemaTable } from "./DatasetSchemaTable";
import { DatasetAuditHistory } from "./DatasetAuditHistory";
import type { SavedDataset } from "@/types/savedDataset";

export function DatasetInspectTabs({ dataset }: { dataset: SavedDataset }) {
  return (
    <Tabs
      defaultValue="rows"
      className="flex-1 overflow-hidden flex flex-col pt-1"
    >
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="rows">Data Preview</TabsTrigger>
        <TabsTrigger value="schema">Columns &amp; Types</TabsTrigger>
        <TabsTrigger value="history">
          History ({dataset.history?.length ?? 0})
        </TabsTrigger>
      </TabsList>
      <div className="pt-3 flex-1 overflow-auto">
        <TabsContent value="rows">
          <DatasetRowsPreview columns={dataset.columns} data={dataset.data} />
        </TabsContent>
        <TabsContent value="schema">
          <DatasetSchemaTable
            columns={dataset.columns}
            dtypes={dataset.dtypes}
            data={dataset.data}
          />
        </TabsContent>
        <TabsContent value="history">
          <DatasetAuditHistory history={dataset.history} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
