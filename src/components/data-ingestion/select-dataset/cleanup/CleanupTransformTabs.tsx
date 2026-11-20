import { TabsContent } from "@/components/ui/tabs";
import { ImputeCard } from "./ImputeCard";
import { DropNullCard } from "./DropNullCard";
import { DuplicatesOutliersCard } from "./DuplicatesOutliersCard";
import type { useDataCleanup } from "./useDataCleanup";

export function CleanupTransformTabs({
  cleanup,
}: {
  cleanup: ReturnType<typeof useDataCleanup>;
}) {
  return (
    <>
      <TabsContent value="impute">
        <ImputeCard
          columns={cleanup.columns}
          missingSummary={cleanup.missingSummary}
          onImpute={cleanup.handleImpute}
        />
      </TabsContent>
      <TabsContent value="drop-null">
        <DropNullCard
          columns={cleanup.columns}
          totalMissing={cleanup.missingSummary.totalMissing}
          onDropRows={cleanup.handleDropNullRows}
          onDropCols={cleanup.handleDropColumnsByNulls}
        />
      </TabsContent>
      <TabsContent value="duplicates">
        <DuplicatesOutliersCard
          duplicateCount={cleanup.duplicateCount}
          numericColumns={cleanup.numericColumns}
          onRemoveDuplicates={cleanup.handleRemoveDuplicates}
          onHandleOutliers={cleanup.handleOutlierAction}
        />
      </TabsContent>
    </>
  );
}
