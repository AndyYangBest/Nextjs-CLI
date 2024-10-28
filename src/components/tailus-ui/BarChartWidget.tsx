import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid,
} from "recharts";
import { CustomTooltip, Stripes, data } from "@tailus-ui/visualizations";
import { Text, Title } from "@tailus-ui/typography";
import { Card } from "@/components/ui/card";

export const BarChartWidget = () => {
  return (
    <Card className="p-6">
      <Title as="h2" size="lg" weight="medium">
        Visitors and Revenue
      </Title>
      <Text className="mb-8 mt-2" size="sm">
        New users by First user primary channel group (Default Channel Group)
      </Text>
      <div className="h-56 w-full sm:h-72 sm:max-w-xl">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <YAxis
              className="text-caption"
              width={42}
              fontSize={12}
              unit="$"
              tickLine={false}
              axisLine={false}
            />
            <XAxis
              className="text-caption"
              dataKey="name"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <CartesianGrid
              vertical={false}
              stroke="var(--ui-border-color)"
              strokeDasharray={3}
            />
            <Tooltip
              cursor={{ fill: "var(--ui-border-color)" }}
              content={<CustomTooltip payload={[]} active mixed label={""} />}
            />
            <Bar
              fill="var(--dv-primary)"
              stackId="a"
              barSize={20}
              dataKey="Primary"
            />
            <Bar
              fill="var(--dv-accent)"
              stackId="a"
              dataKey="Accent"
              barSize={20}
            />
            <Bar
              radius={[4, 4, 0, 0]}
              fill="url(#strbar)"
              stackId="a"
              dataKey="Neutral"
              barSize={20}
            />
            <defs>
              <Stripes id="strbar" intent="primary-500" />
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default BarChartWidget;
