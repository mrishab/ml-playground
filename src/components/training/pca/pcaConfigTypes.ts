export interface PCAConfigCardProps {
  nComponents: number;
  onNComponentsChange: (n: number) => void;
  standardize: boolean;
  onStandardizeChange: (s: boolean) => void;
  maxComponents: number;
  disabled: boolean;
}
