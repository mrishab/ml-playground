import type { SplitTogglesProps } from "./split-toggles/splitToggleTypes";
import { ShuffleSeedToggle } from "./split-toggles/ShuffleSeedToggle";
import { StratifiedToggle } from "./split-toggles/StratifiedToggle";
import { StandardizeFeaturesToggle } from "./split-toggles/StandardizeFeaturesToggle";

export function SplitToggles({
  shuffle,
  setShuffle,
  problemType,
  stratified,
  setStratified,
  standardizeFeatures,
  setStandardizeFeatures,
  randomSeed,
  setRandomSeed,
}: SplitTogglesProps) {
  return (
    <div className="space-y-3.5">
      <ShuffleSeedToggle
        shuffle={shuffle}
        setShuffle={setShuffle}
        randomSeed={randomSeed}
        setRandomSeed={setRandomSeed}
      />
      <StratifiedToggle
        problemType={problemType}
        stratified={stratified}
        setStratified={setStratified}
      />
      <StandardizeFeaturesToggle
        standardizeFeatures={standardizeFeatures}
        setStandardizeFeatures={setStandardizeFeatures}
      />
    </div>
  );
}
