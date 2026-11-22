import { TabsContent } from "@/components/ui/tabs";
import { ModelArtifactsTab } from "@/components/models/details/ModelArtifactsTab";
import { ModelPredictTab } from "@/components/models/details/ModelPredictTab";
import type { SavedModel } from "@/types/savedModel";

export function RegressionModelTabContent({ model }: { model?: SavedModel }) {
  return (
    <>
      <TabsContent value="parameters">
        {model ? (
          <ModelArtifactsTab model={model} />
        ) : (
          <div className="rounded-lg border border-border/70 p-6 text-center bg-muted/10 text-muted-foreground text-xs">
            Run training to view the learned parameters and equation.
          </div>
        )}
      </TabsContent>
      <TabsContent value="playground">
        {model ? (
          <ModelPredictTab model={model} />
        ) : (
          <div className="rounded-lg border border-border/70 p-6 text-center bg-muted/10 text-muted-foreground text-xs">
            Run training to activate the interactive inference playground.
          </div>
        )}
      </TabsContent>
    </>
  );
}
