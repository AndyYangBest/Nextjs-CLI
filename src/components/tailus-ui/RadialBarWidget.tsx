import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
} from "recharts";
import { CustomTooltip } from "@tailus-ui/visualizations";
import { Card } from "@/components/ui/card";

const data = [
  {
    name: "Videos",
    uv: 31.47,
    pv: 1900,
    fill: "var(--dv-primary-300)",
  },
  {
    name: "Docs",
    uv: 31.47,
    pv: 1900,
    fill: "var(--dv-primary-500)",
  },
  {
    name: "Photos",
    uv: 26.69,
    pv: 1500,
    fill: "var(--dv-primary-700)",
  },
  {
    name: "Messages",
    uv: 15.69,
    pv: 1400,
    fill: "var(--dv-primary-900)",
  },
];

export const Simple = () => {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-medium">Storage Distribution</h2>
      <div className="mx-auto w-56">
        <ResponsiveContainer aspect={1 / 1}>
          <RadialBarChart
            innerRadius={20}
            outerRadius={120}
            barGap={0}
            data={data}
          >
            <RadialBar
              label={{
                position: "insideStart",
                dataKey: "name",
                fontSize: 11,
                fill: "#fff",
              }}
              background={{ fill: "var(--ui-border-color)" }}
              cornerRadius={12}
              dataKey="pv"
            />
            <Legend
              wrapperStyle={{ transform: "translate(125%, 0)" }}
              align="right"
              verticalAlign="middle"
              layout="radial"
              iconSize={8}
              iconType="circle"
            />
            <Tooltip content={<CustomTooltip payload={[]} mixed label="" />} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default Simple;
