import { formatNumber } from "@/lib/number";
import { RSEStepRow } from "../RSEStepRow";

export function RSETestSection({
  testRss,
  testN,
  testRmse,
}: {
  testRss: number;
  testN: number;
  testRmse: number;
}) {
  return (
    <>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-3">
        2. Test Split Evaluation (Held-Out RMSE)
      </h4>
      <div className="space-y-2">
        <RSEStepRow label="Test RSS" value={formatNumber(testRss)} />
        <RSEStepRow label="Test Sample Size (n_test)" value={testN} />
        <RSEStepRow
          label={`Test RMSE = √(${formatNumber(testRss)} / ${testN})`}
          value={formatNumber(testRmse)}
          isHighlight
        />
      </div>
    </>
  );
}
