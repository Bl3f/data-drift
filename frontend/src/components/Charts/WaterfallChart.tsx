import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { ComponentProps } from "react";

import { theme } from "../../theme";

type TooltipProps = ComponentProps<typeof Tooltip<[number, number], "drift">>;
type Formatter = TooltipProps["formatter"];

interface DataItem {
  day: string;
  drift: readonly [number, number];
  fill: string;
  isInitial?: boolean;
}

const formatToolTipValueTick: Formatter = (
  tickValue,
  _name,
  item: { payload?: DataItem }
) => {
  if (item.payload?.isInitial) return `${tickValue[1].toLocaleString()}`;
  const drift = tickValue[1] - tickValue[0];
  const signedDrift =
    drift > 0 ? `+${drift.toLocaleString()}` : drift.toLocaleString();
  return `${signedDrift} => ${tickValue[1].toLocaleString()}`;
};

export type WaterfallChartProps = { data: readonly DataItem[] };

export const WaterfallChart = ({ data }: WaterfallChartProps) => {
  return (
    <BarChart
      width={750}
      height={250}
      data={[...data]}
      margin={{ right: 8, left: 8 }}
    >
      <XAxis dataKey="day" />
      <YAxis
        type="number"
        domain={["auto", "auto"]}
        tickCount={5}
        tickFormatter={(tick: number) => {
          return tick.toLocaleString();
        }}
      />
      <Tooltip
        contentStyle={{ backgroundColor: theme.colors.background }}
        formatter={formatToolTipValueTick}
      />
      <Bar dataKey="drift" fill={"white"} />
    </BarChart>
  );
};
