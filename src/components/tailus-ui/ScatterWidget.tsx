import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { CustomTooltip, legendText } from "@tailus-ui/visualizations";
import { Card } from "@/components/ui/card";

const data01 = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

const data02 = [
  { x: 300, y: 300, z: 200 },
  { x: 400, y: 500, z: 260 },
  { x: 200, y: 700, z: 400 },
  { x: 340, y: 350, z: 280 },
  { x: 560, y: 500, z: 500 },
  { x: 230, y: 780, z: 200 },
  { x: 500, y: 400, z: 200 },
  { x: 300, y: 500, z: 260 },
  { x: 240, y: 300, z: 400 },
  { x: 320, y: 550, z: 280 },
  { x: 500, y: 400, z: 500 },
  { x: 420, y: 280, z: 200 },
];

export const ScatterOverview = () => {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-medium">School Comparison</h2>
      <div className="h-72 w-full" data-shade="900">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <XAxis
              className="text-caption"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              type="number"
              dataKey="x"
              name="stature"
              unit="cm"
              stroke="var(--caption-text-color)"
            />
            <YAxis
              className="text-caption"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              yAxisId="left"
              type="number"
              dataKey="y"
              name="weight"
              unit="kg"
              stroke="var(--caption-text-color)"
            />
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              yAxisId="right"
              type="number"
              dataKey="y"
              name="weight"
              unit="kg"
              orientation="right"
              stroke="var(--caption-text-color)"
            />
            <Legend formatter={legendText} iconSize={8} iconType="circle" />
            <Tooltip
              cursor={{
                stroke: "var(--ui-border-color)",
                strokeWidth: 1,
              }}
              content={<CustomTooltip payload={[]} active fancy label={""} />}
            />
            <CartesianGrid
              stroke="var(--ui-border-color)"
              strokeDasharray={3}
            />
            <Scatter
              fill="var(--dv-primary)"
              yAxisId="left"
              name="A school"
              data={data01}
            />
            <Scatter
              fill="var(--dv-secondary)"
              yAxisId="right"
              name="B school"
              data={data02}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ScatterOverview;
