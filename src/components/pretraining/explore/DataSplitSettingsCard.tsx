import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProblemTypeSelect } from "./ProblemTypeSelect";
import { SplitToggles } from "./SplitToggles";
import { TestSplitSlider } from "./TestSplitSlider";
import { ExploreSplitButton } from "./ExploreSplitButton";
import { ExploreLoadDefaultButton } from "./ExploreLoadDefaultButton";
import type { DataSplitSettingsCardProps } from "./types";

export function DataSplitSettingsCard(props: DataSplitSettingsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Data Split Settings</CardTitle>
        {props.hasDefaultConfig && props.loadDefaultConfig && (
          <ExploreLoadDefaultButton
            isLoading={Boolean(props.isLoadingConfig)}
            onClick={props.loadDefaultConfig}
          />
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <ProblemTypeSelect
          value={props.problemType}
          onChange={props.setProblemType}
        />
        <SplitToggles
          shuffle={props.shuffle}
          setShuffle={props.setShuffle}
          problemType={props.problemType}
          stratified={props.stratified}
          setStratified={props.setStratified}
        />
        <TestSplitSlider
          value={props.testSplitPercent}
          onChange={props.setTestSplitPercent}
        />
        <div className="pt-2">
          <ExploreSplitButton
            isSplit={props.isSplit}
            isExploreDirty={props.isExploreDirty}
            canSplit={props.canSplit}
            performSplit={props.performSplit}
            targetColumn={props.targetColumn}
            selectedFeatures={props.selectedFeatures}
          />
        </div>
      </CardContent>
    </Card>
  );
}
