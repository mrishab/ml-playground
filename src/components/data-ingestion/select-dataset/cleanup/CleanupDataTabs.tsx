import { TabsContent } from "@/components/ui/tabs";
import { RowFilterCard } from "./RowFilterCard";
import { ColumnOpsCard } from "./ColumnOpsCard";
import { CleanupHistoryCard } from "./CleanupHistoryCard";
import type { useDataCleanup } from "./useDataCleanup";

export function CleanupDataTabs({
  cleanup,
}: {
  cleanup: ReturnType<typeof useDataCleanup>;
}) {
  return (
    <>
      <TabsContent value="filter">
        <RowFilterCard
          columns={cleanup.columns}
          values={cleanup.values}
          onFilter={cleanup.handleFilter}
        />
      </TabsContent>
      <TabsContent value="columns">
        <ColumnOpsCard
          columns={cleanup.columns}
          onRename={cleanup.handleRename}
          onDropCol={cleanup.handleDropCol}
          onCast={cleanup.handleCast}
          onLabelEncode={cleanup.handleLabelEncode}
          onOneHotEncode={cleanup.handleOneHotEncode}
          onReplace={cleanup.handleReplaceValue}
        />
      </TabsContent>
      <TabsContent value="history">
        <CleanupHistoryCard history={cleanup.history} />
      </TabsContent>
    </>
  );
}
