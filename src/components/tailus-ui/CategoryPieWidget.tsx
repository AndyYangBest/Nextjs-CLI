import { ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { Dots, legendText } from "@tailus-ui/visualizations";
import { Card } from "@/components/ui/card";

const data = [
  {
    name: "Running",
    uv: 31.47,
    pv: 2400,
    fill: "url(#dotP)",
  },
  {
    name: "Swimming",
    uv: 26.69,
    pv: 4567,
    fill: "url(#dotA)",
  },
  {
    name: "Cycling",
    uv: 15.69,
    pv: 1398,
    fill: "url(#dotS)",
  },
  {
    name: "Weightlifting",
    uv: 8.22,
    pv: 9800,
    fill: "url(#dotS)",
  },
  {
    name: "Yoga",
    uv: 8.63,
    pv: 3908,
    fill: "url(#dotI)",
  },
  {
    name: "Pilates",
    uv: 2.63,
    pv: 4800,
    fill: "url(#dotW)",
  },
  {
    name: "Boxing",
    uv: 6.67,
    pv: 4800,
    fill: "url(#dotD)",
  },
];

export const CategoryBar = () => {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-medium">Activity Distribution</h2>
      <div className="mx-auto w-96">
        <ResponsiveContainer aspect={5 / 4}>
          <PieChart>
            <Pie
              label={{
                fontSize: 12,
                fill: "var(--title-text-color)",
              }}
              startAngle={180}
              endAngle={0}
              data={data}
              cx={180}
              cy={200}
              innerRadius={70}
              outerRadius={140}
              fill="var(--area-primary-stroke)"
              dataKey="uv"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
              ))}
            </Pie>
            <Legend formatter={legendText} iconType="circle" iconSize={9} />
            <defs>
              <Dots id="dotP" />
              <Dots intent="accent" id="dotA" />
              <Dots intent="secondary" id="dotS" />
              <Dots intent="warning" id="dotW" />
              <Dots intent="danger" id="dotD" />
              <Dots intent="info" id="dotI" />
            </defs>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CategoryBar;
