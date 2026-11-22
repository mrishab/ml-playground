import { formatNumber } from "@/lib/number";
import { RSEStepRow } from "../RSEStepRow";

export function RSETrainSection({
  trainRss,
  p,
  trainN,
  trainDof,
  trainRssOverDof,
  trainRse,
}: {
  trainRss: number;
  p: number;
  trainN: number;
  trainDof: number;
  trainRssOverDof: number;
  trainRse: number;
}) {
  return (
    <>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        1. Training Set Multiple Regression RSE
      </h4>
      <div className="space-y-2">
        <RSEStepRow
          label="Training RSS (RSS_train)"
          value={formatNumber(trainRss)}
        />
        <RSEStepRow label="Predictors Count (p)" value={p} />
        <RSEStepRow
          label="Degrees of Freedom (n_train - p - 1)"
          value={`${trainN} - ${p} - 1 = ${trainDof}`}
        />
        <RSEStepRow
          label={`RSS / df = ${formatNumber(trainRss)} / ${trainDof}`}
          value={formatNumber(trainRssOverDof)}
        />
        <RSEStepRow
          label={`Train RSE = √(${formatNumber(trainRssOverDof)})`}
          value={formatNumber(trainRse)}
          isHighlight
        />
      </div>
    </>
  );
}
