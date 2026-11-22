export interface SplitTogglesProps {
  shuffle: boolean;
  setShuffle: (val: boolean) => void;
  problemType: string;
  stratified?: boolean;
  setStratified?: (val: boolean) => void;
  standardizeFeatures?: boolean;
  setStandardizeFeatures?: (val: boolean) => void;
  randomSeed?: number;
  setRandomSeed?: (val: number | undefined) => void;
}
